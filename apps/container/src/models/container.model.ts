import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Container } from '.prisma/client/container';

@ObjectType('Container')
@Directive('@key(fields: "containerNo")')
export class ContainerModel implements Container {
  @Field(() => ID)
  containerNo: string;

  @Field()
  operator: string;

  @Field(() => Int)
  length: number;

  @Field()
  type: string;

  @Field()
  status: string;

  @Field()
  dateCreated: Date;

  @Field()
  dateUpdated: Date;
}
