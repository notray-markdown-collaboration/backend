import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { GroupMemberEntity } from './group-member.entity';
import { GroupInvitationEntity } from './group-invitation.entity';

@Entity('groups')
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'owner_id' })
  ownerId: UserEntity;

  @OneToMany(() => GroupMemberEntity, groupMember => groupMember.userId, { onDelete: 'CASCADE' })
  members: GroupMemberEntity[];

  @OneToMany(() => GroupInvitationEntity, invite => invite.groupId, { onDelete: 'CASCADE' })
  invitations: GroupInvitationEntity[];
}
