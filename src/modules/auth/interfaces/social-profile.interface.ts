import { AuthProvider } from "src/common/enums/auth-provider.enum";

export interface SocialProfile {
  provider: AuthProvider;
  providerId: string;
  name: string;
  email: string;
  profileImage?: string;
}