import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import { SigninResDto, SignupResDto } from './dto/res.dto';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';

@ApiTags('Auth')
@ApiExtraModels(SignupResDto, SigninResDto)
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiPostResponse(SignupResDto)
  @Post('signup')
  async signup(@Body() signupReqDto: SignupReqDto) {
    return this.authService.signup('email', 'password');
  }

  @ApiPostResponse(SigninResDto)
  @Post('signin')
  async signin(@Body() signinReqDto: SigninReqDto, @Request() req) {
    return this.authService.signin(req.user);
  }
}
