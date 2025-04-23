import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}

  // id로 사용자 조회
  async findOneByCondition(condition: Partial<UserEntity>): Promise<UserEntity | null> {
    return this.usersRepository.findOne(condition);
  }

  // 유저 조회 및 생성
  async findOrCreateUser(userData: CreateUserDto): Promise<UserEntity> {
    let user = await this.usersRepository.findOne({
      provider: userData.provider,
      providerId: userData.providerId,
    });

    // 유저가 존재하지 않으면 생성
    if (!user) {
      user = await this.usersRepository.create({
        email: userData.email,
        displayName: userData.displayName,
        profileImage: userData.profileImage,
        provider: userData.provider,
        providerId: userData.providerId,
      });
    }

    return user;
  }
}
