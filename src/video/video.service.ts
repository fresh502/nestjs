import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream, ReadStream } from 'node:fs';
import { stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DataSource, Repository } from 'typeorm';
import { Video } from './entity/video.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class VideoService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Video) private videoRepository: Repository<Video>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userId: string, title: string, mimetype: string, extension: string, buffer: Buffer): Promise<Video> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      const video = await this.videoRepository.save(this.videoRepository.create({ title, mimetype, user }));
      await this.uploadVideo(video.id, extension, buffer);
      await queryRunner.commitTransaction();
      return video;
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(page: number, size: number) {
    const videos = await this.videoRepository.find({ relations: ['user'], skip: (page - 1) * size, take: size });
    return videos;
  }

  async findOne(id: string) {
    const video = await this.videoRepository.findOne({ relations: ['user'], where: { id } });
    if (!video) throw new NotFoundException('No video');
    return video;
  }

  async download(id: string): Promise<{ stream: ReadStream; mimetype: string; size: number }> {
    const video = await this.videoRepository.findOneBy({ id });
    if (!video) throw new NotFoundException('No video');

    await this.videoRepository.update({ id }, { downloadCnt: () => 'download_cnt + 1' });

    const { mimetype } = video;
    const extension = mimetype.split('/')[1];
    const videoPath = join(process.cwd(), 'video-storage', `${id}.${extension}`);
    const { size } = await stat(videoPath);
    const stream = createReadStream(videoPath);
    return { stream, mimetype, size };
  }

  private async uploadVideo(id: string, extension: string, buffer: Buffer) {
    const filePath = join(process.cwd(), 'video-storage', `${id}.${extension}`);
    await writeFile(filePath, buffer);
  }
}
