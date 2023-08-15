import {
  Args,
  Mutation,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { ContainerModel, RegisterContainerInput } from '../models';
import { ContainerService } from './container.service';
import { BadRequestException } from '@nestjs/common';

@Resolver(ContainerModel)
export class ContainerResolver {
  constructor(private containerService: ContainerService) {}

  @Query(() => ContainerModel, { nullable: true })
  async findContainerByContainerNo(
    @Args('containerNo') containerNo: string,
  ): Promise<ContainerModel | null> {
    return await this.containerService.findByContainerNo(containerNo);
  }

  @Mutation(() => ContainerModel)
  async registerContainer(
    @Args('container') container: RegisterContainerInput,
  ): Promise<ContainerModel> {
    const existing = await this.containerService.findByContainerNo(
      container.containerNo,
    );

    if (existing !== null) {
      throw new BadRequestException(
        `Container ${container.containerNo} existing`,
      );
    }

    return await this.containerService.register(container);
  }

  @ResolveReference()
  async resolveReference(reference: {
    containerNo: string;
  }): Promise<ContainerModel> {
    return await this.containerService.findByContainerNo(reference.containerNo);
  }
}
