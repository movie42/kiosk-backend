import { Injectable } from '@nestjs/common';

import { IAddUser } from './interface/add-user.interface';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUsers() {
    return this.userRepository.getUsers();
  }

  async getUserById() {
    return this.userRepository.getUserById();
  }

  async getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }

  async addUser(args: IAddUser) {
    return this.userRepository.addUser(args);
  }

  async updateUser(userId: number, name: string) {
    return this.userRepository.updateUser(userId, name);
  }

  async removeUser(userId: number) {
    return this.userRepository.removeUser(userId);
  }
}
