import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceEntity } from 'src/databases/entities/device.entity';
import { GetDeviceDto } from './dtos/get-device.dto';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { DeviceNotFoundException } from 'src/common/exceptions/device.exception';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
  ) {}
  async getAllDevices(getDeviceDto: GetDeviceDto): Promise<DeviceEntity[]> {
    const { name } = getDeviceDto;
    return await this.deviceRepository.find({
      where: { name },
    });
  }
  async createDevice(createDeviceDto: CreateDeviceDto): Promise<DeviceEntity> {
    try {
      const device = this.deviceRepository.create(createDeviceDto);
      return await this.deviceRepository.save(device);
    } catch (error) {
      console.log('error', (error as Error).message);
      throw new InternalServerErrorException();
    }
  }
  async updateDevice(
    id: number,
    updateDeviceDto: Partial<CreateDeviceDto>,
  ): Promise<DeviceEntity> {
    try {
      const device = await this.deviceRepository.findOne({ where: { id } });
      if (!device) {
        throw new DeviceNotFoundException();
      }
      Object.assign(device, updateDeviceDto);
      return await this.deviceRepository.save(device);
    } catch (error) {
      console.log('error', (error as Error).message);
      throw new InternalServerErrorException();
    }
  }
  async deleteDevice(id: number): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findOne({ where: { id } });
    if (!device) {
      throw new DeviceNotFoundException();
    }
    return await this.deviceRepository.remove(device);
  }
}
