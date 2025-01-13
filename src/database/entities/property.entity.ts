import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { HarvestEntity } from './harvest.entity';
import { ProducerEntity } from './producer.entity';

@Entity('properties')
export class PropertyEntity {
  @ApiProperty({
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
    description: 'Unique identifier of the property.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Green Valley Farm',
    description: 'Name of the property.',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Springfield',
    description: 'City where the property is located.',
  })
  @Column()
  city: string;

  @ApiProperty({
    example: 'California',
    description: 'State where the property is located.',
  })
  @Column()
  state: string;

  @ApiProperty({
    example: 5000.5,
    description: 'Total area of the property in hectares.',
  })
  @Column('decimal', { precision: 10, scale: 2 })
  totalArea: number;

  @ApiProperty({
    example: 3000.5,
    description: 'Farmable area of the property in hectares.',
  })
  @Column('decimal', { precision: 10, scale: 2 })
  farmableArea: number;

  @ApiProperty({
    example: 2000,
    description: 'Vegetation area of the property in hectares.',
  })
  @Column('decimal', { precision: 10, scale: 2 })
  vegetationArea: number;

  @ApiProperty({
    type: () => ProducerEntity,
    description: 'The producer who owns the property.',
  })
  @ManyToOne(() => ProducerEntity, (producer) => producer.properties)
  producer: ProducerEntity;

  @ApiProperty({
    type: () => [HarvestEntity],
    description: 'List of harvests that took place on the property.',
    isArray: true,
  })
  @OneToMany(() => HarvestEntity, (harvest) => harvest.property)
  harvests: HarvestEntity[];
}
