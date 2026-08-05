import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PageOptionDto } from 'src/common/dtos/page-option.dto';

export class GetDeviceDto extends PageOptionDto {
  @ApiPropertyOptional({ description: 'The name of the device' })
  @IsOptional()
  @IsString()
  name?: string;
}
