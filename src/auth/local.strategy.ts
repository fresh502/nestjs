import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Customize Passport
    super({ usernameField: 'nickname' });
  }

  async validate(nickname: string, password: string): Promise<any> {
    const member = await this.authService.validateUser(nickname, password);
    if (!member) {
      throw new UnauthorizedException();
    }
    return member;
  }
}
