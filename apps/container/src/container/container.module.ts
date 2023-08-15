import { Module } from '@nestjs/common';
import { ContainerService } from './container.service';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerModule } from '@gate/common-modules';
import { PrismaClientModule } from '../prisma-client';
import { ContainerResolver } from './container.resolver';
import { ContainerController } from './container.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApolloServerModule.forRoot(),
    PrismaClientModule,
  ],
  providers: [ContainerService, ContainerResolver],
  controllers: [ContainerController],
})
export class ContainerModule {}
