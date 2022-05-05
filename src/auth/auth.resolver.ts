import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/sign-up.input';
import { Public } from './public.decorator';
import { LogInInput } from './dto/log-in.input';
import { JwtTokens } from './entities/jwt.entity';

@Resolver()
@Public()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersServise: UsersService
  ) {}

  @Mutation(() => JwtTokens)
  async signUp(
    @Args('data', { type: () => SignUpInput }) data: SignUpInput
  ): Promise<JwtTokens> {
    if (await this.usersServise.findByName(data.username)) {
      // TODO: Move string to a locales file
      throw new BadRequestException(
        'User with this username already registered'
      );
    }

    const passwordHash = await this.authService.hashPassword(data.password);
    const user = await this.usersServise.create({
      passwordHash,
      username: data.username,
    });

    return await this.authService.getTokens(user.id);
  }

  @Mutation(() => JwtTokens)
  async logIn(
    @Args('data', { type: () => LogInInput }) data: LogInInput
  ): Promise<JwtTokens> {
    const user = await this.usersServise.findByName(data.username);

    if (user) {
      const isCorrectPassword = await this.authService.comparePassword(
        data.password,
        user.passwordHash
      );

      if (isCorrectPassword) {
        return await this.authService.getTokens(user.id);
      }
    }

    throw new UnauthorizedException('Wrong Username/Password');
  }
}
