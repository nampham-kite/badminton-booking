import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CourtService } from './court.service';
import { CreateCourtDto } from './dtos/create-court.dto';
import { GetCourtDto } from './dtos/get-court.dto';
import { UpdateCourtDto } from './dtos/update-court.dto';
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
  @Put(':id')
  async updateCourt(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourtDto: UpdateCourtDto,
  ) {
    return await this.courtService.updateCourt(id, updateCourtDto);
  }
  @Delete(':id')
  async deleteCourt(@Param('id', ParseIntPipe) id: number) {
    return await this.courtService.deleteCourt(id);
  }
}
