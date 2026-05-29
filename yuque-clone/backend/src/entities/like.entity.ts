import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Doc } from './doc.entity';
import { User } from './user.entity';

@Entity('likes')
@Unique(['docId', 'userId'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'doc_id' })
  docId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => Doc, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doc_id' })
  doc: Doc;

  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
