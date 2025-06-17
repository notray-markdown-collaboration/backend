import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, NotFoundException, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { getKSTTimestamp } from '../utils/time.util';
import { ErrorMessageMap } from '../exceptions/error-message.map';
import { SystemErrorCode } from '../exceptions/system-error.enum';
import { CustomException } from '../exceptions/custom.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.error(exception);

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = SystemErrorCode.INTERNAL_SERVER_ERROR;
    let message = ErrorMessageMap[errorCode];
    let data = null;

    if (exception instanceof CustomException) {
      const response = exception.getResponse();
      const resObj = typeof response === 'string' ? { message: response } : response;

      status = exception.getStatus();
      errorCode = resObj['errorCode'] ?? errorCode;
      message = resObj['message'] ?? ErrorMessageMap[errorCode] ?? message;
      data = resObj['data'] ?? null;
    }
    else if (exception instanceof NotFoundException) {
      status = 404;
      errorCode = SystemErrorCode.NOT_FOUND;
      message = ErrorMessageMap[errorCode];
    } 
    else if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const resObj = typeof response === 'string' ? { message: response } : response;

      status = exception.getStatus();
      message = resObj['message'] ?? message;
      data = resObj['data'] ?? null;
    }

    res.status(status).json({
      statusCode: status,
      errorCode,
      message,
      data,
      timestamp: getKSTTimestamp(),
      path: req.url
    });
  }
}
