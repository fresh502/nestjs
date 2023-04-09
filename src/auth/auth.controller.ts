import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { SigninResDto, SignupResDto } from './dto/res.dto';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';

@ApiTags('Auth')
@ApiExtraModels(SignupResDto, SigninResDto)
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiPostResponse(SignupResDto)
  @Post('signup')
  async signup(@Body() { email, password, passwordConfirm }: SignupReqDto): Promise<SignupResDto> {
    if (password !== passwordConfirm) throw new BadRequestException('Password and PasswordConfirm is not matched.');
    const { id } = await this.authService.signup(email, password);
    return { id };
  }

  @Public()
  @ApiPostResponse(SigninResDto)
  @Post('signin')
  async signin(@Body() { email, password }: SigninReqDto): Promise<SigninResDto> {
    return this.authService.signin(email, password);
  }
}
