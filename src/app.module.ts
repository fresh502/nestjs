import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsModule } from './analytics/analytics.module';
import { MemberModule } from './member/member.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'nestjs',
      password: 'nestjs',
      database: 'nestjs',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    VideoModule,
    AnalyticsModule,
    MemberModule,
  ],
})
export class AppModule {}
