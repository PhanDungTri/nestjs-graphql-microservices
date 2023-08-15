import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client';
import { CreateGateOutJobInput, JobContainerModel, JobModel } from '../models';
import { JobStatus } from '../constants';
import { Job } from '.prisma/client/job';
import { nanoid } from 'nanoid';

@Injectable()
export class JobService {
  constructor(private prismaClient: PrismaClientService) {}

  private parseJobToModel(job: Job): JobModel | null {
    if (job === null) {
      return null;
    }

    return { ...job, containers: [], truck: null };
  }

  async findByID(id: string): Promise<JobModel | null> {
    const job = await this.prismaClient.job.findUnique({
      where: {
        id,
      },
    });

    return this.parseJobToModel(job);
  }

  async findProcessingByTruck(truckPlateNo: string): Promise<JobModel | null> {
    const job = await this.prismaClient.job.findFirst({
      where: {
        truckPlateNo,
        status: JobStatus.Processing,
      },
    });

    return this.parseJobToModel(job);
  }

  async findProcessingByContainer(
    containerNo: string,
  ): Promise<JobModel | null> {
    const job = await this.prismaClient.job.findFirst({
      where: {
        status: JobStatus.Processing,
        containers: {
          some: {
            containerNo,
          },
        },
      },
    });

    return this.parseJobToModel(job);
  }

  async findContainers(jobID: string): Promise<JobContainerModel[]> {
    const containers = await this.prismaClient.jobContainer.findMany({
      where: {
        jobID,
      },
    });

    return containers.map(({ containerNo, positionOnTruck }) => ({
      containerNo,
      positionOnTruck,
    }));
  }

  async createGateOut(job: CreateGateOutJobInput): Promise<JobModel> {
    const result = await this.prismaClient.job.create({
      data: {
        id: nanoid(8),
        truckPlateNo: job.truckPlateNo,
        type: 'O',
        containers: {
          create: job.containers.map((cont) => ({
            ...cont,
            id: nanoid(8),
          })),
        },
      },
    });

    return this.parseJobToModel(result);
  }
}
