import { HttpException } from '@nestjs/common';

export class DeviceNotFoundException extends HttpException {
  constructor() {
    super('Device not found', 404);
  }
}


export class DeviceSkuAlreadyExistsException extends HttpException {
  constructor() {
    super('Device SKU already exists', 400);
  }
}