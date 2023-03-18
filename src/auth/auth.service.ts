import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberService } from 'src/member/member.service';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  async validateUser(nickname: string, password: string): Promise<any> {
    const member = await this.memberService.findOneByNickname(nickname);
    if (member && member.password === password) {
      const { ...result } = member;
      return result;
    }
    return null;
  }

  async signin(member: any) {
    const payload = { nickname: member.nickname, sub: member.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
