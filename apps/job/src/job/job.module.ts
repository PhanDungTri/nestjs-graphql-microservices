import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloServerModule } from '@gate/common-modules';
import { PrismaClientModule } from '../prisma-client';
import { JobResolver } from './job.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApolloServerModule.forRoot(),
    PrismaClientModule,
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'JOB_CLIENT',
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: [configService.get<string>('KAFKA_BROKER_URL')],
                clientId: 'job-service',
              },
              consumer: {
                groupId: 'job-service-consumer',
              },
            },
          }),
        },
      ],
    }),
  ],
  providers: [JobService, JobResolver],
})
export class JobModule {}
