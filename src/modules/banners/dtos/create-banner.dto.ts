import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ description: 'Đường dẫn ảnh', example: '/banners/weekend.jpg' })
  @IsNotEmpty()
  @IsString()
  image!: string;

  @ApiProperty({ description: 'Link điều hướng', example: '/booking' })
  @IsNotEmpty()
  @IsString()
  link!: string;

  @ApiProperty({ description: 'Trạng thái', example: 'Hoạt động' })
  @IsNotEmpty()
  @IsString()
  status!: string;
}
