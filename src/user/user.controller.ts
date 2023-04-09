import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ApiGetItemsResponse, ApiGetResponse } from 'src/common/decorator/swagger.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FindUserResDto } from './dto/res.dto';
import { PageReqDto } from 'src/common/dto/req.dto';
import { FindUserReqDto } from './dto/req.dto';
import { PageResDto } from 'src/common/dto/res.dto';

@ApiTags('User')
@ApiExtraModels(FindUserResDto, PageResDto, PageReqDto, FindUserReqDto)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiGetItemsResponse(FindUserResDto)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() { page, size }: PageReqDto): Promise<{ items: FindUserResDto[] }> {
    const users = await this.userService.findAll(page, size);
    return { items: users.map((user) => FindUserResDto.toDto(user)) };
  }

  @ApiBearerAuth()
  @ApiGetResponse(FindUserResDto)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() { id }: FindUserReqDto): Promise<FindUserResDto> {
    const user = await this.userService.findOne(id);
    return FindUserResDto.toDto(user);
  }
}
