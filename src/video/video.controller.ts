import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VideoService } from './video.service';

@ApiTags('Video')
@Controller('api/videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create() {
    return this.videoService.create();
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
  async play(@Param('id') id: string) {
    return this.videoService.play(id);
  }
}
