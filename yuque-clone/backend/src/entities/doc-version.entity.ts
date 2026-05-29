import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Doc } from './doc.entity';
import { User } from './user.entity';

@Entity('doc_versions')
export class DocVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'doc_id' })
  docId: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'version_number' })
  versionNumber: number;

  @Column({ name: 'saved_by', nullable: true })
  savedBy: number | null;

  @CreateDateColumn({ name: 'saved_at' })
  savedAt: Date;

  @Column({ name: 'change_summary', nullable: true })
  changeSummary: string | null;

  @ManyToOne(() => Doc, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doc_id' })
  doc: Doc;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'saved_by' })
  saver: User | null;
}
