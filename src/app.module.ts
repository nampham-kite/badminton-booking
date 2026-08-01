import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  addTransactionalDataSource,
  getDataSourceByName,
} from 'typeorm-transactional';
import { CourtModule } from './modules/court/court.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CourtModule,

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
})
export class AppModule {}
