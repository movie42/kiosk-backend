import { Injectable } from '@nestjs/common';

import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUsers() {
    return this.userRepository.getUsers();
  }

  async addUser(args: Pick<User, 'email' | 'name' | 'password'>) {
    return this.userRepository.addUser(args);
  }
}
