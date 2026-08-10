import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  CatalogStatus,
  FoodCategory,
} from 'src/common/constants/common.constant';

export class CreateFoodDto {
  @ApiProperty({ description: 'Tên món', example: 'Nước suối' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Danh mục',
    enum: FoodCategory,
    example: FoodCategory.DRINK,
  })
  @IsNotEmpty()
  @IsEnum(FoodCategory, { message: 'Invalid food category' })
  category!: FoodCategory;

  @ApiProperty({ description: 'Giá', example: 10000 })
  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @ApiProperty({ description: 'Tồn kho', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  stock!: number;

  @ApiProperty({
    description: 'Trạng thái',
    enum: CatalogStatus,
    example: CatalogStatus.ACTIVE,
  })
  @IsNotEmpty()
  @IsEnum(CatalogStatus, { message: 'Invalid food status' })
  status!: CatalogStatus;
}
