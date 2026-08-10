import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodDto {
  @ApiProperty({ description: 'Tên món', example: 'Nước suối' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Danh mục', example: 'Đồ uống' })
  @IsNotEmpty()
  @IsString()
  category!: string;

  @ApiProperty({ description: 'Giá', example: 10000 })
  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @ApiProperty({ description: 'Tồn kho', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  stock!: number;

  @ApiProperty({ description: 'Trạng thái', example: 'Hoạt động' })
  @IsNotEmpty()
  @IsString()
  status!: string;
}
