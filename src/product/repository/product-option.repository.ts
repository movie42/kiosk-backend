import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';

import { Option } from '../entity/option.entity';
import { IAddOption } from '../interface/add-option.interface';
import { IEditOption } from '../interface/edit-option.interface';

@Injectable()
export class ProductOptionRepository {
  private optionsLoader = new DataLoader<number, Option[] | undefined>(
    async (productIds: number[]) => {
      const options = await this.getOptionsByProductIds(productIds);
      return productIds.map((productId) => options.filter((option) => option.productId === productId));
    },
    { cache: false },
  );

  constructor(@InjectRepository(Option) private repository: Repository<Option>) {}

  async getOptionsByLoader(productId: number) {
    return this.optionsLoader.load(productId);
  }

  async getOptionsByProductIds(productIds: number[]) {
    return this.repository.findBy({ productId: In(productIds) });
  }

  async addOptions(options: IAddOption[]) {
    await this.repository.save(this.repository.create(options));
    return true;
  }

  async removeOptions(optionIds: number[]) {
    await this.repository.delete(optionIds);
    return true;
  }

  async updateOption(option: IEditOption) {
    const updatedOptions = this.repository.create(option);
    await this.repository.update(option.optionId, updatedOptions);
    return true;
  }
}
