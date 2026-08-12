import { ActivityEntity } from '../entities/activity.entity';
import { ActivityStatus } from '../../common/constants/common.constant';

export const activitySeedData: Partial<ActivityEntity>[] = [
  {
    title: 'Giải giao hữu nội bộ',
    startDate: new Date('2026-08-05T08:00:00.000Z'),
    endDate: new Date('2026-08-05T18:00:00.000Z'),
    status: ActivityStatus.ACTIVE,
  },
  {
    title: 'Workshop kỹ thuật',
    startDate: new Date('2026-08-12T19:00:00.000Z'),
    endDate: new Date('2026-08-12T21:00:00.000Z'),
    status: ActivityStatus.DRAFT,
  },
  {
    title: 'Giải phong trào cuối tuần',
    startDate: new Date('2026-09-01T07:00:00.000Z'),
    endDate: new Date('2026-09-01T17:00:00.000Z'),
    status: ActivityStatus.INACTIVE,
  },
];
