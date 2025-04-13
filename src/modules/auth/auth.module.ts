import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { GithubStrategy } from "./strategy/github.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GoogleStrategy } from "./strategy/google.strategy";
import { TokenStorageService } from "./token-storage.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { TemplateModule } from "src/common/template/template.module";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get("auth.jwtSecret"),
        signOptions: { expiresIn: config.get("auth.expiresIn") },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
    TemplateModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenStorageService, GithubStrategy, GoogleStrategy],
})
export class AuthModule {}
