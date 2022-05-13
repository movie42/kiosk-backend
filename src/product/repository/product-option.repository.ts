import { EntityRepository, Repository } from 'typeorm';

import { Option } from '../entity/option.entity';
import { IAddOption } from '../interface/add-option.interface';
import { IEditOption } from '../interface/edit-option.interface';

@EntityRepository(Option)
export class ProductOptionRepository extends Repository<Option> {
  async addOption(option: IAddOption) {
    await this.save(option);
    return true;
  }

  async deleteOption(optionId: number) {
    await this.delete(optionId);
    return true;
  }

  async editOption(option: IEditOption) {
    await this.update(option.id, option);
    return true;
  }
}
