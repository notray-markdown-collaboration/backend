import { ErrorCodeType } from '../types/error-code.types';
import { SystemErrorCode } from './system-error.enum';
import { AuthErrorCode } from '@/modules/auth/errors/auth-error.enum';


export const ErrorMessageMap: Record<ErrorCodeType, string> = {
  [SystemErrorCode.INTERNAL_SERVER_ERROR]: '서버 내부 오류가 발생했습니다.',
  [SystemErrorCode.NOT_FOUND]: '요청한 리소스를 찾을 수 없습니다.',
  [SystemErrorCode.VALIDATION_FAILED]: '요청한 값이 유효하지 않습니다.',

  [AuthErrorCode.AUTH_INVALID_REFRESH_TOKEN]: '유효하지 않은 리프레시 토큰입니다.',
  [AuthErrorCode.AUTH_INVALID_ACCESS_TOKEN]: '유효하지 않은 액세스 토큰입니다.',
  [AuthErrorCode.USER_NOT_FOUND_OR_INACTIVE]: '사용자를 찾을 수 없거나 비활성화된 계정입니다.',
};
