import { ApiProperty } from '@nestjs/swagger';

export class PageResDto<TData> {
  @ApiProperty({ required: true })
  page: number;

  @ApiProperty({ required: true })
  size: number;

  items: TData[];
}
