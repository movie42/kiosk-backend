import { Injectable } from '@nestjs/common';

import { StoreRepository } from '../repository/store.repository';
import { IAddStore } from './interface/add-store.interface';

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async getStores() {
    return this.storeRepository.getStores();
  }

  async getStoreById(id: number) {
    return this.storeRepository.getStoreById(id);
  }

  async addStore(args: IAddStore) {
    return this.storeRepository.addStore(args);
  }

  async removeStore(id: number) {
    return this.storeRepository.removeStore(id);
  }
}
