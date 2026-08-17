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

export class InvalidBookingTimeRangeException extends HttpException {
  constructor() {
    super('End hour must be after start hour', 400);
  }
}

export class OrderDateInPastException extends HttpException {
  constructor() {
    super('Order date is in the past', 400);
  }
}
