import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Option } from '../entity/option.entity';
import { IAddOption } from '../interface/add-option.interface';
import { IEditOption } from '../interface/edit-option.interface';

@Injectable()
export class ProductOptionRepository {
  constructor(@InjectRepository(Option) private repository: Repository<Option>) {}

  async addOptions(options: IAddOption[]) {
    await this.repository.save(this.repository.create(options));
    return true;
  }

  async removeOptions(optionIds: number[]) {
    await this.repository.delete(optionIds);
    return true;
  }

  async updateOption(optionId: number, option: IEditOption) {
    await this.repository.update(optionId, option);
    return true;
  }
}
