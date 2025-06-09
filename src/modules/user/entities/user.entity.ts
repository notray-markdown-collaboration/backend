import { AuthProvider } from 'src/common/enums/auth-provider.enum';
import { GroupInvitationEntity } from 'src/modules/group/entities/group-invitation.entity';
import { GroupMemberEntity } from 'src/modules/group/entities/group-member.entity';
import { GroupEntity } from 'src/modules/group/entities/group.entity';
import { NotificationEntity } from 'src/modules/notofication/entities/notification.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'display_name', nullable: true })
  displayName: string;

  @Column({ name: 'profile_image', nullable: true })
  profileImage: string;

  @Column({ type: 'enum', enum: ['google', 'github'], nullable: false })
  provider: AuthProvider;

  @Column({ name: 'provider_id', nullable: false })
  providerId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => GroupEntity, group => group.ownerId)
  ownedGroups: GroupEntity[];

  @OneToMany(() => GroupMemberEntity, groupMember => groupMember.userId, { onDelete: 'CASCADE' })
  joindGroups: GroupMemberEntity[];

  @OneToMany(() => GroupInvitationEntity, groupInvitation => groupInvitation.invitedUserId)
  receivedInvites: GroupInvitationEntity[];

  @OneToMany(() => NotificationEntity, notification => notification.userId)
  notifications: NotificationEntity[];
}
