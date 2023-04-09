import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signup(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user) throw new BadRequestException('Email is already existed');
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = await this.userService.create(email, hashedPassword);
    return newUser;
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return {
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }
}
