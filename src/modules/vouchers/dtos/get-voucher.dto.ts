import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageOptionDto } from 'src/common/dtos/page-option.dto';

export class GetVoucherDto extends PageOptionDto {
  @ApiPropertyOptional({ description: 'Mã voucher' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ description: 'Loại voucher' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'Trạng thái' })
  @IsOptional()
  @IsString()
  status?: string;
}
