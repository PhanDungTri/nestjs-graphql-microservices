import { MESSAGE_PATTERN } from '@gate/constants';
import { GetContainerOutput } from '@gate/dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContainerService } from './container.service';

@Controller()
export class ContainerController {
  constructor(private containerService: ContainerService) {}

  @MessagePattern(MESSAGE_PATTERN.GET_CONTAINERS)
  async onGetContainers(
    @Payload() payload: string[],
  ): Promise<GetContainerOutput[]> {
    return (
      await Promise.all(
        payload.map(
          async (cont) => await this.containerService.findByContainerNo(cont),
        ),
      )
    )
      .filter((c) => c !== null)
      .map(({ containerNo, length }) => ({ containerNo, length }));
  }
}
