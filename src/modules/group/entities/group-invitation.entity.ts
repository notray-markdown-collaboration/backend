import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { GroupEntity } from './group.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { GroupInvitationStatus } from 'src/common/enums';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class GroupInvitationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => GroupEntity, group => group.id, { 
    onDelete: 'CASCADE',
    nullable: false
   })
  @JoinColumn({ name: 'group_id' })
  group: GroupEntity;

  @ManyToOne(() => UserEntity, user => user.id, {
    onDelete: 'CASCADE',
    nullable: false
  })
  @JoinColumn({ name: 'invited_user_id' })
  invitedUser: UserEntity;

  @Column({ type: 'enum', enum: GroupInvitationStatus, default: GroupInvitationStatus.PENDING })
  status: GroupInvitationStatus;

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  setId() {
    if (!this.id) this.id = uuidv4();
  }
}
