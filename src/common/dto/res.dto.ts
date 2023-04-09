import { ApiProperty } from '@nestjs/swagger';

export class PageResDto<TData> {
  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  items: TData[];
}
