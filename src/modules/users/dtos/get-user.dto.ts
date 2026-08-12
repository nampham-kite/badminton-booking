import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageOptionDto } from 'src/common/dtos/page-option.dto';

export class GetUserDto extends PageOptionDto {
  @ApiPropertyOptional({ description: 'The name of the user' })
  @IsOptional()
  @IsString()
  name!: string;
}
