import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsString, Matches } from 'class-validator';
import { ContainerModel } from './container.model';
import { ContainerLength } from '../constants';

enum ContainerType {
  General = 'G',
  Reefer = 'R',
}

enum ContainerStatus {
  Empty = 'E',
  Full = 'F',
}

@InputType()
export class RegisterContainerInput
  implements Omit<ContainerModel, 'dateCreated' | 'dateUpdated'>
{
  @Field()
  @IsString()
  @Matches(/[A-Z]{4}\d{7}/)
  containerNo: string;

  @Field()
  @IsString()
  operator: string;

  @Field(() => Int)
  @IsEnum(ContainerLength)
  length: ContainerLength;

  @Field()
  @IsEnum(ContainerType)
  type: ContainerType;

  @Field()
  @IsEnum(ContainerStatus)
  status: ContainerStatus;
}
