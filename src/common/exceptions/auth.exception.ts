import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthException extends HttpException {
  constructor(errorCode: string, message?: string, status: HttpStatus = HttpStatus.UNAUTHORIZED) {
    super({ errorCode, message }, status);
  }
}
