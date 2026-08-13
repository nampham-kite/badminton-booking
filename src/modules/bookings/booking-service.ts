import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoucherEntity } from 'src/databases/entities/voucher.entity';
import { BookingEntity } from 'src/databases/entities/booking.entity';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { CourtEntity } from 'src/databases/entities/court.entity';
import { TimeSlotEntity } from 'src/databases/entities/time-slot.entity';
import {
  CourtNotActiveException,
  CourtNotFoundException,
} from 'src/common/exceptions/court.exception';
import {
  VoucherNotActiveException,
  VoucherNotFoundException,
  VoucherUsageLimitExceededException,
} from 'src/common/exceptions/voucher.exception';
import {
  BookingAlreadyExistsException,
  TimeSlotNotAvailableException,
} from 'src/common/exceptions/booking.exception';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    @InjectRepository(VoucherEntity)
    private readonly voucherRepository: Repository<VoucherEntity>,
    @InjectRepository(CourtEntity)
    private readonly courtRepository: Repository<CourtEntity>,
    @InjectRepository(TimeSlotEntity)
    private readonly timeSlotRepository: Repository<TimeSlotEntity>,
  ) {}
  async createBooking(
    createBookingDto: CreateBookingDto,
  ): Promise<BookingEntity> {
    const courtId = createBookingDto.courtId;
    const orderDate = new Date(createBookingDto.orderDate);
    if (orderDate < new Date()) {
      throw new BadRequestException('Order date is in the past');
    }

    const court = await this.courtRepository.findOne({
      where: { id: courtId },
    });
    if (!court) {
      throw new CourtNotFoundException();
    }
    if (!court.isActive) {
      throw new CourtNotActiveException();
    }

    const voucherCode = createBookingDto.voucherCode;
    if (voucherCode) {
      const voucher = await this.voucherRepository.findOne({
        where: { code: voucherCode },
      });
      if (!voucher) {
        throw new VoucherNotFoundException();
      }
      if (voucher.status !== 'active') {
        throw new VoucherNotActiveException();
      }
      if (voucher.maxUsage < voucher.usedCount) {
        throw new VoucherUsageLimitExceededException();
      }
    }

    const checkBooking = await this.bookingRepository.findOne({
      where: {
        court: { id: courtId },
        orderDate: new Date(createBookingDto.orderDate),
        start: createBookingDto.start,
        end: createBookingDto.end,
      },
    });

    if (checkBooking) {
      throw new BookingAlreadyExistsException();
    }

    const checkTimeSlot = await this.timeSlotRepository.findOne({
      where: {
        court: { id: courtId },
        start: createBookingDto.start,
        end: createBookingDto.end,
      },
    });
    if (!checkTimeSlot) {
      throw new TimeSlotNotAvailableException();
    }

    const booking = this.bookingRepository.create(createBookingDto);

    const result = await this.bookingRepository.save(booking);

    if (voucherCode) {
      await this.voucherRepository.increment(
        { code: voucherCode },
        'usedCount',
        1,
      );
    }

    return result;
  }
}
