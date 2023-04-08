import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupReqDto: SignupReqDto) {
    return this.authService.signup('email', 'password');
  }

  @Post('signin')
  async signin(@Body() signinReqDto: SigninReqDto, @Request() req) {
    return this.authService.signin(req.user);
  }
}
