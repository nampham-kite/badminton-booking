import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  CourtStatus,
  CourtSurface,
} from '../../../common/constants/common.constant';

export class CreateCourtDto {
  @ApiProperty({ description: 'The name of the court' })
  @IsNotEmpty()
  @IsString()
  name!: string;
  @ApiProperty({ description: 'The location of the court' })
  @IsNotEmpty()
  @IsString()
  location!: string;

  @ApiProperty({ description: 'The status of the court', enum: CourtStatus })
  @IsNotEmpty()
  @IsEnum(CourtStatus, { message: 'Invalid court status' })
  status!: CourtStatus;
  @ApiProperty({ description: 'The image URL of the court', required: false })
  @IsString()
  @IsNotEmpty()
  imageUrl!: string;
  @ApiProperty({ description: 'The description of the court', required: false })
  @IsNotEmpty()
  @IsString()
  description!: string;
  @ApiProperty({ description: 'The width of the court' })
  @IsNotEmpty()
  @IsNumber()
  width!: number;
  @ApiProperty({ description: 'The height of the court' })
  @IsNotEmpty()
  @IsNumber()
  height!: number;
  @ApiProperty({ description: 'The capacity of people the court can hold' })
  @IsNotEmpty()
  @IsNumber()
  peopleCapacity!: number;
  @ApiProperty({ description: 'The surface of the court' })
  @IsNotEmpty()
  @IsEnum(CourtSurface)
  surface!: CourtSurface;
  @ApiProperty({ description: 'The height of the roof' })
  @IsNotEmpty()
  @IsNumber()
  roofHeight!: number;
  @ApiProperty({ description: 'Whether the court is indoor or outdoor' })
  @IsNotEmpty()
  @IsBoolean()
  isIndoor!: boolean;
  @ApiProperty({ description: 'Whether the court has air conditioning' })
  @IsNotEmpty()
  @IsBoolean()
  hasConditioning!: boolean;
  @ApiProperty({ description: 'Whether the court has fans' })
  @IsNotEmpty()
  @IsBoolean()
  hasFans!: boolean;
  @ApiProperty({ description: 'Whether the court is active' })
  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;
  @ApiProperty({ description: 'Whether the court is under maintenance' })
  @IsNotEmpty()
  @IsBoolean()
  isMaintenance!: boolean;
  @ApiProperty({ description: 'The opening hours of the court' })
  @IsNotEmpty()
  @IsString()
  openingHours!: string;
  @ApiProperty({ description: 'The ending hours of the court' })
  @IsNotEmpty()
  @IsString()
  endingHours!: string;
  @ApiPropertyOptional({ description: 'The reason for maintenance' })
  @IsOptional()
  @IsString()
  reasonForMaintenance?: string;
  @ApiProperty({ description: 'The time slots of the court' })
  @IsNotEmpty()
  @Type(() => TimeSlotDto)
  timeSlots!: TimeSlotDto[];
}

export class TimeSlotDto {
  @ApiProperty({ description: 'The start of the time slot' })
  @IsNotEmpty()
  @IsNumber()
  start!: number;
  @ApiProperty({ description: 'The end of the time slot' })
  @IsNotEmpty()
  @IsNumber()
  end!: number;
  @ApiProperty({ description: 'The price of the time slot' })
  @IsNotEmpty()
  @IsNumber()
  price!: number;
}
