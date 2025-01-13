import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { PropertyEntity } from './property.entity';

@Entity('producers')
export class ProducerEntity {
  @ApiProperty({
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
    description: 'Unique identifier of the producer.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the producer.',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: '12345678901',
    description: 'Document (e.g., CPF or equivalent) of the producer.',
  })
  @Column()
  document: string;

  @ApiProperty({
    type: () => [PropertyEntity],
    description: 'List of properties owned by the producer.',
    isArray: true,
  })
  @OneToMany(() => PropertyEntity, (property) => property.producer)
  properties: PropertyEntity[];
}
