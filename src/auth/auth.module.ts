import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

import { User } from '../user/entity/user.entity';
import { UserRepository } from '../user/repository/user.repository';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: config.get('jwt.secret'),
      signOptions: { issuer: 'https://kiosk.kyojs.com' },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, UserService, UserRepository],
})
export class AuthModule {}
