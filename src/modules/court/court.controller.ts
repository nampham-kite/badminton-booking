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
import { ApiBearerAuth } from 'node_modules/@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { isPublic } from 'src/decorators/is-public.decorator';
@Controller('court')
export class CourtController {
  constructor(private readonly courtService: CourtService) {}
  @ApiBearerAuth()
  @Post()
  async createCourt(@Body() createCourtDto: CreateCourtDto) {
    return await this.courtService.createCourt(createCourtDto);
  }
  @isPublic()
  @Get()
  async getAllCourts(@Query() getCourtDto: GetCourtDto) {
    return await this.courtService.getAllCourts(getCourtDto);
  }
  @ApiBearerAuth()
  @Get(':id')
  async getCourt(@Param('id', ParseIntPipe) id: number) {
    return await this.courtService.getCourt(id);
  }
  @ApiBearerAuth()
  @Put(':id')
  async updateCourt(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourtDto: UpdateCourtDto,
  ) {
    return await this.courtService.updateCourt(id, updateCourtDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  async deleteCourt(@Param('id', ParseIntPipe) id: number) {
    return await this.courtService.deleteCourt(id);
  }
}
