import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { JobContainer } from '.prisma/client/job';

@ObjectType('Container')
@Directive('@key(fields: "containerNo")')
export class JobContainerModel
  implements Pick<JobContainer, 'containerNo' | 'positionOnTruck'>
{
  @Field(() => ID)
  containerNo: string;

  @Field()
  positionOnTruck: string;
}
