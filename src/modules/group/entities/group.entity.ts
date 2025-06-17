import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, BeforeInsert } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { GroupMemberEntity } from './group-member.entity';
import { GroupInvitationEntity } from './group-invitation.entity';
import { v4 as uuidv4 } from 'uuid';

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

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @OneToMany(() => GroupMemberEntity, groupMember => groupMember.user)
  members: GroupMemberEntity[];

  @OneToMany(() => GroupInvitationEntity, invite => invite.group)
  invitations: GroupInvitationEntity[];

  @BeforeInsert()
  setId() {
    if (!this.id) this.id = uuidv4();
  }
}
