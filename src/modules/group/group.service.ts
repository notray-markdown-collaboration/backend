import { Injectable } from '@nestjs/common';
import { GroupRepository } from './group.repository';
import { GroupEntity } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async findMyGroups(userId: string): Promise<GroupEntity[]> {
    const ownerGroups = await this.groupRepository.findByOwner(userId);
    const joindGroups = await this.groupRepository.findByMember(userId);

    return [...ownerGroups, ...joindGroups];
  }

  async createGroup(data: CreateGroupDto): Promise<GroupEntity> {
    return this.groupRepository.createGroup(data);
  }
}
