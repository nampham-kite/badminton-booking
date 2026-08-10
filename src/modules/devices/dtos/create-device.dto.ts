import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from 'node_modules/@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateDeviceDto {
  @ApiProperty({ description: 'The SKU of the device' , example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  sku!: string;
  @ApiProperty({ description: 'The name of the device' , example: 'Device 1' })
  @IsNotEmpty()
  @IsString()
  name!: string;
  @ApiProperty({ description: 'The category of the device' , example: 'Category 1' })
  @IsNotEmpty()
  @IsString()
  category!: string;
  @ApiProperty({ description: 'The stock of the device' , example: 10 })
  @IsNotEmpty()
  @IsNumber()
  stock!: number;
  @ApiProperty({ description: 'The price of the device' , example: 100000 })
  @IsNotEmpty()
  @IsNumber()
  price!: number;
  @ApiProperty({ description: 'The status of the device' , example: 'Active' })
  @IsNotEmpty()
  @IsString()
  status!: string;
}
