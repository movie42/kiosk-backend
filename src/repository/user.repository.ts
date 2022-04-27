import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers() {
    return this.find();
  }
}
