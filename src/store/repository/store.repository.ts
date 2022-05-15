import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Store } from '../entity/store.entity';
import { IAddStore } from '../interface/add-store.interface';

@Injectable()
export class StoreRepository {
  constructor(@InjectRepository(Store) private repository: Repository<Store>) {}

  async getStoreById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async getStores() {
    return this.repository.find();
  }

  async addStore(args: IAddStore) {
    await this.repository.save(this.repository.create(args));
    return true;
  }

  async removeStore(id: number) {
    await this.repository.delete(id);
    return true;
  }
}
