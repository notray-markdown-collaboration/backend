import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class TokenStorageService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async storeRefreshToken(userId: string, token: string, ttl = 7 * 24 * 60 * 60): Promise<void> {
    await this.redis.set(`refresh:${userId}`, token, 'EX', ttl);
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    return this.redis.get(`refresh:${userId}`);
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    await this.redis.del(`refresh:${userId}`);
  }
}
