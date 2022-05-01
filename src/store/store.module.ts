import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreRepository } from '../repository/store.repository';
import { StoreResolver } from './store.resolver';
import { StoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreRepository])],
  providers: [StoreResolver, StoreService],
})
export class StoreModule {}
