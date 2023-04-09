import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoResDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  title: string;
}

export class FindVideoUserResDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  email: string;
}

export class FindVideoResDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  user: FindVideoUserResDto;
}
