import { ApiOAuth2, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { CourtStatus } from 'src/common/constants/common.constant';

export class CreateCourtDto {
  @ApiPropertyOptional({ description: 'The name of the court' })
  @IsOptional()
  @IsString()
  name!: string;
  @ApiPropertyOptional({ description: 'The location of the court' })
  @IsOptional()
  @IsString()
  location!: string;

  @ApiPropertyOptional({
    description: 'The status of the court',
    enum: CourtStatus,
  })
  @IsOptional()
  @IsEnum(CourtStatus, { message: 'Invalid court status' })
  status!: CourtStatus;
  @ApiPropertyOptional({
    description: 'The image URL of the court',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl!: string;
  @ApiPropertyOptional({
    description: 'The description of the court',
    required: false,
  })
  @IsOptional()
  @IsString()
  description!: string;
  @ApiPropertyOptional({ description: 'The width of the court' })
  @IsOptional()
  @IsNumber()
  width!: number;
  @ApiPropertyOptional({ description: 'The height of the court' })
  @IsOptional()
  @IsNumber()
  height!: number;
  @ApiPropertyOptional({
    description: 'The capacity of people the court can hold',
  })
  @IsOptional()
  @IsNumber()
  peopleCapacity!: number;
  @ApiPropertyOptional({ description: 'The type of the court' })
  @IsOptional()
  @IsString()
  courtType!: string;
  @ApiPropertyOptional({ description: 'The height of the roof' })
  @IsOptional()
  @IsNumber()
  roofHeight!: number;
  @ApiPropertyOptional({
    description: 'Whether the court is indoor or outdoor',
  })
  @IsOptional()
  @IsBoolean()
  isIndoor!: boolean;
  @ApiPropertyOptional({
    description: 'Whether the court has air conditioning',
  })
  @IsOptional()
  @IsBoolean()
  hasConditioning!: boolean;
  @ApiPropertyOptional({ description: 'Whether the court has fans' })
  @IsOptional()
  @IsBoolean()
  hasFans!: boolean;
  @ApiPropertyOptional({ description: 'Whether the court is active' })
  @IsOptional()
  @IsBoolean()
  isActive!: boolean;
  @ApiPropertyOptional({
    description: 'Whether the court is under maintenance',
  })
  @IsOptional()
  @IsBoolean()
  isMaintenance!: boolean;
  @ApiPropertyOptional({ description: 'The opening hours of the court' })
  @IsOptional()
  @IsString()
  openingHours!: string;
  @ApiPropertyOptional({ description: 'The ending hours of the court' })
  @IsOptional()
  @IsString()
  endingHours!: string;
  @ApiPropertyOptional({ description: 'The reason for maintenance' })
  @IsOptional()
  @IsString()
  reasonForMaintenance!: string;
  @ApiPropertyOptional({ description: 'The time slots of the court' })
  @IsOptional()
  @Type(() => TimeSlotDto)
  timeSlots!: TimeSlotDto[];
}
export class TimeSlotDto {
  @ApiProperty({ description: 'The start time of the time slot' })
  @IsNotEmpty()
  @IsString()
  startTime!: number;
  @ApiProperty({ description: 'The end time of the time slot' })
  @IsNotEmpty()
  @IsString()
  endTime!: number;
  @ApiProperty({ description: 'The price of the time slot' })
  @IsNotEmpty()
  @IsString()
  price!: number;
}
