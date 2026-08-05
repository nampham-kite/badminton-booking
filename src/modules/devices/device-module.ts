import { Module } from '@nestjs/common';
import { DeviceController } from './device-controller';
import { DeviceService } from './device-service';
import { GetDeviceDto } from './dtos/get-device.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from 'src/databases/entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  providers: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
