import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Truck')
@Directive('@key(fields: "plateNo")')
export class JobTruckModel {
  @Field(() => ID)
  plateNo: string;
}
