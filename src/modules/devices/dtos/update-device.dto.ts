import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from 'node_modules/@nestjs/swagger/dist/decorators/api-property.decorator';

export class UpdateDeviceDto {
  @ApiPropertyOptional({ description: 'The name of the device' })
  @IsOptional()
  @IsString()
  name?: string;
  @ApiPropertyOptional({ description: 'The category of the device' })
  @IsOptional()
  @IsString()
  category?: string;
  @ApiPropertyOptional({ description: 'The stock of the device' })
  @IsOptional()
  @IsNumber()
  stock?: number;
  @ApiPropertyOptional({ description: 'The price of the device' })
  @IsOptional()
  @IsNumber()
  price?: number;
  @ApiPropertyOptional({ description: 'The status of the device' })
  @IsOptional()
  @IsString()
  status?: string;
}
