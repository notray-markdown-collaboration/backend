export interface SocialProfile {
  provider: 'google' | 'github';
  providerId: string;
  name: string;
  email: string;
  profileImage?: string;
}