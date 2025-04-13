import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-google-oauth20';
import authConfig from 'src/config/auth.config';
import { ConfigType } from '@nestjs/config';
import { SocialProfile } from '../interfaces/social-profile.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(authConfig.KEY) 
    private readonly config: ConfigType<typeof authConfig>,
  ) {
    super({
      clientID: config.google.clientId!,
      clientSecret: config.google.clientSecret!,
      callbackURL: config.google.callbackURL!,
      scope: ['email', 'profile'],
    });
  }

  async validate(_: string, __: string, profile: Profile): Promise<SocialProfile> {
    return {
      provider: 'google',
      providerId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value || '',
    };
  }
}
