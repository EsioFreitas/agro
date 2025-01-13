import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { HarvestCropEntity } from './harvest-crop.entity';
import { PropertyEntity } from './property.entity';

@Entity('harvests')
export class HarvestEntity {
  @ApiProperty({
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
    description: 'Unique identifier of the harvest.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Spring Wheat Harvest',
    description: 'Name of the harvest.',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 2025,
    description: 'Year of the harvest.',
  })
  @Column()
  year: number;

  @ApiProperty({
    type: () => PropertyEntity,
    description: 'The property where the harvest took place.',
  })
  @ManyToOne(() => PropertyEntity, (property) => property.harvests)
  property: PropertyEntity;

  @Column({ name: 'propertyId', nullable: false })
  propertyId: string;

  @ApiProperty({
    type: () => [HarvestCropEntity],
    description: 'List of crops associated with the harvest.',
    isArray: true,
  })
  @OneToMany(() => HarvestCropEntity, (harvestCrop) => harvestCrop.harvest)
  crops: HarvestCropEntity[];
}
