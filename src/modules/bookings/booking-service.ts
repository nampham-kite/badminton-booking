import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';
import { VoucherEntity } from 'src/databases/entities/voucher.entity';
import { BookingEntity } from 'src/databases/entities/booking.entity';
import { CourtEntity } from 'src/databases/entities/court.entity';
import { TimeSlotEntity } from 'src/databases/entities/time-slot.entity';
import {
  CourtNotActiveException,
  CourtNotFoundException,
} from 'src/common/exceptions/court.exception';
import {
  VoucherMinOrderAmountNotMetException,
  VoucherNotActiveException,
  VoucherNotFoundException,
  VoucherUsageLimitExceededException,
} from 'src/common/exceptions/voucher.exception';
import {
  BookingAlreadyExistsException,
  InvalidBookingTimeRangeException,
  OrderDateInPastException,
  TimeSlotNotAvailableException,
} from 'src/common/exceptions/booking.exception';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { GetBookingDto } from './dtos/get-booking.dto';

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

  async getBookings(
    getBookingDto: GetBookingDto,
  ): Promise<ListResponseDto<BookingEntity>> {
    const {
      courtId,
      orderDate,
      page = 1,
      limit = 10,
      sort = 'createdAt',
      sortOrder = 'DESC',
    } = getBookingDto;

    const qb = this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.court', 'court')
      .where('booking.deletedAt IS NULL');

    if (courtId) {
      qb.andWhere('booking.courtId = :courtId', { courtId });
    }
    if (orderDate) {
      qb.andWhere('DATE(booking.orderDate) = :orderDate', { orderDate });
    }

    qb.orderBy(`booking.${sort}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async createBooking(
    createBookingDto: CreateBookingDto,
  ): Promise<BookingEntity> {
    const courtId = createBookingDto.courtId;
    const start = createBookingDto.start;
    const end = createBookingDto.end;

    if (end <= start) {
      throw new InvalidBookingTimeRangeException();
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const orderDate = new Date(createBookingDto.orderDate);
    orderDate.setHours(0, 0, 0, 0);
    if (orderDate < today) {
      throw new OrderDateInPastException();
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
      if (voucher.usedCount >= voucher.maxUsage) {
        throw new VoucherUsageLimitExceededException();
      }
      if (createBookingDto.totalPrice < voucher.minOrderAmount) {
        throw new VoucherMinOrderAmountNotMetException();
      }
    }

    const overlap = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.courtId = :courtId', { courtId })
      .andWhere('DATE(booking.orderDate) = :orderDate', {
        orderDate: createBookingDto.orderDate,
      })
      .andWhere('booking.start < :end AND booking.end > :start', { start, end })
      .andWhere('booking.deletedAt IS NULL')
      .getOne();

    if (overlap) {
      throw new BookingAlreadyExistsException();
    }

    const timeSlots = await this.timeSlotRepository.find({
      where: { court: { id: courtId } },
    });
    for (let hour = start; hour < end; hour += 1) {
      const covered = timeSlots.some(
        (slot) => hour >= slot.start && hour < slot.end,
      );
      if (!covered) {
        throw new TimeSlotNotAvailableException();
      }
    }

    const booking = this.bookingRepository.create({
      court,
      start,
      end,
      orderDate,
      name: createBookingDto.name,
      phoneNumber: createBookingDto.phoneNumber,
      note: createBookingDto.note ?? '',
      totalPrice: createBookingDto.totalPrice,
    });

    const result = await this.bookingRepository.save(booking);

    if (voucherCode) {
      await this.voucherRepository.increment(
        { code: voucherCode },
        'usedCount',
        1,
      );
    }

    return await this.bookingRepository.findOneOrFail({
      where: { id: result.id },
      relations: { court: true },
    });
  }
}
