import { NestFactory } from '@nestjs/core';
import { TruckModule } from './truck';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TruckModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('TRUCK_PORT');

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get<string>('KAFKA_BROKER_URL')],
        clientId: 'truck-service',
      },
      consumer: {
        groupId: 'truck-service-consumer',
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await microservice.listen();
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
