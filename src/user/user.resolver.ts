import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AddUserInput } from './dto/add-user.input';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { nullable: 'items' })
  async users() {
    return this.userService.getUsers();
  }

  @Mutation(() => Boolean)
  async addUser(@Args('user') args: AddUserInput) {
    return this.userService.addUser(args);
  }
}
