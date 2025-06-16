import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomException } from '../exceptions/custom.exception';
import { AuthErrorCode } from '../../modules/auth/errors/auth-error.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw new CustomException(
        AuthErrorCode.AUTH_INVALID_ACCESS_TOKEN,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}