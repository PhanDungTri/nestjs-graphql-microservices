import { MESSAGE_PATTERN } from '@gate/constants';
import { GetContainerOutput, GetTruckOutput } from '@gate/dto';
import { extractObservable } from '@gate/utils';
import { BadRequestException, Inject, OnModuleInit } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import { CreateGateOutJobInput, JobContainerModel, JobModel } from '../models';
import { JobService } from './job.service';
import { JobTruckModel } from '../models';

@Resolver(JobModel)
export class JobResolver implements OnModuleInit {
  constructor(
    @Inject('JOB_CLIENT') private kafkaClient: ClientKafka,
    private jobService: JobService,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(MESSAGE_PATTERN.GET_CONTAINERS);
    this.kafkaClient.subscribeToResponseOf(MESSAGE_PATTERN.GET_TRUCK);

    await this.kafkaClient.connect();
  }

  @Query(() => JobModel, { nullable: true })
  async findJobByID(@Args('id') id: string): Promise<JobModel | null> {
    return await this.jobService.findByID(id);
  }

  @Mutation(() => JobModel)
  async createJob(@Args() job: CreateGateOutJobInput): Promise<JobModel> {
    const [containers, truck] = await Promise.all([
      extractObservable(
        this.kafkaClient.send<GetContainerOutput[], string[]>(
          MESSAGE_PATTERN.GET_CONTAINERS,
          job.containers.map(({ containerNo }) => containerNo),
        ),
      ),
      extractObservable(
        this.kafkaClient.send<GetTruckOutput | null, string>(
          MESSAGE_PATTERN.GET_TRUCK,
          job.truckPlateNo,
        ),
      ),
    ]);

    if (truck === null) {
      throw new BadRequestException(`Truck ${job.truckPlateNo} not existing`);
    }

    if (containers.length !== job.containers.length) {
      const invalidContainers = job.containers
        .filter(
          (cont) =>
            containers.find((c) => c.containerNo === cont.containerNo) ===
            undefined,
        )
        .map((c) => c.containerNo);

      throw new BadRequestException(
        `Some containers not existing: ${invalidContainers.join(', ')}`,
      );
    }

    if (job.containers.length === 2) {
      if (containers.some((c) => c.length === 40)) {
        throw new BadRequestException(
          "Can't carry 40ft container with another container",
        );
      }

      if (
        job.containers[0].positionOnTruck === job.containers[1].positionOnTruck
      ) {
        throw new BadRequestException('Containers have same position on truck');
      }
    }

    const processingJobOnTruck = await this.jobService.findProcessingByTruck(
      truck.plateNo,
    );

    if (processingJobOnTruck !== null) {
      throw new BadRequestException(
        `There is a job processing on truck ${truck.plateNo}`,
      );
    }

    for (const container of containers) {
      const processingJobOnContainer =
        await this.jobService.findProcessingByContainer(container.containerNo);

      if (processingJobOnContainer !== null) {
        throw new BadRequestException(
          `There is a job processing on container ${container.containerNo}`,
        );
      }
    }

    return await this.jobService.createGateOut(job);
  }

  @ResolveField(() => JobTruckModel)
  truck(@Parent() job: JobModel): JobTruckModel {
    return { plateNo: job.truckPlateNo };
  }

  @ResolveField(() => [JobContainerModel])
  containers(@Parent() job: JobModel): Promise<JobContainerModel[]> {
    return this.jobService.findContainers(job.id);
  }
}
