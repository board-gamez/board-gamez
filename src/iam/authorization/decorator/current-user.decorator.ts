import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req['user'] as User;
  },
);
