import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtController } from './court.controller';
import { CourtService } from './court.service';
import { CourtEntity } from 'src/databases/entities/court.entity';
import { TimeSlotEntity } from 'src/databases/entities/time-slot.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([CourtEntity, TimeSlotEntity])],
  providers: [CourtService],
  controllers: [CourtController],
})
export class CourtModule {}
