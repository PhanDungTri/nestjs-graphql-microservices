import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { JobModule } from './job';

async function bootstrap() {
  const app = await NestFactory.create(JobModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('JOB_PORT');

  const microservice = app.connectMicroservice<MicroserviceOptions>({
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
  });

  app.useGlobalPipes(new ValidationPipe());

  await microservice.listen();
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
