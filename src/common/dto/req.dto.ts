import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PageReqDto {
  @ApiPropertyOptional({ description: '페이지. Default = 1' })
  @Transform(({ value }) => Number(value))
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ description: '페이지당 데이터 갯수. min:0, max: 50' })
  @Transform(({ value }) => Number(value))
  @IsInt()
  size?: number = 50;
}
