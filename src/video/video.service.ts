import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'node:fs';
import { stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private videoRepository: Repository<Video>) {}

  async create(title: string, mimetype: string, extension: string, buffer: Buffer): Promise<void> {
    const video = await this.videoRepository.create({ title, mimetype });
    await this.videoRepository.save(video);
    const filePath = join(process.cwd(), 'video-storage', `${video.id}.${extension}`);
    await writeFile(filePath, buffer);
  }

  async findAll() {
    const videos = await this.videoRepository.findBy({});
    return videos;
  }

  async findOne(id: string) {
    const video = await this.videoRepository.findOneBy({ id });
    if (!video) throw new NotFoundException();
    return video;
  }

  async play(id: string): Promise<{ stream: StreamableFile; mimetype: string; size: number }> {
    const video = await this.videoRepository.findOneBy({ id });
    if (!video) throw new NotFoundException();
    const { mimetype } = video;
    const extension = mimetype.split('/')[1];
    const videoPath = join(process.cwd(), 'video-storage', `${id}.${extension}`);
    const { size } = await stat(videoPath);
    const videoStream = createReadStream(videoPath);
    return { stream: new StreamableFile(videoStream), mimetype, size };
  }
}
