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
import { BannerService } from './banner-service';
import { GetBannerDto } from './dtos/get-banner.dto';
import { CreateBannerDto } from './dtos/create-banner.dto';
import { UpdateBannerDto } from './dtos/update-banner.dto';
import { BannerEntity } from 'src/databases/entities/banner.entity';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';
import { ApiBearerAuth } from 'node_modules/@nestjs/swagger/dist/decorators/api-bearer.decorator';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  @ApiBearerAuth()
  async getAllBanners(
    @Query() getBannerDto: GetBannerDto,
  ): Promise<ListResponseDto<BannerEntity>> {
    return await this.bannerService.getAllBanners(getBannerDto);
  }

  @Post()
  @ApiBearerAuth()
  async createBanner(@Body() createBannerDto: CreateBannerDto) {
    return await this.bannerService.createBanner(createBannerDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  async updateBanner(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    return await this.bannerService.updateBanner(id, updateBannerDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async deleteBanner(@Param('id', ParseIntPipe) id: number) {
    return await this.bannerService.deleteBanner(id);
  }
}
