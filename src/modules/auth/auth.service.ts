import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenStorageService } from './token-storage.service';
import { OAuthProvider, UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialProfile } from './interfaces/social-profile.interface';
import { AuthException } from 'src/common/exceptions/auth.exception';
import { ErrorCode } from 'src/common/errors/error-code.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService, 
    private readonly tokenStorage: TokenStorageService,
  ) {}

  async socialLogin(profile: SocialProfile) {
    const user = await this.findOrCreateUser(profile);

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

    const user = await this.userRepository.findOne({ where: { id: userId } });
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

  private async findOrCreateUser(profile: SocialProfile): Promise<UserEntity> {
    let user = await this.userRepository.findOne({
      where: {
        provider: profile.provider,
        providerId: profile.providerId,
      },
    });

    if (!user) {
      user = this.userRepository.create({
        email: profile.email,
        displayName: profile.name,
        profileImage: profile.profileImage,
        provider: profile.provider,
        providerId: profile.providerId,
      });
      user = await this.userRepository.save(user);
    }

    return user;
  }
}
