import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VoucherEntity } from 'src/databases/entities/voucher.entity';
import { GetVoucherDto } from './dtos/get-voucher.dto';
import { CreateVoucherDto } from './dtos/create-voucher.dto';
import { UpdateVoucherDto } from './dtos/update-voucher.dto';
import {
  VoucherCodeAlreadyExistsException,
  VoucherNotFoundException,
} from 'src/common/exceptions/voucher.exception';
import { paginate } from 'src/common/pagination';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(VoucherEntity)
    private readonly voucherRepository: Repository<VoucherEntity>,
  ) {}

  async getAllVouchers(
    getVoucherDto: GetVoucherDto,
  ): Promise<ListResponseDto<VoucherEntity>> {
    const { code, type, status } = getVoucherDto;
    const where: FindOptionsWhere<VoucherEntity> = {};
    if (code) {
      where.code = code;
    }
    if (type) {
      where.type = type;
    }
    if (status) {
      where.status = status;
    }
    return await paginate<VoucherEntity>(
      this.voucherRepository,
      getVoucherDto,
      where,
      {},
    );
  }

  async createVoucher(
    createVoucherDto: CreateVoucherDto,
  ): Promise<VoucherEntity> {
    const code = createVoucherDto.code.trim().toUpperCase();
    const existing = await this.voucherRepository.findOne({ where: { code } });
    if (existing) {
      throw new VoucherCodeAlreadyExistsException();
    }

    const voucher = this.voucherRepository.create({
      ...createVoucherDto,
      code,
      usedCount: createVoucherDto.usedCount ?? 0,
    });
    return await this.voucherRepository.save(voucher);
  }

  async updateVoucher(
    id: number,
    updateVoucherDto: UpdateVoucherDto,
  ): Promise<VoucherEntity> {
    const voucher = await this.voucherRepository.findOne({ where: { id } });
    if (!voucher) {
      throw new VoucherNotFoundException();
    }

    if (updateVoucherDto.code) {
      const code = updateVoucherDto.code.trim().toUpperCase();
      if (code !== voucher.code) {
        const existing = await this.voucherRepository.findOne({
          where: { code },
        });
        if (existing) {
          throw new VoucherCodeAlreadyExistsException();
        }
      }
      updateVoucherDto.code = code;
    }

    Object.assign(voucher, updateVoucherDto);
    return await this.voucherRepository.save(voucher);
  }

  async deleteVoucher(id: number): Promise<VoucherEntity> {
    const voucher = await this.voucherRepository.findOne({ where: { id } });
    if (!voucher) {
      throw new VoucherNotFoundException();
    }
    return await this.voucherRepository.remove(voucher);
  }
}
