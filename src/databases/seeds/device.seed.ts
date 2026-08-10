import { DeviceEntity } from '../entities/device.entity';
import {
  CatalogStatus,
  DeviceCategory,
} from '../../common/constants/common.constant';

export const deviceSeedData: Partial<DeviceEntity>[] = [
  {
    sku: 'RKT-YONEX-001',
    name: 'Vợt Yonex Astrox 99',
    category: DeviceCategory.RACKET,
    stock: 15,
    price: 3500000,
    status: CatalogStatus.ACTIVE,
  },
  {
    sku: 'RKT-LI-NING-002',
    name: 'Vợt Li-Ning Aeronaut 9000',
    category: DeviceCategory.RACKET,
    stock: 10,
    price: 2800000,
    status: CatalogStatus.ACTIVE,
  },
  {
    sku: 'SHOE-YONEX-001',
    name: 'Giày Yonex Power Cushion',
    category: DeviceCategory.SHOES,
    stock: 25,
    price: 1800000,
    status: CatalogStatus.ACTIVE,
  },
  {
    sku: 'SHUTTLE-AS-001',
    name: 'Quả cầu AS-50',
    category: DeviceCategory.SHUTTLECOCK,
    stock: 100,
    price: 180000,
    status: CatalogStatus.ACTIVE,
  },
  {
    sku: 'GRIP-001',
    name: 'Quấn cán vợt',
    category: DeviceCategory.ACCESSORY,
    stock: 80,
    price: 35000,
    status: CatalogStatus.ACTIVE,
  },
];
