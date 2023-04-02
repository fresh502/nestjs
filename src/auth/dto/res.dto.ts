import { ApiProperty } from '@nestjs/swagger';

export class SignupResDto {
  @ApiProperty({ required: true })
  id: string;
}

export class SigninResDto {
  @ApiProperty({ required: true })
  accessToken: string;
}
