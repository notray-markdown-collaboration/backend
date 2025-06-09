import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GroupEntity } from './group.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { GroupInvitationStatus } from 'src/common/enums';


@Entity()
export class GroupInvitationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => GroupEntity, group => group.id)
  @JoinColumn({ name: 'group_id' })
  groupId: GroupEntity;

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: 'invited_user_id' })
  invitedUserId: UserEntity;

  @Column({ type: 'enum', enum: GroupInvitationStatus, default: GroupInvitationStatus.PENDING })
  status: GroupInvitationStatus;

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
