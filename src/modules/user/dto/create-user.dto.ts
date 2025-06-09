import { IsString, IsEmail, IsOptional, IsUrl, MaxLength, IsNotEmpty } from 'class-validator';
import { OAuthProvider } from '../../../common/types/oAuthProvider.type';

export class CreateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  displayName?: string;

  @IsUrl()
  @IsOptional()
  profileImage?: string;

  @IsString()
  @IsNotEmpty()
  provider: OAuthProvider;

  @IsString()
  @IsNotEmpty()
  providerId: string;
}

