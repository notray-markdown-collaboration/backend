import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, user => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  message: string;

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @Column({ name: 'is_sent_by_email', default: false })
  isSentByEmail: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  setId() {
    if (!this.id) this.id = uuidv4();
  }
}
