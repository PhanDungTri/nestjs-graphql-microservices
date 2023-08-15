import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '.prisma/client/container';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }
}
