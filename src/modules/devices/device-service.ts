import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceEntity } from 'src/databases/entities/device.entity';
import { GetDeviceDto } from './dtos/get-device.dto';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { DeviceNotFoundException, DeviceSkuAlreadyExistsException } from 'src/common/exceptions/device.exception';
import { paginate } from 'src/common/pagination';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
  ) {}
  async getAllDevices(getDeviceDto: GetDeviceDto): Promise<ListResponseDto<DeviceEntity>> {
    const { name } = getDeviceDto;
    const where: FindOptionsWhere<DeviceEntity> = {};
    if (name) {
      where.name = name;
    }
    return await paginate<DeviceEntity>(
      this.deviceRepository,
      getDeviceDto,
      where,
      {},
    );
  }
  async createDevice(createDeviceDto: CreateDeviceDto): Promise<DeviceEntity> {
 
      const {sku}=createDeviceDto;
      const checkDevice = await this.deviceRepository.findOne({ where: { sku } });
     
      if (checkDevice) {
        throw new DeviceSkuAlreadyExistsException();
      }

      const device = this.deviceRepository.create(createDeviceDto);
      return await this.deviceRepository.save(device);
   
  }
  async updateDevice(
    id: number,
    updateDeviceDto: Partial<CreateDeviceDto>,
  ): Promise<DeviceEntity> {
      const device = await this.deviceRepository.findOne({ where: { id } });
      if (!device) {
        throw new DeviceNotFoundException();
      }
      Object.assign(device, updateDeviceDto);
      return await this.deviceRepository.save(device);
  }
  async deleteDevice(id: number): Promise<DeviceEntity> {
    const device = await this.deviceRepository.findOne({ where: { id } });
    if (!device) {
      throw new DeviceNotFoundException();
    }
    return await this.deviceRepository.remove(device);
  }
}
