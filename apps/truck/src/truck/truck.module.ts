import { Module } from '@nestjs/common';
import { TruckService } from './truck.service';
import { ConfigModule } from '@nestjs/config';
import { TruckResolver } from './truck.resolver';
import { ApolloServerModule } from '@gate/common-modules';
import { PrismaClientModule } from '../prisma-client';
import { TruckController } from './truck.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApolloServerModule.forRoot(),
    PrismaClientModule,
  ],
  providers: [TruckService, TruckResolver],
  controllers: [TruckController],
})
export class TruckModule {}
