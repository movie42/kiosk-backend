import { Injectable } from '@nestjs/common';

import { IAddStore } from './interface/add-store.interface';
import { StoreRepository } from './repository/store.repository';

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async getStores() {
    return this.storeRepository.getStores();
  }

  async getStoresByUserId(userId: number) {
    return this.storeRepository.getStoresByUserId(userId);
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
