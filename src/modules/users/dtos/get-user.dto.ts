import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @ApiPropertyOptional({ description: 'The name of the user' })
  @IsOptional()
  @IsString()
  name!: string;
}
