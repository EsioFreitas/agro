import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { HarvestEntity } from './harvest.entity';

@Entity('crops')
export class CropEntity {
  @ApiProperty({
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
    description: 'Unique identifier of the crop.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Wheat',
    description: 'Name of the crop.',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: () => [HarvestEntity],
    description: 'List of harvests associated with this crop.',
    isArray: true,
  })
  @ManyToMany(() => HarvestEntity, (harvest) => harvest.crops)
  harvests: HarvestEntity[];
}
