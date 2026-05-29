import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Space } from './space.entity';
import { DocFolder } from './doc-folder.entity';
import { User } from './user.entity';
import { Doc } from './doc.entity';

@Entity('doc_folders')
export class DocFolder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'space_id' })
  spaceId: number;

  @Column({ name: 'parent_id', nullable: true })
  parentId: number | null;

  @Column()
  name: string;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number | null;

  @ManyToOne(() => Space, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'space_id' })
  space: Space;

  @ManyToOne(() => DocFolder, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: DocFolder | null;

  @OneToMany(() => DocFolder, (folder) => folder.parent)
  children: DocFolder[];

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'created_by' })
  creator: User | null;

  @OneToMany(() => Doc, (doc) => doc.folder)
  docs: Doc[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
