import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { LogoutDto } from '../dto/logout.dto';
import { AuthErrorCode } from '@/modules/auth/errors/auth-error.enum';
import { ApiErrorExamplesResponse } from 'src/common/docs/error-response.decorator';
import { ErrorMessageMap } from '@/common/exceptions/error-message.map';

export const GitHubLoginDoc = () =>
  applyDecorators(ApiOperation({ summary: 'GitHub OAuth 로그인 진입' }));

export const GoogleLoginDoc = () =>
  applyDecorators(ApiOperation({ summary: 'Google OAuth 로그인 진입' }));

export const RefreshTokenDoc = () =>
  applyDecorators(
    ApiOperation({ summary: 'Refresh Token으로 AccessToken 재발급' }),
    ApiBody({ type: RefreshTokenDto }),
    ApiOkResponse({
      description: 'AccessToken 재발급 성공',
      type: RefreshTokenDto,
    }),
    ApiErrorExamplesResponse(401, '/auth/refresh', [
      [AuthErrorCode.AUTH_INVALID_REFRESH_TOKEN, ErrorMessageMap[AuthErrorCode.AUTH_INVALID_REFRESH_TOKEN]],
      [AuthErrorCode.USER_NOT_FOUND_OR_INACTIVE, ErrorMessageMap[AuthErrorCode.USER_NOT_FOUND_OR_INACTIVE]],
    ]),
  );

export const LogoutDoc = () =>
  applyDecorators(
    ApiOperation({ summary: '로그아웃 (Refresh Token 삭제)' }),
    ApiBody({ type: LogoutDto }),
    ApiOkResponse({ description: '로그아웃 성공' }),
  );
