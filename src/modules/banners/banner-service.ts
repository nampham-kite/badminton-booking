import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerEntity } from 'src/databases/entities/banner.entity';
import { GetBannerDto } from './dtos/get-banner.dto';
import { CreateBannerDto } from './dtos/create-banner.dto';
import { UpdateBannerDto } from './dtos/update-banner.dto';
import { BannerNotFoundException } from 'src/common/exceptions/banner.exception';
import { paginate } from 'src/common/pagination';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';
import { PageOptionDto } from 'src/common/dtos/page-option.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepository: Repository<BannerEntity>,
  ) {}

  async getAllBanners(
    getBannerDto: GetBannerDto,
  ): Promise<ListResponseDto<BannerEntity>> {
    const { title, status, sort, sortOrder } = getBannerDto;
    const where: FindOptionsWhere<BannerEntity> = {};
    if (title) {
      where.title = title;
    }
    if (status) {
      where.status = status;
    }

    const options: PageOptionDto = {
      ...getBannerDto,
      sort: sort ?? 'sortOrder',
      sortOrder: sortOrder ?? 'ASC',
    };

    return await paginate<BannerEntity>(
      this.bannerRepository,
      options,
      where,
      {},
    );
  }

  async createBanner(
    createBannerDto: CreateBannerDto,
  ): Promise<BannerEntity> {
    const banner = this.bannerRepository.create(createBannerDto);
    return await this.bannerRepository.save(banner);
  }

  async updateBanner(
    id: number,
    updateBannerDto: UpdateBannerDto,
  ): Promise<BannerEntity> {
    const banner = await this.bannerRepository.findOne({ where: { id } });
    if (!banner) {
      throw new BannerNotFoundException();
    }
    Object.assign(banner, updateBannerDto);
    return await this.bannerRepository.save(banner);
  }

  async deleteBanner(id: number): Promise<BannerEntity> {
    const banner = await this.bannerRepository.findOne({ where: { id } });
    if (!banner) {
      throw new BannerNotFoundException();
    }
    return await this.bannerRepository.remove(banner);
  }
}
