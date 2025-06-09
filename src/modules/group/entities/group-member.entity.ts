import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GroupEntity } from './group.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { GroupRole } from 'src/common/enums';


@Entity()
export class GroupMemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => GroupEntity, group => group.id)
  @JoinColumn({ name: 'group_id' })
  groupId: GroupEntity;

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: 'user_id' })
  userId: UserEntity;

  @Column({ type: 'enum', enum: GroupRole, default: GroupRole.MEMBER })
  role: GroupRole;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;
}
