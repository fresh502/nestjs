import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
