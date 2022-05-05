import { Injectable } from '@nestjs/common';
import { hashingPassword } from './constants';
import bcrypt from 'bcryptjs';
import { JwtTokens } from './entities/jwt.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtServise: JwtService) {}

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
    // TODO: Make a env constant
    const refreshToken = await this.jwtServise.signAsync(
      {
        id: userId,
      },
      { secret: 'TEST2', expiresIn: '1y' }
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
