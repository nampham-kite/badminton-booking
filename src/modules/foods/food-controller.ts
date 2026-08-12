import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FoodService } from './food-service';
import { GetFoodDto } from './dtos/get-food.dto';
import { CreateFoodDto } from './dtos/create-food.dto';
import { UpdateFoodDto } from './dtos/update-food.dto';
import { FoodEntity } from 'src/databases/entities/food.entity';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';
import { ApiBearerAuth } from 'node_modules/@nestjs/swagger/dist/decorators/api-bearer.decorator';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}
  @ApiBearerAuth()
  @Get()
  async getAllFoods(
    @Query() getFoodDto: GetFoodDto,
  ): Promise<ListResponseDto<FoodEntity>> {
    return await this.foodService.getAllFoods(getFoodDto);
  }
  @ApiBearerAuth()
  @Post()
  async createFood(@Body() createFoodDto: CreateFoodDto) {
    return await this.foodService.createFood(createFoodDto);
  }
  @ApiBearerAuth()
  @Put(':id')
  async updateFood(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodDto: UpdateFoodDto,
  ) {
    return await this.foodService.updateFood(id, updateFoodDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  async deleteFood(@Param('id', ParseIntPipe) id: number) {
    return await this.foodService.deleteFood(id);
  }
}
