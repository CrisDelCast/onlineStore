import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Este decorador extraerá el usuario autenticado del request
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;  // Devuelve el usuario autenticado
  },
);
