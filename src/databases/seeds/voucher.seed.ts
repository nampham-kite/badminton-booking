import { VoucherEntity } from '../entities/voucher.entity';
import {
  VoucherStatus,
  VoucherType,
} from '../../common/constants/common.constant';

export const voucherSeedData: Partial<VoucherEntity>[] = [
  {
    code: 'WELCOME10',
    type: VoucherType.PERCENT,
    value: 10,
    minOrderAmount: 100000,
    usedCount: 23,
    maxUsage: 100,
    startDate: new Date('2026-07-01'),
    endDate: new Date('2026-08-31'),
    status: VoucherStatus.ACTIVE,
  },
  {
    code: 'FIXED50K',
    type: VoucherType.FIXED,
    value: 50000,
    minOrderAmount: 200000,
    usedCount: 50,
    maxUsage: 50,
    startDate: new Date('2026-06-01'),
    endDate: new Date('2026-07-15'),
    status: VoucherStatus.INACTIVE,
  },
  {
    code: 'DRAFT20',
    type: VoucherType.PERCENT,
    value: 20,
    minOrderAmount: 0,
    usedCount: 0,
    maxUsage: 20,
    startDate: new Date('2026-08-01'),
    endDate: new Date('2026-08-31'),
    status: VoucherStatus.DRAFT,
  },
  {
    code: 'WEEKEND15',
    type: VoucherType.PERCENT,
    value: 15,
    minOrderAmount: 150000,
    usedCount: 5,
    maxUsage: 200,
    startDate: new Date('2026-08-01'),
    endDate: new Date('2026-12-31'),
    status: VoucherStatus.ACTIVE,
  },
];
