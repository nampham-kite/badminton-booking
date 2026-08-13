import { Module } from '@nestjs/common';
import { BookingController } from './booking-controller';
import { BookingService } from './booking-service';
import { VoucherEntity } from 'src/databases/entities/voucher.entity';
import { BookingEntity } from 'src/databases/entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtEntity } from 'src/databases/entities/court.entity';
import { TimeSlotEntity } from 'src/databases/entities/time-slot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookingEntity,
      VoucherEntity,
      CourtEntity,
      TimeSlotEntity,
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
