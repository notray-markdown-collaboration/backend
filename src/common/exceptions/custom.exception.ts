import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    errorCode: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    { message, data }: { message?: string; data?: any } = {},
  ) {
    super({ errorCode, message, data }, status);
  }
}
