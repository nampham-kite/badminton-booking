import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from 'src/databases/entities/food.entity';
import { FoodController } from './food-controller';
import { FoodService } from './food-service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity])],
  providers: [FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
