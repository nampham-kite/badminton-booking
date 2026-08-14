import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookingService } from './booking-service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { GetBookingDto } from './dtos/get-booking.dto';
import { isPublic } from 'src/decorators/is-public.decorator';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @isPublic()
  @Get()
  async getBookings(@Query() getBookingDto: GetBookingDto) {
    return await this.bookingService.getBookings(getBookingDto);
  }

  @isPublic()
  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.createBooking(createBookingDto);
  }
}
