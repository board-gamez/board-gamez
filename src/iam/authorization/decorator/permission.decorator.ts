import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { PermissionGuard } from '../guard/permission.guard';

export const PERMISSION_KEY = 'auth_key';

export function Permission(permission: string) {
  return applyDecorators(
    SetMetadata(PERMISSION_KEY, permission),
    UseGuards(PermissionGuard),
  );
}
