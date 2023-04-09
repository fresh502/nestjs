import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import { SigninResDto, SignupResDto } from './dto/res.dto';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { Public } from 'src/common/decorator/public.decorator';

@ApiTags('Auth')
@ApiExtraModels(SignupResDto, SigninResDto)
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiPostResponse(SignupResDto)
  @Public()
  @Post('signup')
  async signup(@Body() { email, password, passwordConfirm }: SignupReqDto) {
    if (password !== passwordConfirm) throw new BadRequestException('Password and PasswordConfirm is not matched.');
    const { id } = await this.authService.signup(email, password);
    return { id };
  }

  @ApiPostResponse(SigninResDto)
  @Public()
  @Post('signin')
  async signin(@Body() { email, password }: SigninReqDto) {
    return this.authService.signin(email, password);
  }
}
