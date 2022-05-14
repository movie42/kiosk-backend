import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entity/user.entity';
import { IAddUser } from '../interface/add-user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async getUsers() {
    return this.repository.find();
  }

  async addUser(user: IAddUser) {
    await this.repository.save(this.repository.create(user));
    return true;
  }
}
