import {
  Args,
  Mutation,
  Query,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { RegisterTruckInput, TruckModel } from '../models';
import { TruckService } from './truck.service';
import { BadRequestException } from '@nestjs/common';

@Resolver(TruckModel)
export class TruckResolver {
  constructor(private truckService: TruckService) {}

  @Query(() => TruckModel, { nullable: true })
  async findTruckByPlateNo(
    @Args('plateNo') plateNo: string,
  ): Promise<TruckModel | null> {
    return await this.truckService.findByPlateNo(plateNo);
  }

  @Mutation(() => TruckModel)
  async registerTruck(
    @Args('truck') truck: RegisterTruckInput,
  ): Promise<TruckModel> {
    const existing = await this.truckService.findByPlateNo(truck.plateNo);

    if (existing !== null) {
      throw new BadRequestException(`Truck ${truck.plateNo} existing`);
    }

    return await this.truckService.register(truck);
  }

  @ResolveReference()
  async resolveReference(reference: { plateNo: string }): Promise<TruckModel> {
    return await this.truckService.findByPlateNo(reference.plateNo);
  }
}
