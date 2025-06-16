import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.get('auth.jwtSecret')!,
      passReqToCallback: true, // request 객체를 validate 함수로 전달
    });
  }

  async validate(req: Request, payload: any) {
    // const refreshToken = req.cookies?.Refresh;
    // return this.usersService.getUserIfRefreshTokenMatches(
    //   refreshToken,
    //   payload.userId,
    // );
  }
}