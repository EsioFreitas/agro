import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { CropEntity } from './crop.entity';
import { HarvestEntity } from './harvest.entity';

@Entity('harvest_crops')
export class HarvestCropEntity {
  @ApiProperty({
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
    description: 'Unique identifier of the harvest-crop relation.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: () => HarvestEntity,
    description: 'The harvest associated with this relation.',
  })
  @ManyToOne(() => HarvestEntity, (harvest) => harvest.crops)
  harvest: HarvestEntity;

  @ApiProperty({
    type: () => CropEntity,
    description: 'The crop associated with this relation.',
  })
  @ManyToOne(() => CropEntity, (crop) => crop.harvests)
  crop: CropEntity;

  @ApiProperty({
    example: 120.5,
    description: 'Area in hectares associated with this harvest-crop relation.',
  })
  @Column('decimal', { precision: 5, scale: 2 })
  area: number;
}
