import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, IsNull, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { ListResponseDto } from '../../common/dtos/list-respone.dto';
import { CourtNotFoundException } from '../../common/exceptions/court.exception';
import { paginate } from '../../common/pagination';
import { CourtEntity } from '../../databases/entities/court.entity';
import { TimeSlotEntity } from '../../databases/entities/time-slot.entity';
import { CreateCourtDto, TimeSlotDto } from './dtos/create-court.dto';
import { GetCourtDto } from './dtos/get-court.dto';
import { UpdateCourtDto } from './dtos/update-court.dto';
@Injectable()
export class CourtService {
  constructor(
    @InjectRepository(CourtEntity)
    private readonly courtRepository: Repository<CourtEntity>,
    @InjectRepository(TimeSlotEntity)
    private readonly timeSlotRepository: Repository<TimeSlotEntity>,
  ) {}

  @Transactional()
  async createCourt(createCourtDto: CreateCourtDto): Promise<CourtEntity> {
    console.log('createCourtDto', createCourtDto);
    try {
      const { timeSlots, ...courtData } = createCourtDto;
      // Tạo court mới từ dữ liệu trong createCourtDto
      const courtCode = this.genarateCoutrCode();
      const dataSave = { ...courtData, courtCode };
      const court = this.courtRepository.create(dataSave);
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
    } catch (error) {
      console.log('error', (error as Error).message);
      throw new InternalServerErrorException();
    }
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
    const { name, ...paginationDto } = getCourtDto;
    return await paginate<CourtEntity>(
      this.courtRepository,
      paginationDto,
      { deletedAt: IsNull(), ...(name && { name: ILike(`%${name}%`) }) },
      { timeSlots: true },
    );
  }

  async getCourt(id: number): Promise<CourtEntity> {
    const court = await this.courtRepository
      .createQueryBuilder('court')
      .leftJoinAndSelect(
        'court.timeSlots',
        'slot',
        'slot.deletedAt IS NULL',
      )
      .where('court.id = :id', { id })
      .andWhere('court.deletedAt IS NULL')
      .orderBy('slot.start', 'ASC')
      .getOne();
    if (!court) {
      throw new CourtNotFoundException();
    }
    court.timeSlots = (court.timeSlots || []).map((slot) => {
      const { court: _court, ...rest } = slot as TimeSlotEntity & {
        court?: CourtEntity;
      };
      return rest as TimeSlotEntity;
    });
    return court;
  }

  @Transactional()
  async updateCourt(
    id: number,
    updateCourtDto: UpdateCourtDto,
  ): Promise<CourtEntity> {
    const { timeSlots, ...courtData } = updateCourtDto;
    const court = await this.courtRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!court) {
      throw new CourtNotFoundException();
    }
    //remove old time slots hard delete
    await this.timeSlotRepository.delete({ court: { id } });

    console.log('timeSlots', timeSlots);
    if (timeSlots) {
      const timeSlotEntities = timeSlots?.map((timeSlotDto: TimeSlotDto) => {
        const timeSlot = this.timeSlotRepository.create({
          ...timeSlotDto,
          court: court,
        });
        return timeSlot;
      });
      await this.timeSlotRepository.save(timeSlotEntities);
    }
    const updatedCourt = await this.courtRepository.save({
      ...court,
      ...courtData,
    });
    return updatedCourt;
  }

  @Transactional()
  async deleteCourt(id: number): Promise<void> {
    const court = await this.courtRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!court) {
      throw new CourtNotFoundException();
    }
    await this.courtRepository.softDelete(id);
    await this.timeSlotRepository.softDelete({ court: { id } });
  }
}
