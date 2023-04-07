import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findAll(page: number, size: number) {
    const users = this.userRepository.find({ skip: (page - 1) * size, take: size });
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('No user');
    return user;
  }

  async create(email: string, password: string) {
    const user = this.userRepository.create({ email, password });
    await this.userRepository.save(user);
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
