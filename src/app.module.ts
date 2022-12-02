import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { isProd } from './common/constant';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    UserModule,
    OrderModule,
    ProductModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: !isProd,
      playground: true,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const ormConfig: TypeOrmModuleOptions = JSON.parse(
          readFileSync(__dirname + '/../ormconfig.json', { encoding: 'utf-8' }),
        );
        return {
          ...ormConfig,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migration/*.{ts,js}'],
        };
      },
    }),
    StoreModule,
    UploadsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
