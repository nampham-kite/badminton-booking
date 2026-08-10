import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from '../../app.module';
import { CourtEntity } from '../entities/court.entity';
import { DeviceEntity } from '../entities/device.entity';
import { FoodEntity } from '../entities/food.entity';
import { ActivityEntity } from '../entities/activity.entity';
import { BannerEntity } from '../entities/banner.entity';
import { TimeSlotEntity } from '../entities/time-slot.entity';
import { VoucherEntity } from '../entities/voucher.entity';
import { activitySeedData } from './activity.seed';
import { bannerSeedData } from './banner.seed';
import { courtSeedData } from './court.seed';
import { deviceSeedData } from './device.seed';
import { foodSeedData } from './food.seed';
import { voucherSeedData } from './voucher.seed';

async function seedFoods(foodRepository: Repository<FoodEntity>) {
  let created = 0;
  for (const item of foodSeedData) {
    const existing = await foodRepository.findOne({
      where: { name: item.name! },
    });
    if (existing) continue;
    await foodRepository.save(foodRepository.create(item));
    created += 1;
  }
  console.log(`Foods: seeded ${created}, skipped ${foodSeedData.length - created}`);
}

async function seedDevices(deviceRepository: Repository<DeviceEntity>) {
  let created = 0;
  for (const item of deviceSeedData) {
    const existing = await deviceRepository.findOne({
      where: { sku: item.sku! },
    });
    if (existing) continue;
    await deviceRepository.save(deviceRepository.create(item));
    created += 1;
  }
  console.log(
    `Devices: seeded ${created}, skipped ${deviceSeedData.length - created}`,
  );
}

async function seedVouchers(voucherRepository: Repository<VoucherEntity>) {
  let created = 0;
  for (const item of voucherSeedData) {
    const existing = await voucherRepository.findOne({
      where: { code: item.code! },
    });
    if (existing) continue;
    await voucherRepository.save(voucherRepository.create(item));
    created += 1;
  }
  console.log(
    `Vouchers: seeded ${created}, skipped ${voucherSeedData.length - created}`,
  );
}

async function seedBanners(bannerRepository: Repository<BannerEntity>) {
  let created = 0;
  for (const item of bannerSeedData) {
    const existing = await bannerRepository.findOne({
      where: { title: item.title! },
    });
    if (existing) continue;
    await bannerRepository.save(bannerRepository.create(item));
    created += 1;
  }
  console.log(
    `Banners: seeded ${created}, skipped ${bannerSeedData.length - created}`,
  );
}

async function seedActivities(activityRepository: Repository<ActivityEntity>) {
  let created = 0;
  for (const item of activitySeedData) {
    const existing = await activityRepository.findOne({
      where: { title: item.title! },
    });
    if (existing) continue;
    await activityRepository.save(activityRepository.create(item));
    created += 1;
  }
  console.log(
    `Activities: seeded ${created}, skipped ${activitySeedData.length - created}`,
  );
}

async function seedCourts(
  courtRepository: Repository<CourtEntity>,
  timeSlotRepository: Repository<TimeSlotEntity>,
) {
  let created = 0;
  for (const item of courtSeedData) {
    const existing = await courtRepository.findOne({
      where: { courtCode: item.courtCode! },
    });
    if (existing) continue;

    const { timeSlots, ...courtData } = item;
    const court = await courtRepository.save(
      courtRepository.create(courtData),
    );
    const timeSlotEntities = timeSlots.map((slot) =>
      timeSlotRepository.create({ ...slot, court }),
    );
    await timeSlotRepository.save(timeSlotEntities);
    created += 1;
  }
  console.log(
    `Courts: seeded ${created}, skipped ${courtSeedData.length - created}`,
  );
}

async function run() {
  initializeTransactionalContext();
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    const foodRepository = app.get<Repository<FoodEntity>>(
      getRepositoryToken(FoodEntity),
    );
    const deviceRepository = app.get<Repository<DeviceEntity>>(
      getRepositoryToken(DeviceEntity),
    );
    const voucherRepository = app.get<Repository<VoucherEntity>>(
      getRepositoryToken(VoucherEntity),
    );
    const activityRepository = app.get<Repository<ActivityEntity>>(
      getRepositoryToken(ActivityEntity),
    );
    const bannerRepository = app.get<Repository<BannerEntity>>(
      getRepositoryToken(BannerEntity),
    );
    const courtRepository = app.get<Repository<CourtEntity>>(
      getRepositoryToken(CourtEntity),
    );
    const timeSlotRepository = app.get<Repository<TimeSlotEntity>>(
      getRepositoryToken(TimeSlotEntity),
    );

    console.log('Seeding database...');
    await seedFoods(foodRepository);
    await seedDevices(deviceRepository);
    await seedVouchers(voucherRepository);
    await seedActivities(activityRepository);
    await seedBanners(bannerRepository);
    await seedCourts(courtRepository, timeSlotRepository);
    console.log('Seed completed.');
  } finally {
    await app.close();
  }
}

run().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
