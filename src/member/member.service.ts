import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entity/member.entity';

@Injectable()
export class MemberService {
  private readonly members = [
    {
      id: '1',
      nickname: 'john',
      password: 'changeme',
    },
    {
      id: '2',
      nickname: 'maria',
      password: 'guess',
    },
  ];

  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create({ nickname, password }: CreateMemberDto) {
    const member = await this.memberRepository.save(this.memberRepository.create({ nickname, password }));
    return member;
  }

  async findOneByNickname(nickname: string) {
    return this.members.find((member) => member.nickname === nickname);
  }

  async findOne(id: string) {
    console.log(id);
    return this.members.find((member) => member.id === id);
  }
}
