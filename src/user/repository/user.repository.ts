import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity/user.entity';
import { IAddUser } from '../interface/add-user.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers() {
    return this.find();
  }

  async addUser(user: IAddUser) {
    await this.save(this.create(user));
    return true;
  }
}
