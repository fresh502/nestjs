import { Injectable, StreamableFile } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class VideoService {
  async create(title: string, extension: string, buffer: Buffer): Promise<void> {
    const id = randomUUID();
    const filePath = join(process.cwd(), 'video-storage', `${id}.${extension}`);
    await writeFile(filePath, buffer);
  }

  findAll() {
    return `This action returns all video`;
  }

  async findOne(id: string) {
    return;
  }

  async play(id: string): Promise<{ stream: StreamableFile; mimetype: string; size: number }> {
    const mimetype = 'video/mp4';
    const extension = 'mp4';
    const videoPath = join(process.cwd(), 'video-storage', `${id}.${extension}`);
    const { size } = await stat(videoPath);
    const video = createReadStream(videoPath);
    return { stream: new StreamableFile(video), mimetype, size };
  }
}
