import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ApiGetItemsResponse, ApiGetResponse } from 'src/common/decorator/swagger.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FindUserResDto } from './dto/res.dto';
import { PageReqDto } from 'src/common/dto/req.dto';
import { FindUserReqDto } from './dto/req.dto';

@ApiTags('User')
@ApiExtraModels(FindUserResDto)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: '유저 리스트' })
  @ApiBearerAuth()
  @ApiGetItemsResponse(FindUserResDto)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() { page, size }: PageReqDto): Promise<{ items: FindUserResDto[] }> {
    const users = await this.userService.findAll(page, size);
    return { items: users.map((user) => FindUserResDto.toDto(user)) };
  }

  @ApiOperation({ description: '유저' })
  @ApiBearerAuth()
  @ApiGetResponse(FindUserResDto)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() { id }: FindUserReqDto): Promise<FindUserResDto> {
    const user = await this.userService.findOne(id);
    return FindUserResDto.toDto(user);
  }
}
