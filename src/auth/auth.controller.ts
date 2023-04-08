import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup() {
    return this.authService.signup('email', 'password');
  }

  @Post('signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }
}
