import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analytics } from './entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(@InjectRepository(Analytics) private analyticsRepository: Repository<Analytics>) {}

  async findAll() {
    const analyticsList = await this.analyticsRepository.findBy({});
    return analyticsList;
  }

  async findOne(id: string) {
    const analytics = await this.analyticsRepository.findOneBy({ videoId: id });
    if (!analytics) throw new NotFoundException();
    return analytics;
  }

  // TODO 동시성 처리
  async addViewCnt(id: string) {
    let analytics = await this.analyticsRepository.findOneBy({ videoId: id });
    if (!analytics) {
      analytics = this.analyticsRepository.create({ videoId: id, viewCnt: 0 });
    }
    analytics.viewCnt = analytics.viewCnt += 1;
    await this.analyticsRepository.save(analytics);
    console.log(`updated viewCnt: ${analytics.viewCnt}`);
  }
}
