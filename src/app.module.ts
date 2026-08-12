import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  addTransactionalDataSource,
  getDataSourceByName,
} from 'typeorm-transactional';
import { CourtModule } from './modules/court/court.module';
import { DeviceModule } from './modules/devices/device-module';
import { UserModule } from './modules/users/user-module';
import { FoodModule } from './modules/foods/food-module';
import { VoucherModule } from './modules/vouchers/voucher-module';
import { BannerModule } from './modules/banners/banner-module';
import { ActivityModule } from './modules/activities/activity-module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './modules/users/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CourtModule,
    DeviceModule,
    UserModule,
    FoodModule,
    VoucherModule,
    BannerModule,
    ActivityModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [__dirname + '/databases/entities/*.entity{.ts,.js}'],
      }),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        const existing = getDataSourceByName('default');
        if (existing) {
          return existing;
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
