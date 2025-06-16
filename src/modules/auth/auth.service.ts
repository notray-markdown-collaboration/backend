import { HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenRedisService } from '../../shared/redis/token-redis.service';
import { SocialProfile } from './interfaces/social-profile.interface';
import { CustomException } from '@/common/exceptions/custom.exception';
import { AuthErrorCode } from '@/modules/auth/errors/auth-error.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService, 
    private readonly tokenStorage: TokenRedisService,
  ) {}

  async socialLogin(profile: SocialProfile) {
    const user = await this.userService.findOrCreateUser(profile);

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
      throw new CustomException(
        AuthErrorCode.AUTH_INVALID_REFRESH_TOKEN,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const stored = await this.tokenStorage.getRefreshToken(userId);
    if (!stored || stored !== refreshToken) {
      throw new CustomException(
        AuthErrorCode.AUTH_INVALID_REFRESH_TOKEN,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.userService.findOneByCondition({ id: userId });
    if (!user || !user.isActive) {
      throw new CustomException(
        AuthErrorCode.USER_NOT_FOUND_OR_INACTIVE,
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
