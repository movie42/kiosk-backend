import { Injectable } from '@nestjs/common';

import { IAddStore } from './interface/add-store.interface';
import { StoreRepository } from './repository/store.repository';

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async getStores() {
    return this.storeRepository.getStores();
  }

  async getStoreById(id: number) {
    return this.storeRepository.getStoreById(id);
  }

  async getIsStoreAvailable(id: number) {
    const store = await this.storeRepository.getStoreById(id);
    return store.isAvailable;
  }

  async addStore(args: IAddStore) {
    return this.storeRepository.addStore(args);
  }

  async removeStore(id: number) {
    return this.storeRepository.removeStore(id);
  }

  async toggleIsAvailable(id: number) {
    return this.storeRepository.toggleIsAvailable(id);
  }
}
