import { Injectable } from '@nestjs/common';
import { ContainerModel, RegisterContainerInput } from '../models';
import { PrismaClientService } from '../prisma-client';

@Injectable()
export class ContainerService {
  constructor(private prismaClient: PrismaClientService) {}

  async register(container: RegisterContainerInput): Promise<ContainerModel> {
    return await this.prismaClient.container.create({
      data: container,
    });
  }

  async findByContainerNo(containerNo: string): Promise<ContainerModel | null> {
    return await this.prismaClient.container.findFirst({
      where: {
        containerNo,
      },
    });
  }

  async getAll(): Promise<ContainerModel[]> {
    return await this.prismaClient.container.findMany();
  }
}
