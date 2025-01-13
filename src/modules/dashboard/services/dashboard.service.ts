import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyEntity } from 'src/database/entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {}

  async getAreaByState() {
    const result = await this.propertyRepository
      .createQueryBuilder('property')
      .select('property.state', 'state')
      .addSelect('SUM(property.totalArea)', 'totalArea')
      .groupBy('property.state')
      .getRawMany();

    return result;
  }

  async getAreaByCrop() {
    const result = await this.propertyRepository
      .createQueryBuilder('property')
      .leftJoin('property.harvests', 'harvest')
      .leftJoin('harvest.crops', 'harvestCrop')
      .leftJoin('harvestCrop.crop', 'crop')
      .select('crop.name', 'crop')
      .addSelect('SUM(harvestCrop.area)', 'totalArea')
      .where('crop.name IS NOT NULL')
      .groupBy('crop.name')
      .getRawMany();

    return result;
  }

  async getVegetationVsTotalArea() {
    const result = await this.propertyRepository
      .createQueryBuilder('property')
      .select('SUM(property.vegetationArea)', 'vegetationArea')
      .addSelect('SUM(property.totalArea)', 'totalFarmedArea')
      .addSelect('SUM(property.farmableArea)', 'farmableArea')
      .getRawOne();

    return result;
  }
}
