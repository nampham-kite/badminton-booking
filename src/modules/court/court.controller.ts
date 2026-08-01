import { Body, Controller, Get, Post } from '@nestjs/common';
import { CourtService } from './court.service';
import { CreateCourtDto } from './dtos/update-court.dto';
@Controller('court')
export class CourtController {
  constructor(private readonly courtService: CourtService) {}
  @Post()
  async createCourt(@Body() createCourtDto: CreateCourtDto) {
    return await this.courtService.createCourt(createCourtDto);
  }
  @Get()
  async getAllCourts() {
    return await this.courtService.getAllCourts();
  }
}
