import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configValidationSchema } from "./config/config.schema";
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './shared/redis/redis.module';
import { appConfig, authConfig, databaseConfig } from "./config";
import { TypeOrmModule } from "@nestjs/typeorm";
import redisConfig from "./config/redis.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: configValidationSchema,
      load: [appConfig, authConfig, databaseConfig, redisConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const db = configService.get('database');
        return {
          type: 'mysql',
          host: db.host,
          port: db.port,
          username: db.user,
          password: db.pass,
          database: db.name,
          entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
          synchronize: true,
          // logging: true,
        };
      },
    }),
    AuthModule,
    RedisModule,
  ],
})
export class AppModule {}
