import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Store } from '../entity/store.entity';
import { IAddStore } from '../interface/add-store.interface';
import { IUpdateStore } from '../interface/update-store.interface';

@Injectable()
export class StoreRepository {
  constructor(@InjectRepository(Store) private repository: Repository<Store>) {}

  async getStores() {
    return this.repository.find();
  }

  async getStoresByUserId(ownerId: number) {
    return this.repository.findBy({ ownerId });
  }

  async getStoreById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async addStore(args: IAddStore) {
    await this.repository.save(this.repository.create(args));
    return true;
  }

  async updateStore(id: number, input: IUpdateStore) {
    await this.repository.update(id, input);
    return true;
  }

  async removeStore(id: number) {
    await this.repository.delete(id);
    return true;
  }

  async toggleIsAvailable(id: number) {
    await this.repository
      .createQueryBuilder()
      .update('store')
      .set({ isAvailable: () => '!isAvailable' })
      .where('id = :id', { id })
      .execute();
    return true;
  }
}
