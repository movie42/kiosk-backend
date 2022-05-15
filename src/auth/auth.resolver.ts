import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginArgs } from './dto/login.args';
import { SignupInput } from './dto/signup.input';
import { TokenOutput } from './dto/token.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => TokenOutput)
  async login(@Args() args: LoginArgs) {
    return this.authService.login(args.email, args.password);
  }

  @Mutation(() => TokenOutput)
  async signup(@Args('user') input: SignupInput) {
    return this.authService.signup(input);
  }
}
