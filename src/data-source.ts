import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { DataSource } from 'typeorm';

const logger = new Logger('data-source');
const ormConfig = JSON.parse(readFileSync(__dirname + '/../ormconfig.json', { encoding: 'utf-8' }));
const AppDataSource = new DataSource(ormConfig);

AppDataSource.initialize()
  .then(() => logger.log('Data Source has been initialized!'))
  .catch((err) => logger.error('Error during Data Source initialization', err));

export { AppDataSource };
