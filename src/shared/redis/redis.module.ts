import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import Redis from 'ioredis';
import { redisConfig } from 'src/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      inject: [redisConfig.KEY],
      useFactory: (config: ConfigType<typeof redisConfig>) => {
        return new Redis({
          host: config.host,
          port: config.port,
          password: config.password,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
