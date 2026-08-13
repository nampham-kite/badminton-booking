import { HttpException } from '@nestjs/common';

export class BookingAlreadyExistsException extends HttpException {
  constructor() {
    super('Booking already exists', 400);
  }
}

export class TimeSlotNotAvailableException extends HttpException {
  constructor() {
    super('Time slot not available', 404);
  }
}
