import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageOptionDto } from 'src/common/dtos/page-option.dto';

export class GetFoodDto extends PageOptionDto {
  @ApiPropertyOptional({ description: 'Tên món' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Danh mục' })
  @IsOptional()
  @IsString()
  category?: string;
}
