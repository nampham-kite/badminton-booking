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

export class VoucherNotActiveException extends HttpException {
  constructor() {
    super('Voucher is not active', 400);
  }
}

export class VoucherUsageLimitExceededException extends HttpException {
  constructor() {
    super('Voucher usage limit exceeded', 400);
  }
}
