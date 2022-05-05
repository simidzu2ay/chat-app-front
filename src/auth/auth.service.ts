import { Injectable } from '@nestjs/common';
import { hashingPassword } from './constants';
import bcrypt from 'bcryptjs';
import { JwtTokens } from './entities/jwt.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServise: JwtService,
    private readonly configService: ConfigService
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, hashingPassword.saltRound);
  }

  async comparePassword(plainPassword: string, hashPassword: string) {
    return await bcrypt.compare(plainPassword, hashPassword);
  }

  // TODO: Make sessions
  async getTokens(userId: number): Promise<JwtTokens> {
    const accessToken = await this.jwtServise.signAsync({
      id: userId,
    });

    const refreshToken = await this.jwtServise.signAsync(
      {
        id: userId,
      },
      { secret: this.configService.get('jwt.secret.refresh'), expiresIn: '1y' }
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
