import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActivityStatus } from 'src/common/constants/common.constant';

export class CreateActivityDto {
  @ApiProperty({ description: 'Tiêu đề hoạt động', example: 'Giải giao hữu nội bộ' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ description: 'Ngày bắt đầu', example: '2026-08-05T08:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  startDate!: string;

  @ApiProperty({ description: 'Ngày kết thúc', example: '2026-08-05T18:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  endDate!: string;

  @ApiProperty({
    description: 'Trạng thái',
    enum: ActivityStatus,
    example: ActivityStatus.ACTIVE,
  })
  @IsNotEmpty()
  @IsEnum(ActivityStatus, { message: 'Invalid activity status' })
  status!: ActivityStatus;
}
