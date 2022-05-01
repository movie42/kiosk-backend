import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '../entity/user.entity';
import { AddUserArgs } from './dto/add-user.args';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { nullable: 'items' })
  async users() {
    return this.userService.getUsers();
  }

  @Mutation(() => Boolean)
  async addUser(args: AddUserArgs) {
    return this.userService.addUser(args);
  }
}
