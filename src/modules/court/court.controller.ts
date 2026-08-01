import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CourtService } from './court.service';
import { GetCourtDto } from './dtos/get-court.dto';
import { CreateCourtDto } from './dtos/update-court.dto';
@Controller('court')
export class CourtController {
  constructor(private readonly courtService: CourtService) {}
  @Post()
  async createCourt(@Body() createCourtDto: CreateCourtDto) {
    return await this.courtService.createCourt(createCourtDto);
  }
  @Get()
  async getAllCourts(@Query() getCourtDto: GetCourtDto) {
    return await this.courtService.getAllCourts(getCourtDto);
  }
  @Get(':id')
  async getCourt(@Param('id', ParseIntPipe) id: number) {
    return await this.courtService.getCourt(id);
  }
}
