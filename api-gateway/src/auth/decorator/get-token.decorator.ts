import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7); // Extract the token part
      return token;
    }
    return null;
  },
);
