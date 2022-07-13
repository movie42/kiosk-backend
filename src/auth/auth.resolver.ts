import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RequestInfo, Roles } from '../common/decorator';
import { Role } from '../common/enum';
import { IRequest } from '../common/interface/request';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginArgs } from './dto/login.args';
import { SignupInput } from './dto/signup.input';
import { TokenOutput } from './dto/token.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Mutation(() => TokenOutput)
  async login(@Args() args: LoginArgs) {
    return this.authService.login(args.email, args.password);
  }

  @Roles(Role.ADMIN)
  @Query(() => TokenOutput)
  async loginByRefreshToken(@RequestInfo() req: Required<IRequest>) {
    if (!req.user.refresh) {
      throw new UnauthorizedException();
    }
    return this.authService.loginByRefreshToken(req.user);
  }

  @Mutation(() => TokenOutput)
  async signup(@Args('user') input: SignupInput) {
    return this.authService.signup(input);
  }

  @Mutation(() => Boolean)
  async withdraw(@RequestInfo() req: Required<IRequest>) {
    return this.userService.removeUser(req.user.id);
  }
}
