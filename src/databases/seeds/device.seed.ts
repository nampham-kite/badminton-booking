import { DeviceEntity } from '../entities/device.entity';

export const deviceSeedData: Partial<DeviceEntity>[] = [
  {
    sku: 'RKT-YONEX-001',
    name: 'Vợt Yonex Astrox 99',
    category: 'Vợt',
    stock: 15,
    price: 3500000,
    status: 'Active',
  },
  {
    sku: 'RKT-LI-NING-002',
    name: 'Vợt Li-Ning Aeronaut 9000',
    category: 'Vợt',
    stock: 10,
    price: 2800000,
    status: 'Active',
  },
  {
    sku: 'SHOE-YONEX-001',
    name: 'Giày Yonex Power Cushion',
    category: 'Giày',
    stock: 25,
    price: 1800000,
    status: 'Active',
  },
  {
    sku: 'SHUTTLE-AS-001',
    name: 'Quả cầu AS-50',
    category: 'Cầu',
    stock: 100,
    price: 180000,
    status: 'Active',
  },
  {
    sku: 'GRIP-001',
    name: 'Quấn cán vợt',
    category: 'Phụ kiện',
    stock: 80,
    price: 35000,
    status: 'Active',
  },
];
