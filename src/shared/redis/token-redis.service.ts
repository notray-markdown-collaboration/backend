import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class TokenRedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  // The refresh token itself is valid for 14 days, therefore
  // we keep the value in Redis for the same amount of time to
  // prevent valid tokens from being removed prematurely.
  async storeRefreshToken(userId: string, token: string, ttl = 14 * 24 * 60 * 60): Promise<void> {
    await this.redis.set(`refresh:${userId}`, token, 'EX', ttl);
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    return this.redis.get(`refresh:${userId}`);
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    await this.redis.del(`refresh:${userId}`);
  }
}
