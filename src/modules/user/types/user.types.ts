import { AuthProvider } from "src/common/enums/auth-provider.enum";

export type FindUserCondition = {
  id?: string;
  email?: string;
  provider?: AuthProvider;
  providerId?: string;
};
