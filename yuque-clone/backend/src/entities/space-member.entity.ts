import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Space } from './space.entity';
import { User } from './user.entity';

export enum SpaceMemberRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  GUEST = 'guest',
}

@Entity('space_members')
@Unique(['spaceId', 'userId'])
export class SpaceMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'space_id' })
  spaceId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => Space, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: SpaceMemberRole, default: SpaceMemberRole.MEMBER })
  role: SpaceMemberRole;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;
}
