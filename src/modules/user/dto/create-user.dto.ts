import { IsString, IsEmail, IsOptional, IsUrl, MaxLength, IsNotEmpty } from 'class-validator';
import { AuthProvider } from 'src/common/enums/auth-provider.enum';

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
  provider: AuthProvider;

  @IsString()
  @IsNotEmpty()
  providerId: string;
}

