import { Injectable } from '@nestjs/common';
import { RegisterTruckInput, TruckModel } from '../models';
import { PrismaClientService } from '../prisma-client';

@Injectable()
export class TruckService {
  constructor(private prismaClient: PrismaClientService) {}

  async register(truck: RegisterTruckInput): Promise<TruckModel> {
    return await this.prismaClient.truck.create({
      data: truck,
    });
  }

  async findByPlateNo(plateNo: string): Promise<TruckModel | null> {
    return await this.prismaClient.truck.findFirst({
      where: {
        plateNo,
      },
    });
  }
}
