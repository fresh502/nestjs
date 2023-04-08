import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entity/video.entity';

@Injectable()
export class VideoService {
  constructor(@InjectRepository(Video) private videoRepository: Repository<Video>) {}

  async create() {
    return 'create';
  }

  async findAll() {
    return 'video list';
  }

  async findOne(id: string) {
    return 'video';
  }

  async download(id: string) {
    return 'play';
  }
}
