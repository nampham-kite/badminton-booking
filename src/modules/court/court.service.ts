import { InjectRepository } from '@nestjs/typeorm';
import { CourtEntity } from 'src/databases/entities/court.entity';
import { In, Repository } from 'typeorm';
import { CreateCourtDto, TimeSlotDto } from './dtos/update-court.dto';
import { TimeSlotEntity } from 'src/databases/entities/time-slot.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class CourtService {
  constructor(
    @InjectRepository(CourtEntity)
    private readonly courtRepository: Repository<CourtEntity>,
    @InjectRepository(TimeSlotEntity)
    private readonly timeSlotRepository: Repository<TimeSlotEntity>,
  ) {}

  async createCourt(createCourtDto: CreateCourtDto): Promise<CourtEntity> {
    const { timeSlots, ...courtData } = createCourtDto;
    // Tạo court mới từ dữ liệu trong createCourtDto
    const courtCode = this.genarateCoutrCode();
    const dataSave = { ...courtData, courtCode };
    // console.log('dataSave', dataSave);
    const court = this.courtRepository.create(dataSave);
    console.log('court', court);
    //Luu court vao database
    const createdCourt = await this.courtRepository.save(court);
    // Tao time slots cho court moi tao
    const timeSlotEntities = timeSlots.map((timeSlotDto: TimeSlotDto) => {
      const timeSlot = this.timeSlotRepository.create({
        ...timeSlotDto,
        court: createdCourt,
      });
      return timeSlot;
    });
    //Luu time slots vao database
    await this.timeSlotRepository.save(timeSlotEntities);

    return createdCourt;
  }

  genarateCoutrCode(): string {
    return (
      'C' +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0')
    );
  }
  async getAllCourts(): Promise<CourtEntity[]> {
    return await this.courtRepository.find({
      relations: { timeSlots: true },
    });
  }
}
