import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupRepository } from './group.repository';
import { GroupEntity } from './entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity])],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
})
export class GroupModule {}
