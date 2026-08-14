import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PageOptionDto } from 'src/common/dtos/page-option.dto';

export class GetBookingDto extends PageOptionDto {
  @ApiPropertyOptional({ description: 'ID sân', example: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
  courtId?: number;

  @ApiPropertyOptional({
    description: 'Ngày đặt sân',
    example: '2026-08-15',
  })
  @IsOptional()
  @IsString()
  orderDate?: string;
}
