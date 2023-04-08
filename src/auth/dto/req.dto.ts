import { ApiProperty } from '@nestjs/swagger';

export class SignupReqDto {
  @ApiProperty({ required: true, example: 'nestjs@fastcampus.com' })
  email: string;

  @ApiProperty({ required: true, example: 'Password1!' })
  password: string;

  @ApiProperty({ required: true, example: 'Password1!' })
  passwordConfirm: string;
}

export class SigninReqDto {
  @ApiProperty({ required: true, example: 'nestjs@fastcampus.com' })
  email: string;

  @ApiProperty({ required: true, example: 'Password1!' })
  password: string;
}
