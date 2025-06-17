import { webcrypto } from 'crypto';
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as unknown as Crypto;
}

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from './docs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { CustomException } from './common/exceptions/custom.exception';
import { SystemErrorCode } from './common/exceptions/system-error.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 값 제거
      transform: true, // payload를 자동으로 DTO 타입으로 변환
      exceptionFactory: (errors) => {
        return new CustomException(SystemErrorCode.VALIDATION_FAILED, 422);
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(3000);
}
bootstrap();
