import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { DocFolder } from './doc-folder.entity';
import { Doc } from './doc.entity';

@Entity('spaces')
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => SpaceMember, (spaceMember) => spaceMember.space)
  members: SpaceMember[];

  @OneToMany(() => DocFolder, (folder) => folder.space)
  folders: DocFolder[];

  @OneToMany(() => Doc, (doc) => doc.space)
  docs: Doc[];
}
