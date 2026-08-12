import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceEntity } from 'src/databases/entities/device.entity';
import { DeviceService } from '../devices/device-service';
import { DeviceController } from '../devices/device-controller';
import { UserController } from './user-controller';
import { User } from 'src/databases/entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
