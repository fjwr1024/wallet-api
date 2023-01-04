import { SetMetadata } from '@nestjs/common';
import { UserStatus } from '../auth/user-status.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserStatus[]) => SetMetadata(ROLES_KEY, roles);
