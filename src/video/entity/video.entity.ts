import { Analytics } from 'src/analytics/entity/analytics.entity';
import { Member } from 'src/member/entity/member.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  mimetype: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Analytics, (analytics) => analytics.video)
  analytics: Analytics;

  @ManyToOne(() => Member, (user) => user.videos)
  @JoinColumn({ name: 'user_id' })
  user: Member;
}
