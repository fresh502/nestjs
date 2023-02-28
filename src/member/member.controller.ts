import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMemberDto } from './dto/create-member.dto';
import { MemberService } from './member.service';

@ApiTags('member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  // TODO Headers 필요한 것만 뽑아낼 수 있는 커스텀 데코레이터?
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }
}
