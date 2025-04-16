import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { getKSTTimestamp } from '../utils/time.util';
import { ErrorMessageMap } from '../errors/error-message.map';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.error(exception);

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '서버 내부 오류가 발생했습니다.';
    let errorCode = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const resObj = typeof response === 'string' ? { message: response } : response;

      status = exception.getStatus();
      errorCode = resObj['errorCode'] ?? errorCode;
      message = ErrorMessageMap[errorCode] ?? resObj['message'] ?? message;
    }

    res.status(status).json({
      statusCode: status,
      errorCode,
      message,
      timestamp: getKSTTimestamp(),
      path: req.url,
    });
  }
}
