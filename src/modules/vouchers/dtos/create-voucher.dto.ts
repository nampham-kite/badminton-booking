import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVoucherDto {
  @ApiProperty({ description: 'Mã voucher', example: 'WELCOME10' })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @ApiProperty({ description: 'Loại voucher: % hoặc Cố định', example: '%' })
  @IsNotEmpty()
  @IsString()
  type!: string;

  @ApiProperty({ description: 'Giá trị giảm', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  value!: number;

  @ApiProperty({ description: 'Đơn tối thiểu', example: 100000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  minOrderAmount!: number;

  @ApiPropertyOptional({ description: 'Số lần đã dùng', example: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  usedCount?: number;

  @ApiProperty({ description: 'Số lần dùng tối đa', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  maxUsage!: number;

  @ApiProperty({ description: 'Ngày bắt đầu', example: '2026-07-01' })
  @IsNotEmpty()
  @IsDateString()
  startDate!: string;

  @ApiProperty({ description: 'Ngày kết thúc', example: '2026-08-31' })
  @IsNotEmpty()
  @IsDateString()
  endDate!: string;

  @ApiProperty({ description: 'Trạng thái', example: 'Hoạt động' })
  @IsNotEmpty()
  @IsString()
  status!: string;
}
