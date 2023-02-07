import { Video } from 'src/video/entities/video.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryColumn({ name: 'video_id' })
  videoId: string;

  @Column({ name: 'view_cnt', default: 0 })
  viewCnt: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Video, (video) => video.analytics)
  @JoinColumn({ name: 'video_id' })
  video: Video;
}
