import { HttpException } from '@nestjs/common';

export class ActivityNotFoundException extends HttpException {
  constructor() {
    super('Activity not found', 404);
  }
}
