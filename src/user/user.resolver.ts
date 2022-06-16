import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RequestInfo, Roles } from '../common/decorator';
import { Role } from '../common/enum';
import { IRequest } from '../common/interface/request';
import { AddUserInput } from './dto/add-user.input';
import { UpdateUserArgs } from './dto/update-user.args';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Query(() => User)
  async me(@RequestInfo() req: Required<IRequest>) {
    return this.userService.getUserById(req.user.id);
  }

  @Roles(Role.ADMIN)
  @Query(() => [User], { nullable: 'items' })
  async users() {
    return this.userService.getUsers();
  }

  @Mutation(() => Boolean)
  async addUser(@Args('user') args: AddUserInput) {
    return this.userService.addUser(args);
  }

  @Mutation(() => Boolean)
  async updateUser(@Args() args: UpdateUserArgs) {
    return this.userService.updateUser(args.userId, args.name);
  }
}
