import { INestApplication, ValidationPipe } from '@nestjs/common';
import { FirebaseService } from './modules/firebase/firebase.service';
import * as bodyParser from 'body-parser';
import { Reflector } from '@nestjs/core';
import { FirebaseAuthGuard } from './global/guards/firebase.auth.guard';
import { UserService } from './modules/user/user.service';
import { UserAuthGuard } from './global/guards/user.auth.guard';

export async function registerGlobals(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const reflector = app.get(Reflector);
  const firebaseService = app.get(FirebaseService);
  const userService = app.get(UserService);
  // app.useGlobalGuards(new AuthGuard(reflector));
  // app.useGlobalGuards(new Auth0Guard(reflector));
  app.useGlobalGuards(
    new FirebaseAuthGuard(reflector, firebaseService, userService),
    // new UserAuthGuard(reflector, userService),
    // new RoleAccessGuard(reflector, userService, siteService),;
  );
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
}
