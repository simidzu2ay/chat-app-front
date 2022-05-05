import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      // TODO: move in env constant
      secret: 'TEST',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    UsersModule,
  ],
})
export class AuthModule {}
