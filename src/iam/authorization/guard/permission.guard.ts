import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/schema/user.schema';
import { PERMISSION_KEY } from '../decorator/permission.decorator';
import { Role } from '../constant/role.constant';
import { PERMISSIONS } from '../constant/permissions.constant';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private getPermissions(role: Role): string[] {
    return Object.keys(PERMISSIONS).filter((action) =>
      PERMISSIONS[action].includes(role),
    );
  }

  private hasPermission(role: Role, permission: string): boolean {
    return this.getPermissions(role).includes(permission);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<string>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (!requiredPermission) return true;

    const req = context.switchToHttp().getRequest();
    const user = req['user'] as User;

    if (!user) return false;

    if ((user.role = Role.ADMIN)) return true;

    return this.hasPermission(user.role, requiredPermission);
  }
}
