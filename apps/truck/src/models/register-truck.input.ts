import { Field, InputType } from '@nestjs/graphql';
import { IsString, Matches } from 'class-validator';
import { TruckModel } from './truck.model';

@InputType()
export class RegisterTruckInput
  implements Pick<TruckModel, 'plateNo' | 'carrier'>
{
  @Field()
  @IsString()
  @Matches(/^\d{2}(?![IJOQR])[A-Z]-\d{3}.\d{2}$/)
  plateNo: string;

  @Field()
  @IsString()
  carrier: string;
}
