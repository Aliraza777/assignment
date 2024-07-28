import { UserService } from '../../modules/user/user.service';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      // if the route is public, grant permission
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (token) {
      return this.userService
        .getLoggedInUser()
        .then((user) => {
          req['uuid'] = user.uuid;
          return true;
        })
        .catch((e) => {
          console.log(e);
          if (e.status === HttpStatus.NOT_FOUND) {
            throw new HttpException(e.response, e.status);
          }
          return false;
        });
    }
  }
}
