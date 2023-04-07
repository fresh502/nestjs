import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { Video } from './entity/video.entity';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { User } from 'src/user/entity/user.entity';
import { Analytics } from 'src/analytics/entity/analytics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, User, Analytics]), AnalyticsModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
