import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

import { AppModule } from './app.module';

dayjs.extend(utc);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(config.get('port'));
}
bootstrap();
