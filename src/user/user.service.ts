import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findAll() {
    return 'find users';
  }

  async findOne(id: string) {
    return 'find user';
  }

  async create(email: string, password: string) {
    return 'create user';
  }

  async findOneByEmail(email: string) {
    return 'find user by email';
  }
}
