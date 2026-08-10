import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from 'src/databases/entities/activity.entity';
import { GetActivityDto } from './dtos/get-activity.dto';
import { CreateActivityDto } from './dtos/create-activity.dto';
import { UpdateActivityDto } from './dtos/update-activity.dto';
import { ActivityNotFoundException } from 'src/common/exceptions/activity.exception';
import { paginate } from 'src/common/pagination';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
  ) {}

  async getAllActivities(
    getActivityDto: GetActivityDto,
  ): Promise<ListResponseDto<ActivityEntity>> {
    const { title, status } = getActivityDto;
    const where: FindOptionsWhere<ActivityEntity> = {};
    if (title) {
      where.title = title;
    }
    if (status) {
      where.status = status;
    }

    return await paginate<ActivityEntity>(
      this.activityRepository,
      getActivityDto,
      where,
      {},
    );
  }

  async createActivity(
    createActivityDto: CreateActivityDto,
  ): Promise<ActivityEntity> {
    const activity = this.activityRepository.create(createActivityDto);
    return await this.activityRepository.save(activity);
  }

  async updateActivity(
    id: number,
    updateActivityDto: UpdateActivityDto,
  ): Promise<ActivityEntity> {
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (!activity) {
      throw new ActivityNotFoundException();
    }
    Object.assign(activity, updateActivityDto);
    return await this.activityRepository.save(activity);
  }

  async deleteActivity(id: number): Promise<ActivityEntity> {
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (!activity) {
      throw new ActivityNotFoundException();
    }
    return await this.activityRepository.remove(activity);
  }
}
