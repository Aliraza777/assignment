import { SetMetadata } from '@nestjs/common';
import { UserRolesEnum } from '../enums/user.roles.enum';

export const Roles = (...roles: UserRolesEnum[]) => SetMetadata('roles', roles);
