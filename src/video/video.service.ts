import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream, ReadStream } from 'node:fs';
import { stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { Repository } from 'typeorm';
import { Video } from './entity/video.entity';

@Injectable()
export class VideoService {
  constructor(
    private analyticsService: AnalyticsService,
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}

  async create() {
    return 'create';
  }

  async findAll() {
    return 'video list';
  }

  async findOne(id: string) {
    return 'video';
  }

  async play(id: string) {
    return 'play';
  }
}
