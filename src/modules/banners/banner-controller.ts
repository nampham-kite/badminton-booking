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

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async getAllBanners(
    @Query() getBannerDto: GetBannerDto,
  ): Promise<ListResponseDto<BannerEntity>> {
    return await this.bannerService.getAllBanners(getBannerDto);
  }

  @Post()
  async createBanner(@Body() createBannerDto: CreateBannerDto) {
    return await this.bannerService.createBanner(createBannerDto);
  }

  @Put(':id')
  async updateBanner(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    return await this.bannerService.updateBanner(id, updateBannerDto);
  }

  @Delete(':id')
  async deleteBanner(@Param('id', ParseIntPipe) id: number) {
    return await this.bannerService.deleteBanner(id);
  }
}
