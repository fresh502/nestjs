import { ApiProperty } from '@nestjs/swagger';

// Swagger에서 활용하는 Response Class
export class ApiGetResDto<TData> {
  @ApiProperty({ default: 200 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: TData;
}

export class ApiPostResDto<TData> {
  @ApiProperty({ default: 201 })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: TData;
}

export class PageResDto {
  total: number;
  page: number;
  size: number;
}

export class EmptyResDto {}
