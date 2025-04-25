import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { GithubStrategy } from "./strategy/github.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GoogleStrategy } from "./strategy/google.strategy";
import { TokenRedisService } from "../../shared/redis/token-redis.service";
import { TemplateModule } from "src/shared/template/template.module";
import { UsersModule } from "../users/users.module";

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
    TemplateModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenRedisService, GithubStrategy, GoogleStrategy],
})
export class AuthModule {}
