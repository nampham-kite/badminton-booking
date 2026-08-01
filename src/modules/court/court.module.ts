import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtEntity } from '../../databases/entities/court.entity';
import { TimeSlotEntity } from '../../databases/entities/time-slot.entity';
import { CourtController } from './court.controller';
import { CourtService } from './court.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourtEntity, TimeSlotEntity])],
  providers: [CourtService],
  controllers: [CourtController],
})
export class CourtModule {}
