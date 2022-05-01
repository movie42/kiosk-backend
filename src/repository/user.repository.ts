import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers() {
    return this.find();
  }

  async addUser(user: Pick<User, 'email' | 'name' | 'password'>) {
    return this.save(this.create(user));
  }
}
