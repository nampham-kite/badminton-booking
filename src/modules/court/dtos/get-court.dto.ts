import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetCourtDto {
  @ApiPropertyOptional({ description: 'The name of the court' })
  @IsOptional()
  @IsString()
  name!: string;
}
