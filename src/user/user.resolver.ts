import { Query, Resolver } from '@nestjs/graphql';

import { User } from '../entity/user';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { nullable: 'items' })
  async users() {
    return this.userService.getUsers();
  }
}
