import { HttpException } from '@nestjs/common';

export class VoucherNotFoundException extends HttpException {
  constructor() {
    super('Voucher not found', 404);
  }
}

export class VoucherCodeAlreadyExistsException extends HttpException {
  constructor() {
    super('Voucher code already exists', 400);
  }
}
