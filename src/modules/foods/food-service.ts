import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodEntity } from 'src/databases/entities/food.entity';
import { GetFoodDto } from './dtos/get-food.dto';
import { CreateFoodDto } from './dtos/create-food.dto';
import { UpdateFoodDto } from './dtos/update-food.dto';
import {
  FoodNameAlreadyExistsException,
  FoodNotFoundException,
} from 'src/common/exceptions/food.exception';
import { paginate } from 'src/common/pagination';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
  ) {}

  async getAllFoods(getFoodDto: GetFoodDto): Promise<ListResponseDto<FoodEntity>> {
    const { name, category } = getFoodDto;
    const where: FindOptionsWhere<FoodEntity> = {};
    if (name) {
      where.name = name;
    }
    if (category) {
      where.category = category;
    }
    return await paginate<FoodEntity>(
      this.foodRepository,
      getFoodDto,
      where,
      {},
    );
  }

  async createFood(createFoodDto: CreateFoodDto): Promise<FoodEntity> {
    const { name } = createFoodDto;
    const existing = await this.foodRepository.findOne({ where: { name } });
    if (existing) {
      throw new FoodNameAlreadyExistsException();
    }

    const food = this.foodRepository.create(createFoodDto);
    return await this.foodRepository.save(food);
  }

  async updateFood(
    id: number,
    updateFoodDto: UpdateFoodDto,
  ): Promise<FoodEntity> {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new FoodNotFoundException();
    }

    if (updateFoodDto.name && updateFoodDto.name !== food.name) {
      const existing = await this.foodRepository.findOne({
        where: { name: updateFoodDto.name },
      });
      if (existing) {
        throw new FoodNameAlreadyExistsException();
      }
    }

    Object.assign(food, updateFoodDto);
    return await this.foodRepository.save(food);
  }

  async deleteFood(id: number): Promise<FoodEntity> {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new FoodNotFoundException();
    }
    return await this.foodRepository.remove(food);
  }
}
