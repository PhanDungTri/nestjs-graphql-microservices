import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Truck } from '.prisma/client/truck';

@ObjectType('Truck')
@Directive('@key(fields: "plateNo")')
export class TruckModel implements Truck {
  @Field(() => ID)
  plateNo: string;

  @Field()
  carrier: string;

  @Field({ nullable: true })
  lastInDate: Date | null;

  @Field({ nullable: true })
  lastOutDate: Date | null;

  @Field()
  dateCreated: Date;

  @Field()
  dateUpdated: Date;
}
