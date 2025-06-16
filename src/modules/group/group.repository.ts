import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupRepository {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async findByOwner(ownerId: string): Promise<GroupEntity[]> {
    return this.groupRepository.find({
      where: { ownerId: { id: ownerId } },
      relations: ['ownerId', 'members', 'invitations'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByMember(userId: string): Promise<GroupEntity[]> {
    return this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.members', 'member')
      .leftJoinAndSelect('group.ownerId', 'ownerId')
      .leftJoinAndSelect('group.invitations', 'invitations')
      .where('member.userId = :userId', { userId })
      .orderBy('group.createdAt', 'DESC')
      .getMany();
  }

  async createGroup(data: CreateGroupDto): Promise<GroupEntity> {
    const group = this.groupRepository.create(data);
    return this.groupRepository.save(group);
  }
}
