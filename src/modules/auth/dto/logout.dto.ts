import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty({ description: '사용자 ID', example: 'a1b2c3d4' })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
