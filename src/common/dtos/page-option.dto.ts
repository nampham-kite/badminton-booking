import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PageOptionDto {
  @IsOptional()
  @IsNumber()
  page?: number;
  @IsOptional()
  @IsNumber()
  limit?: number;
  @IsOptional()
  @IsString()
  sort?: string;
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';
}
