import { Injectable } from '@nestjs/common';

import { IAddStore } from './interface/add-store.interface';
import { IUpdateStore } from './interface/update-store.interface';
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

  async updateStore(id: number, input: IUpdateStore) {
    return this.storeRepository.updateStore(id, input);
  }

  async removeStore(id: number) {
    return this.storeRepository.removeStore(id);
  }

  async toggleIsAvailable(id: number) {
    return this.storeRepository.toggleIsAvailable(id);
  }
}
