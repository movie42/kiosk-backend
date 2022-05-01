import { EntityRepository, Repository } from 'typeorm';

import { Store } from '../entity/store.entity';
import { IAddStore } from '../store/interface/add-store.interface';

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> {
  async getStoreById(id: number) {
    return this.findOne(id);
  }

  async getStores() {
    return this.find();
  }

  async addStore(args: IAddStore) {
    await this.save(this.create(args));
    return true;
  }

  async removeStore(id: number) {
    await this.delete(id);
    return true;
  }
}
