import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        server: {
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
        },
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'truck',
                url: configService.get<string>('TRUCK_SERVICE_URL'),
              },
              {
                name: 'container',
                url: configService.get<string>('CONTAINER_SERVICE_URL'),
              },
              {
                name: 'job',
                url: configService.get<string>('JOB_SERVICE_URL'),
              },
            ],
          }),
        },
      }),
    }),
  ],
})
export class ApolloGatewayModule {}
