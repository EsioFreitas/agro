import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyEntity } from 'src/database/entities/property.entity';
import { PropertyDto } from '../dtos/property.dto';
import { NotFoundError } from 'src/common/base/error.base';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}

  async findAll(): Promise<PropertyEntity[]> {
    return this.propertyRepository.find();
  }

  async findById(id: string): Promise<PropertyEntity> {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundError(`Property with ID ${id} not found`);
    }
    return property;
  }

  async create(propertyDto: PropertyDto): Promise<PropertyEntity> {
    const property = this.propertyRepository.create(propertyDto);
    return this.propertyRepository.save(property);
  }

  async update(id: string, propertyDto: PropertyDto): Promise<PropertyEntity> {
    const property = await this.findById(id);
    return this.propertyRepository.save({ ...property, ...propertyDto });
  }

  async remove(id: string): Promise<void> {
    const property = await this.findById(id);
    await this.propertyRepository.remove(property);
  }
}
