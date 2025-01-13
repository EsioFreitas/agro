import { DataSource, DataSourceOptions } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import { CropEntity } from './entities/crop.entity';
import { HarvestCropEntity } from './entities/harvest-crop.entity';
import { HarvestEntity } from './entities/harvest.entity';
import { ProducerEntity } from './entities/producer.entity';
import { PropertyEntity } from './entities/property.entity';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  schema: 'public',
  synchronize: false,
  entities: [
    CropEntity,
    HarvestCropEntity,
    HarvestEntity,
    ProducerEntity,
    PropertyEntity,
  ],
  migrations: [__dirname + '/migrations/*.ts'],
};

export default new DataSource(dataSourceOptions);
