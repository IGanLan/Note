import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Space } from './space.entity';
import { DocFolder } from './doc-folder.entity';
import { User } from './user.entity';
import { DocVersion } from './doc-version.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

export enum DocStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity('docs')
export class Doc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'space_id' })
  spaceId: number;

  @Column({ name: 'folder_id', nullable: true })
  folderId: number | null;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ name: 'cover_image', nullable: true })
  coverImage: string;

  @Column({ name: 'author_id' })
  authorId: number;

  @Column({ type: 'enum', enum: DocStatus, default: DocStatus.DRAFT })
  status: DocStatus;

  @Column({ name: 'view_count', default: 0 })
  viewCount: number;

  @Column({ name: 'like_count', default: 0 })
  likeCount: number;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date | null;

  @ManyToOne(() => Space, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @ManyToOne(() => DocFolder, { eager: false, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'folder_id' })
  folder: DocFolder | null;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => DocVersion, (version) => version.doc)
  versions: DocVersion[];

  @OneToMany(() => Comment, (comment) => comment.doc)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.doc)
  likes: Like[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
