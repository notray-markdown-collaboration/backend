import { OAuthProvider } from 'src/common/types/oAuthProvider.type';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'display_name', nullable: true })
  displayName: string;

  @Column({ name: 'profile_image', nullable: true })
  profileImage: string;

  @Column({ type: 'enum', enum: ['google', 'github'], nullable: false })
  provider: OAuthProvider;

  @Column({ name: 'provider_id', nullable: false })
  providerId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
