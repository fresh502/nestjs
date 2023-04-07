import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindUserReqDto {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;
}
