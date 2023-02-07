import { Body, Controller, Get, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  // TODO Headers 필요한 것만 뽑아낼 수 있는 커스텀 데코레이터?
  create(@UploadedFile() { mimetype, originalname, buffer }: Express.Multer.File, @Body('title') title: string) {
    const extension = originalname.split('.')[1];
    return this.videoService.create(title, mimetype, extension, buffer);
  }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(id);
  }

  @Get(':id/play')
  async play(@Param('id') id: string, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    const { stream, mimetype, size } = await this.videoService.play(id);
    res.set({
      'Content-Length': size,
      'Content-Type': mimetype,
    });
    return stream;
  }
}
