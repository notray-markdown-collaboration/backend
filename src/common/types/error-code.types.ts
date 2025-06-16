import { AuthErrorCode } from "@/modules/auth/errors/auth-error.enum";
import { SystemErrorCode } from "../exceptions/system-error.enum";

export type ErrorCodeType = SystemErrorCode | AuthErrorCode;
