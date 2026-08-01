import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, IsNull, Repository } from 'typeorm';
import { ListResponseDto } from '../../common/dtos/list-respone.dto';
import { CourtNotFoundException } from '../../common/exceptions/court.exception';
import { paginate } from '../../common/pagination';
import { CourtEntity } from '../../databases/entities/court.entity';
import { TimeSlotEntity } from '../../databases/entities/time-slot.entity';
import { GetCourtDto } from './dtos/get-court.dto';
import { CreateCourtDto, TimeSlotDto } from './dtos/update-court.dto';

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
    if (timeSlots) {
      const timeSlotEntities = timeSlots?.map((timeSlotDto: TimeSlotDto) => {
        const timeSlot = this.timeSlotRepository.create({
          ...timeSlotDto,
          court: createdCourt,
        });
        return timeSlot;
      });
      //Luu time slots vao database
      await this.timeSlotRepository.save(timeSlotEntities);
    }

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
  async getAllCourts(
    getCourtDto: GetCourtDto,
  ): Promise<ListResponseDto<CourtEntity>> {
    const { page, limit, name } = getCourtDto;
    return await paginate<CourtEntity>(
      this.courtRepository,
      { page, limit },
      { deletedAt: IsNull(), ...(name && { name: ILike(`%${name}%`) }) },
      { timeSlots: true },
    );
  }
  async getCourt(id: number): Promise<CourtEntity> {
    const court = await this.courtRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: { timeSlots: true },
    });
    console.log('court', court);
    if (!court) {
      throw new CourtNotFoundException();
    }
    return court;
  }
}
