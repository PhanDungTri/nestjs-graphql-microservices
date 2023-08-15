import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

enum PositionOnTruck {
  Front = 'F',
  Back = 'B',
}

@InputType()
class TargetContainer {
  @Field()
  @IsString()
  @Matches(/[A-Z]{4}\d{7}/)
  containerNo: string;

  @Field()
  @IsEnum(PositionOnTruck)
  positionOnTruck: PositionOnTruck;
}

@ArgsType()
export class CreateGateOutJobInput {
  @Field()
  @IsString()
  @Matches(/^\d{2}(?![IJOQR])[A-Z]-\d{3}.\d{2}$/)
  truckPlateNo: string;

  @Field(() => [TargetContainer])
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(2)
  @ValidateNested()
  @Type(() => TargetContainer)
  containers: TargetContainer[];
}
