import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking-service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { isPublic } from 'src/decorators/is-public.decorator';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @isPublic()
  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.createBooking(createBookingDto);
  }
}
