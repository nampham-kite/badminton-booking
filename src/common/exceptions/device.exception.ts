import { HttpException } from '@nestjs/common';

export class DeviceNotFoundException extends HttpException {
  constructor() {
    super('Device not found', 404);
  }
}
