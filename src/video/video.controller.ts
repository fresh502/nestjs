import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { VideoService } from './video.service';
import { ApiGetItemsResponse, ApiGetResponse, ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { CreateVideoReqDto, FindVideoReqDto } from './dto/req.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateVideoResDto, FindVideoResDto } from './dto/res.dto';
import { UserAfterAuth } from 'src/common/dto/user.dto';
import { User } from 'src/common/decorator/user.decorator';
import { PageReqDto } from 'src/common/dto/req.dto';

@ApiTags('Video')
@ApiExtraModels(CreateVideoResDto, FindVideoResDto, FindVideoReqDto)
@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiPostResponse(CreateVideoResDto)
  @Post()
  @UseInterceptors(FileInterceptor('video'))
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'mp4',
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() { title }: CreateVideoReqDto,
    @User() { id }: UserAfterAuth,
  ): Promise<CreateVideoResDto> {
    const { mimetype, originalname, buffer } = file;
    const extension = originalname.split('.')[1];
    const video = await this.videoService.create(id, title, mimetype, extension, buffer);
    return CreateVideoResDto.toDto(video);
  }

  @ApiBearerAuth()
  @ApiGetItemsResponse(FindVideoResDto)
  @Get()
  async findAll(@Query() { page, size }: PageReqDto): Promise<{ items: FindVideoResDto[] }> {
    const videos = await this.videoService.findAll(page, size);
    return { items: videos.map((video) => FindVideoResDto.toDto(video)) };
  }

  @ApiBearerAuth()
  @ApiGetResponse(FindVideoResDto)
  @Get(':id')
  async findOne(@Param() { id }: FindVideoReqDto) {
    const video = await this.videoService.findOne(id);
    return FindVideoResDto.toDto(video);
  }

  @ApiBearerAuth()
  @Get(':id/download')
  async play(
    // @Headers('Sec-Fetch-Dest') setFetchDest: 'document' | 'video',
    @Param() { id }: FindVideoReqDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { stream, mimetype, size } = await this.videoService.download(id);
    res.set({
      'Content-Length': size,
      'Content-Type': mimetype,
      // attachment인 경우 호출을 한번만 하게 되지만 비디오를 다운로드 하게 됨
      'Content-Disposition': 'attachment;',
    });
    return new StreamableFile(stream);
  }
}
