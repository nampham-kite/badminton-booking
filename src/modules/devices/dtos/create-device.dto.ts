import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from 'node_modules/@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateDeviceDto {
  @ApiProperty({ description: 'The SKU of the device' })
  @IsNotEmpty()
  @IsString()
  sku!: string;
  @ApiProperty({ description: 'The name of the device' })
  @IsNotEmpty()
  @IsString()
  name!: string;
  @ApiProperty({ description: 'The category of the device' })
  @IsNotEmpty()
  @IsString()
  category!: string;
  @ApiProperty({ description: 'The stock of the device' })
  @IsNotEmpty()
  @IsNumber()
  stock!: number;
  @ApiProperty({ description: 'The price of the device' })
  @IsNotEmpty()
  @IsNumber()
  price!: number;
  @ApiProperty({ description: 'The status of the device' })
  @IsNotEmpty()
  @IsString()
  status!: string;
}
