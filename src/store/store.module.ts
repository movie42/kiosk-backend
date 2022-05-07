import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Store } from './entity/store.entity';
import { StoreRepository } from './repository/store.repository';
import { StoreResolver } from './store.resolver';
import { StoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoreResolver, StoreService, StoreRepository],
})
export class StoreModule {}
