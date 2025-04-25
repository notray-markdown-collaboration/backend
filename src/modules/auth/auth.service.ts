import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenRedisService } from '../../shared/redis/token-redis.service';
import { SocialProfile } from './interfaces/social-profile.interface';
import { AuthException } from 'src/common/exceptions/auth.exception';
import { ErrorCode } from 'src/common/errors/error-code.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService, 
    private readonly tokenStorage: TokenRedisService,
  ) {}

  async socialLogin(profile: SocialProfile) {
    const user = await this.usersService.findOrCreateUser(profile);

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.displayName,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '14d' });

    await this.tokenStorage.storeRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    let userId: string;

    try {
      const decoded = this.jwtService.verify(refreshToken);
      userId = decoded.sub;
    } catch (error) {
      throw new AuthException(
        ErrorCode.AUTH_INVALID_REFRESH_TOKEN,
        undefined,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const stored = await this.tokenStorage.getRefreshToken(userId);
    if (!stored || stored !== refreshToken) {
      throw new AuthException(
        ErrorCode.AUTH_INVALID_REFRESH_TOKEN,
        undefined,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.usersService.findOneByCondition({ id: userId });
    if (!user || !user.isActive) {
      throw new AuthException(
        ErrorCode.USER_NOT_FOUND_OR_INACTIVE,
        undefined,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.displayName,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    return { accessToken };
  }

  async logout(userId: string) {
    await this.tokenStorage.deleteRefreshToken(userId);
  }
}
