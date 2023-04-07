import { Video } from 'src/video/entity/video.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryColumn({ type: 'uuid', name: 'video_id' })
  videoId: string;

  @Column({ name: 'download_cnt', default: 0 })
  downCnt: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Video, (video) => video.analytics)
  @JoinColumn({ name: 'video_id' })
  video: Video;
}
