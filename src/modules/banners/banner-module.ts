import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerEntity } from 'src/databases/entities/banner.entity';
import { BannerController } from './banner-controller';
import { BannerService } from './banner-service';

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity])],
  providers: [BannerService],
  controllers: [BannerController],
})
export class BannerModule {}
