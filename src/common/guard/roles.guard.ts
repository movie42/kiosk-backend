import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ROLES_KEY } from '../decorator';
import { Role } from '../enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    const restUserRole = context.switchToHttp().getRequest()?.user.role;
    const gqlUserRole = GqlExecutionContext.create(context).getContext().req?.user.role;

    if (!roles) {
      return true;
    }

    if (roles.includes(gqlUserRole) || roles.includes(restUserRole)) {
      return true;
    } else {
      return false;
    }
  }
}
