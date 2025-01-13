import { CropController } from './controllers/crop.controller';
import { CropEntity } from 'src/database/entities/crop.entity';
import { CropService } from './services/crop.service';
import { HarvestController } from './controllers/harvest.controller';
import { HarvestCropEntity } from 'src/database/entities/harvest-crop.entity';
import { HarvestEntity } from 'src/database/entities/harvest.entity';
import { HarvestService } from './services/harvest.service';
import { Module } from '@nestjs/common';
import { PropertyController } from './controllers/property.controller';
import { PropertyEntity } from 'src/database/entities/property.entity';
import { PropertyService } from './services/property.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PropertyEntity,
      CropEntity,
      HarvestEntity,
      HarvestCropEntity,
    ]),
  ],
  controllers: [PropertyController, CropController, HarvestController],
  providers: [PropertyService, CropService, HarvestService],
})
export class PropertyModule {}
