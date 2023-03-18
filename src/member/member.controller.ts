import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMemberDto } from './dto/create-member.dto';
import { MemberService } from './member.service';

@ApiTags('Member')
@Controller('api/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get(':memberId')
  findOne(@Param('memberId') id: string) {
    return this.memberService.findOne(id);
  }
}
