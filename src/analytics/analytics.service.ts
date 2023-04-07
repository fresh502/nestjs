import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  // 동시성 해결 관련
  async addDownloadCnt(id: string) {
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
    // await this.analyticsRepository.update({ videoId: id }, { downloadCnt: () => 'download_cnt + 1' });
    // 2
    // const result = await this.analyticsRepository
    //   .createQueryBuilder()
    //   .update(Analytics)
    //   .set({ downCnt: () => 'download_cnt + 1' })
    //   .where('video_id = :id', { id })
    //   .returning('download_cnt')
    //   .execute();
    // console.log(result);
  }
}
