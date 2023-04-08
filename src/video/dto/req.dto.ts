import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoReqDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  video: any;
}

export class FindVideoReqDto {
  @ApiProperty({ required: true })
  id: string;
}
