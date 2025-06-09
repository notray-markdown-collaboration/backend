import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-github2';
import authConfig from 'src/config/auth.config';
import { ConfigType } from '@nestjs/config';
import { SocialProfile } from '../interfaces/social-profile.interface';
import { AuthProvider } from 'src/common/enums/auth-provider.enum';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    @Inject(authConfig.KEY) 
    private readonly config: ConfigType<typeof authConfig>,
  ) {
    super({
      clientID: config.github.clientId!,
      clientSecret: config.github.clientSecret!,
      callbackURL: config.github.callbackURL!,
      scope: ['user:email'],
    });
  }

  async validate(_: string, __: string, profile: Profile): Promise<SocialProfile> {
    return {
      provider: AuthProvider.GITHUB,
      providerId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value || '',
    };
  }
}
