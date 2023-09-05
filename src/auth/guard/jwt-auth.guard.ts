import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const parentCanActivate = (await super.canActivate(context)) as boolean;
    const allowedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!allowedRoles) {
      return parentCanActivate;
    }

    const user = context.switchToHttp().getRequest().user;

    const hasRole = () =>
      user.roles.some((role: { id: number; name: string }) =>
        allowedRoles.includes(role.name),
      );

    return parentCanActivate && user && user.roles && hasRole();
  }
}
