import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { GqlAuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import configurationYaml from './config/configuration.yaml';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      debug: true,
      autoSchemaFile: path.join(__dirname, '..', 'schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
      cors: {
        origin: '*',
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: __dirname + '/../database/some-chat.db',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationYaml],
    }),
    UsersModule,
    MessagesModule,
    ChatsModule,
    AuthModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {}
