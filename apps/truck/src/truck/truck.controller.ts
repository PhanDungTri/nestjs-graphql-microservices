import { Controller } from '@nestjs/common';
import { TruckService } from './truck.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MESSAGE_PATTERN } from '@gate/constants';
import { GetTruckOutput } from '@gate/dto';

@Controller('truck')
export class TruckController {
  constructor(private truckService: TruckService) {}

  @MessagePattern(MESSAGE_PATTERN.GET_TRUCK)
  async onGetTruck(@Payload() plateNo: string): Promise<GetTruckOutput | null> {
    const truck = await this.truckService.findByPlateNo(plateNo);

    return truck === null
      ? null
      : {
          plateNo: truck.plateNo,
          carrier: truck.carrier,
        };
  }
}
