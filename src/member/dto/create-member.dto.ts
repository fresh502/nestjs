import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty()
  @Transform((params) => params.value.trim())
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  readonly nickname: string;

  // regex for a basic password must be
  // more than 8 chars
  // /^[A-Za-z0-9]\w{8,}$/

  // more secure regex password must be
  // more than 8 chars
  // at least one number
  // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

  // more secure regex password must be
  // more than 8 chars
  // at least one number
  // at least one special character
  // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

  // ChatGPT
  // Please explain the JavaScript regular expression below
  // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
  // Please translate the above into Korean
  @ApiProperty()
  // @NotIncludeNickname()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
  readonly password: string;
}
