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
import { VoucherService } from './voucher-service';
import { GetVoucherDto } from './dtos/get-voucher.dto';
import { CreateVoucherDto } from './dtos/create-voucher.dto';
import { UpdateVoucherDto } from './dtos/update-voucher.dto';
import { VoucherEntity } from 'src/databases/entities/voucher.entity';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';

@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Get()
  async getAllVouchers(
    @Query() getVoucherDto: GetVoucherDto,
  ): Promise<ListResponseDto<VoucherEntity>> {
    return await this.voucherService.getAllVouchers(getVoucherDto);
  }

  @Post()
  async createVoucher(@Body() createVoucherDto: CreateVoucherDto) {
    return await this.voucherService.createVoucher(createVoucherDto);
  }

  @Put(':id')
  async updateVoucher(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    return await this.voucherService.updateVoucher(id, updateVoucherDto);
  }

  @Delete(':id')
  async deleteVoucher(@Param('id', ParseIntPipe) id: number) {
    return await this.voucherService.deleteVoucher(id);
  }
}
