import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherEntity } from 'src/databases/entities/voucher.entity';
import { VoucherController } from './voucher-controller';
import { VoucherService } from './voucher-service';

@Module({
  imports: [TypeOrmModule.forFeature([VoucherEntity])],
  providers: [VoucherService],
  controllers: [VoucherController],
})
export class VoucherModule {}
