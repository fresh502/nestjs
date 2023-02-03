import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { join } from 'node:path';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  async getVideo(
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const videoPath = join(
      process.cwd(),
      'video',
      'SampleVideo_1280x720_1mb.mp4',
    );
    const stats = await stat(videoPath);
    const video = createReadStream(videoPath);
    res.set({
      'Content-Length': stats.size,
      'Content-Type': 'video/mp4',
    });
    return new StreamableFile(video);
  }
}
