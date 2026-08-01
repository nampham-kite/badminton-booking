import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageOptionDto } from '../../../common/dtos/page-option.dto';

export class GetCourtDto extends PageOptionDto {
  @ApiPropertyOptional({ description: 'The name of the court' })
  @IsOptional()
  @IsString()
  name!: string;
}
