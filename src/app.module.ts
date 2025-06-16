import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configValidationSchema } from "./config/config.schema";
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './shared/redis/redis.module';
import { UserModule } from "./modules/user/user.module";
import { appConfig, authConfig, databaseConfig, redisConfig } from "./config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupModule } from './modules/group/group.module';
import { NotoficationModule } from './modules/notofication/notofication.module';

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
    RedisModule,
    AuthModule,
    UserModule,
    GroupModule,
    NotoficationModule,
  ],
})
export class AppModule {}
