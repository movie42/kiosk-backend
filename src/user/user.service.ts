import { Injectable } from '@nestjs/common';

import { IAddUser } from './interface/add-user.interface';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUsers() {
    return this.userRepository.getUsers();
  }

  async getUserByEmail(email: string) {
    const user = this.userRepository.getUserByEmail(email);

    return user;
  }

  async addUser(args: IAddUser) {
    return this.userRepository.addUser(args);
  }
}
