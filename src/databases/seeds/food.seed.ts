import { FoodEntity } from '../entities/food.entity';

export const foodSeedData: Partial<FoodEntity>[] = [
  {
    name: 'Nước suối',
    category: 'Đồ uống',
    price: 10000,
    stock: 100,
    status: 'Hoạt động',
  },
  {
    name: 'Sting',
    category: 'Đồ uống',
    price: 15000,
    stock: 50,
    status: 'Hoạt động',
  },
  {
    name: 'Mì ly',
    category: 'Đồ ăn',
    price: 20000,
    stock: 30,
    status: 'Hoạt động',
  },
  {
    name: 'Bánh mì',
    category: 'Đồ ăn',
    price: 25000,
    stock: 40,
    status: 'Hoạt động',
  },
  {
    name: 'Trà đá',
    category: 'Đồ uống',
    price: 5000,
    stock: 200,
    status: 'Hoạt động',
  },
];
