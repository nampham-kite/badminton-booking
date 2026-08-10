import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageOptionDto } from 'src/common/dtos/page-option.dto';

export class GetActivityDto extends PageOptionDto {
  @ApiPropertyOptional({ description: 'Tiêu đề' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Trạng thái' })
  @IsOptional()
  @IsString()
  status?: string;
}
