import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupEntity } from './entities/group.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateGroupDto } from './dto/create-group.dto';
import { User } from '@/common/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // 그룹 목록 조회
  @UseGuards(JwtAuthGuard)
  @Get()
  async findMyGroups(@User() user: UserEntity): Promise<GroupEntity[]> {
    return this.groupService.findMyGroups(user.id);
  }

  // 그룹 생성
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateGroupDto): Promise<GroupEntity> {
    return this.groupService.createGroup(body);
  }
}
