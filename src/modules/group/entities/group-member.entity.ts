import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { GroupEntity } from './group.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { GroupRole } from 'src/common/enums';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class GroupMemberEntity {
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
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'enum', enum: GroupRole, default: GroupRole.MEMBER })
  role: GroupRole;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;

  @BeforeInsert()
  setId() {
    if (!this.id) this.id = uuidv4();
  }
}
