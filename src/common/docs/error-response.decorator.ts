import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorCode } from '../errors/error-code.enum';
import { HttpStatus } from '@nestjs/common';

export function ApiErrorExamplesResponse(
  status: HttpStatus,
  path: string,
  examples: [ErrorCode, string][],
) {
  const swaggerExamples = examples.reduce((acc, [errorCode, message]) => {
    acc[errorCode] = {
      summary: message,
      value: {
        statusCode: status,
        errorCode,
        message,
        timestamp: '2006-08-28T12:00:00.000Z',
        path,
      },
    };
    return acc;
  }, {} as Record<string, any>);

  return applyDecorators(
    ApiResponse({
      status,
      description: '에러 응답 예시 목록',
      content: {
        'application/json': {
          examples: swaggerExamples,
        },
      },
    }),
  );
}
