import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../modules/firebase/firebase.service';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly firebaseService: FirebaseService,
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
      return this.firebaseService.firebaseApp
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then((decodedToken) => {
          req['user'] = {
            uuid: decodedToken.uid,
            email: decodedToken.email,
          };
          req['admin'] = {
            uuid: decodedToken.uid,
            email: decodedToken.email,
          };
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
    return false;
  }
}
