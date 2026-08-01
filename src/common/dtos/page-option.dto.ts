import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PageOptionDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page?: number;
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit?: number;
  @IsOptional()
  @IsString()
  sort?: string;
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';
}
