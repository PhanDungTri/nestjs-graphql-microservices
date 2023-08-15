import { Job } from '.prisma/client/job';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { JobContainerModel } from './job-container.model';
import { JobTruckModel } from './job-truck.model';

@ObjectType('Job')
export class JobModel implements Job {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  dateCompleted: Date;

  @Field()
  status: string;

  @Field()
  type: string;

  @Field()
  dateCreated: Date;

  @Field()
  dateUpdated: Date;

  @Field()
  truckPlateNo: string;

  @Field(() => JobTruckModel)
  truck: JobTruckModel;

  @Field(() => [JobContainerModel])
  containers: JobContainerModel[];
}
