import { ApiProperty } from '@nestjs/swagger';
import { Video } from '../entity/video.entity';

export class CreateVideoResDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  title: string;

  static toDto({ id, title }: Video) {
    return { id, title };
  }
}

export class VideoUserDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  email: string;
}

export class FindVideoResDto {
  @ApiProperty({ required: true })
  id: string;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  user: VideoUserDto;

  static toDto({ id, title, user: { id: userId, email } }: Video) {
    return { id, title, user: { id: userId, email } };
  }
}
