import { HttpException } from '@nestjs/common';

export class FoodNotFoundException extends HttpException {
  constructor() {
    super('Food not found', 404);
  }
}

export class FoodNameAlreadyExistsException extends HttpException {
  constructor() {
    super('Food name already exists', 400);
  }
}
