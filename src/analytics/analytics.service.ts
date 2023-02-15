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
    // let analytics = await this.analyticsRepository.findOneBy({ videoId: id });
    // if (!analytics) {
    //   analytics = this.analyticsRepository.create({ videoId: id, viewCnt: 0 });
    // }
    // analytics.viewCnt = analytics.viewCnt += 1;
    // await this.analyticsRepository.save(analytics);
    // console.log(`updated viewCnt: ${analytics.viewCnt}`);

    // 동시성 해결 & 트랜잭션의 write lock
    //chrisjune-13837.medium.com/db-%EB%8F%99%EC%8B%9C%EC%84%B1-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0%EB%B0%A9%EB%B2%95-f5e52e2e3
    // 1
    // await this.analyticsRepository.update({ videoId: id }, { viewCnt: () => 'view_cnt + 1' });

    // 2
    const result = await this.analyticsRepository
      .createQueryBuilder()
      .update(Analytics)
      .set({ viewCnt: () => 'view_cnt + 1' })
      .where('video_id = :id', { id })
      .returning('view_cnt')
      .execute();

    console.log(result);
  }
}
