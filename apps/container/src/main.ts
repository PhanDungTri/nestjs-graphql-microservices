import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ContainerModule } from './container';

async function bootstrap() {
  const app = await NestFactory.create(ContainerModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('CONTAINER_PORT');

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get<string>('KAFKA_BROKER_URL')],
        clientId: 'container-service',
      },
      consumer: {
        groupId: 'container-service-consumer',
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await microservice.listen();
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
