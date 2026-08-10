import { BannerEntity } from '../entities/banner.entity';
import { CatalogStatus } from '../../common/constants/common.constant';

export const bannerSeedData: Partial<BannerEntity>[] = [
  {
    sortOrder: 1,
    title: 'Đặt sân nhanh trong 30 giây',
    image:
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1800&q=80',
    link: '/booking',
    status: CatalogStatus.ACTIVE,
  },
  {
    sortOrder: 2,
    title: 'Ưu đãi giờ vàng cuối tuần',
    image:
      'https://images.unsplash.com/photo-1599394022918-6c2776530abb?auto=format&fit=crop&w=1800&q=80',
    link: '/#offers',
    status: CatalogStatus.ACTIVE,
  },
];
