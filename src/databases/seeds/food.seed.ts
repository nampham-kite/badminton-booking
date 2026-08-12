import { FoodEntity } from '../entities/food.entity';
import {
  CatalogStatus,
  FoodCategory,
} from '../../common/constants/common.constant';

export const foodSeedData: Partial<FoodEntity>[] = [
  {
    name: 'Nước suối',
    category: FoodCategory.DRINK,
    price: 10000,
    stock: 100,
    status: CatalogStatus.ACTIVE,
  },
  {
    name: 'Sting',
    category: FoodCategory.DRINK,
    price: 15000,
    stock: 50,
    status: CatalogStatus.ACTIVE,
  },
  {
    name: 'Mì ly',
    category: FoodCategory.FOOD,
    price: 20000,
    stock: 30,
    status: CatalogStatus.ACTIVE,
  },
  {
    name: 'Bánh mì',
    category: FoodCategory.FOOD,
    price: 25000,
    stock: 40,
    status: CatalogStatus.ACTIVE,
  },
  {
    name: 'Trà đá',
    category: FoodCategory.DRINK,
    price: 5000,
    stock: 200,
    status: CatalogStatus.ACTIVE,
  },
];
