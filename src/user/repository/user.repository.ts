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

  async getUserByEmail(email: string): Promise<Pick<User, 'id' | 'password'> | null> {
    return this.repository.findOne({ select: ['id', 'password'], where: { email } });
  }

  async addUser(user: IAddUser) {
    return this.repository.save(this.repository.create(user));
  }
}
