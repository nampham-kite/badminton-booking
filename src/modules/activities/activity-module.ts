import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from 'src/databases/entities/activity.entity';
import { ActivityController } from './activity-controller';
import { ActivityService } from './activity-service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity])],
  providers: [ActivityService],
  controllers: [ActivityController],
})
export class ActivityModule {}
