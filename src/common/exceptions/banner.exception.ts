import { HttpException } from '@nestjs/common';

export class BannerNotFoundException extends HttpException {
  constructor() {
    super('Banner not found', 404);
  }
}
