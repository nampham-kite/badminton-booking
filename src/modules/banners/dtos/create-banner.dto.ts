import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CatalogStatus } from 'src/common/constants/common.constant';

export class CreateBannerDto {
  @ApiProperty({ description: 'Thứ tự hiển thị', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  sortOrder!: number;

  @ApiProperty({ description: 'Tiêu đề', example: 'Ưu đãi đặt sân cuối tuần' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Đường dẫn ảnh',
    example:
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1800&q=80',
  })
  @IsNotEmpty()
  @IsString()
  image!: string;

  @ApiProperty({ description: 'Link điều hướng', example: '/booking' })
  @IsNotEmpty()
  @IsString()
  link!: string;

  @ApiProperty({
    description: 'Trạng thái',
    enum: CatalogStatus,
    example: CatalogStatus.ACTIVE,
  })
  @IsNotEmpty()
  @IsEnum(CatalogStatus, { message: 'Invalid banner status' })
  status!: CatalogStatus;
}
