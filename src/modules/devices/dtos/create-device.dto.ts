import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  CatalogStatus,
  DeviceCategory,
} from 'src/common/constants/common.constant';

export class CreateDeviceDto {
  @ApiProperty({ description: 'The SKU of the device', example: '1234567890' })
  @IsNotEmpty()
  @IsString()
  sku!: string;

  @ApiProperty({ description: 'The name of the device', example: 'Device 1' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'The category of the device',
    enum: DeviceCategory,
    example: DeviceCategory.RACKET,
  })
  @IsNotEmpty()
  @IsEnum(DeviceCategory, { message: 'Invalid device category' })
  category!: DeviceCategory;

  @ApiProperty({ description: 'The stock of the device', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  stock!: number;

  @ApiProperty({ description: 'The price of the device', example: 100000 })
  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @ApiProperty({
    description: 'The status of the device',
    enum: CatalogStatus,
    example: CatalogStatus.ACTIVE,
  })
  @IsNotEmpty()
  @IsEnum(CatalogStatus, { message: 'Invalid device status' })
  status!: CatalogStatus;
}
