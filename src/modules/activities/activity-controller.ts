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
import { ActivityService } from './activity-service';
import { GetActivityDto } from './dtos/get-activity.dto';
import { CreateActivityDto } from './dtos/create-activity.dto';
import { UpdateActivityDto } from './dtos/update-activity.dto';
import { ActivityEntity } from 'src/databases/entities/activity.entity';
import { ListResponseDto } from 'src/common/dtos/list-respone.dto';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async getAllActivities(
    @Query() getActivityDto: GetActivityDto,
  ): Promise<ListResponseDto<ActivityEntity>> {
    return await this.activityService.getAllActivities(getActivityDto);
  }

  @Post()
  async createActivity(@Body() createActivityDto: CreateActivityDto) {
    return await this.activityService.createActivity(createActivityDto);
  }

  @Put(':id')
  async updateActivity(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return await this.activityService.updateActivity(id, updateActivityDto);
  }

  @Delete(':id')
  async deleteActivity(@Param('id', ParseIntPipe) id: number) {
    return await this.activityService.deleteActivity(id);
  }
}
