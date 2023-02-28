import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty()
  nickname: string;

  @ApiProperty()
  password: string;
}
