import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const RequestInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request =
    ctx.getType() === 'http' ? ctx.switchToHttp().getRequest() : GqlExecutionContext.create(ctx).getContext().req;

  return {
    user: {
      id: request.user.id,
      role: request.user.role,
    },
    ip: request.ip,
    userAgent: request.get('user-agent'),
  };
});
