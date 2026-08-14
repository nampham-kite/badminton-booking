import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ description: 'ID of the court being booked', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  courtId!: number;
  @ApiProperty({
    description: 'Date of the booking',
    example: '2023-08-15',
  })
  @IsNotEmpty()
  @IsString()
  orderDate!: string;
  @ApiProperty({ description: 'Start time of the booking', example: 9 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  start!: number;
  @ApiProperty({ description: 'End time of the booking', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  end!: number;
  @ApiProperty({ description: 'Total price of the booking', example: 100 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  totalPrice!: number;
  @ApiProperty({
    description: 'Name of the person making the booking',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name!: string;
  @ApiProperty({
    description: 'Phone number of the person making the booking',
    example: '+1234567890',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;
  @ApiPropertyOptional({
    description: 'Additional notes for the booking',
    example: 'Please arrive 10 minutes early.',
  })
  @IsString()
  @IsOptional()
  note!: string;
  @ApiPropertyOptional({
    description: 'Voucher code applied to the booking',
    example: 'SUMMER2023',
  })
  @IsString()
  @IsOptional()
  voucherCode?: string;
}
