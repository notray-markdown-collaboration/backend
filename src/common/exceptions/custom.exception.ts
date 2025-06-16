import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(errorCode: string, status: HttpStatus = HttpStatus.BAD_REQUEST, message?: string) {
    super({ errorCode, message }, status);
  }
}
