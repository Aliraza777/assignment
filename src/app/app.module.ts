import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource } from '../../ormconfig';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { FirebaseService } from '../modules/firebase/firebase.service';
import { UserService } from '../modules/user/user.service';
import { HttpModule } from '@nestjs/axios';
import { UserController } from '../modules/user/user.controller';
import { User } from '../models/user.entity';
import { RequestContextModule } from 'nestjs-request-context';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return connectionSource.options;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource({
          dataSource: new DataSource(options),
          name: 'default',
          patch: false,
        });
      },
    }),
    TypeOrmModule.forFeature([
      User,
    ]),
    ConfigModule.forRoot(),
    HttpModule,
    RequestContextModule,
    NestjsFormDataModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    FirebaseService,
    UserService,
  ],
})
export class AppModule {}
