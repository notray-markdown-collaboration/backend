import { ErrorCode } from './error-code.enum';

export const ErrorMessageMap: Record<ErrorCode, string> = {
  [ErrorCode.INTERNAL_SERVER_ERROR]: '서버 내부 오류가 발생했습니다.',
  
  [ErrorCode.AUTH_INVALID_REFRESH_TOKEN]: '유효하지 않은 리프레시 토큰입니다.',
  [ErrorCode.USER_NOT_FOUND_OR_INACTIVE]: '사용자를 찾을 수 없거나 비활성화된 계정입니다.',
};
