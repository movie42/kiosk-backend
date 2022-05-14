import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Store } from '../../store/entity/store.entity';

@Injectable()
export class StoreRepository {
  constructor(@InjectRepository(Store) private repository: Repository<Store>) {}
}
