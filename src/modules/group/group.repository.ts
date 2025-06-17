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
    return this.groupRepository
      .createQueryBuilder('group')
      .leftJoin('group.owner', 'owner')
      .addSelect(['owner.id', 'owner.displayName'])
      .leftJoinAndSelect('group.members', 'member')
      .leftJoinAndSelect('group.invitations', 'invitation')
      .where('owner.id = :ownerId', { ownerId })
      .orderBy('group.createdAt', 'DESC')
      .getMany();
  }

  async findByMember(userId: string): Promise<GroupEntity[]> {
    return this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.members', 'member')
      .leftJoin('group.owner', 'owner')
      .addSelect('owner.id', 'ownerId')
      .leftJoinAndSelect('group.invitations', 'invitations')
      .where('member.user_id = :userId', { userId })
      .orderBy('group.createdAt', 'DESC')
      .getMany();
  }

  async createGroup(ownerId: string, data: CreateGroupDto): Promise<GroupEntity> {
    const group = this.groupRepository.create({
      name: data.name,
      description: data.description,
      owner: { id: ownerId },
    });
    
    return this.groupRepository.save(group);
  }
}
