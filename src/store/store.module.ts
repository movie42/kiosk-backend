import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Option } from '../product/entity/option.entity';
import { ProductModule } from '../product/product.module';
import { Store } from './entity/store.entity';
import { StoreRepository } from './repository/store.repository';
import { StoreResolver } from './store.resolver';
import { StoreService } from './store.service';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([Store, Option])],
  providers: [StoreResolver, StoreService, StoreRepository],
  exports: [StoreRepository],
})
export class StoreModule {}
