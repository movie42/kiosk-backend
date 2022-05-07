import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/signup.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Mutation(() => Boolean)
  async signup(@Args('user') input: SignupInput) {
    return this.userService.addUser(input);
  }
}
