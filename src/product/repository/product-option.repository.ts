import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Option } from '../entity/option.entity';
import { IAddOption } from '../interface/add-option.interface';
import { IEditOption } from '../interface/edit-option.interface';

@Injectable()
export class ProductOptionRepository {
  constructor(@InjectRepository(Option) private repository: Repository<Option>) {}

  async addOption(option: IAddOption) {
    await this.repository.save(option);
    return true;
  }

  async removeOption(optionId: number) {
    await this.repository.delete(optionId);
    return true;
  }

  async updateOption(option: IEditOption) {
    await this.repository.update(option.id, option);
    return true;
  }
}
