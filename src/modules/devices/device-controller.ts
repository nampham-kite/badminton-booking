import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { DeviceService } from './device-service';
import { GetDeviceDto } from './dtos/get-device.dto';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { UpdateDeviceDto } from './dtos/update-device.dto';
import { DeviceEntity } from 'src/databases/entities/device.entity';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}
  @Get()
  async getAllDevices(@Query() getDeviceDto: GetDeviceDto): Promise<ListResponseDto<DeviceEntity>> {
    return await this.deviceService.getAllDevices(getDeviceDto);
  }
  @Post()
  async createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return await this.deviceService.createDevice(createDeviceDto);
  }
  @Put(':id')
  async updateDevice(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return await this.deviceService.updateDevice(id, updateDeviceDto);
  }
  @Delete(':id')
  async deleteDevice(@Param('id', ParseIntPipe) id: number) {
    return await this.deviceService.deleteDevice(id);
  }
}
