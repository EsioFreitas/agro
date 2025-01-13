import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HarvestEntity } from 'src/database/entities/harvest.entity';
import { HarvestDto } from '../dtos/harvest.dto';
import { NotFoundError } from 'src/common/base/error.base';
import { PropertyEntity } from 'src/database/entities/property.entity';
import { CreateHarvestCropDto } from '../dtos/harvest-crop.dto';
import { HarvestCropEntity } from 'src/database/entities/harvest-crop.entity';
import { CropEntity } from 'src/database/entities/crop.entity';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(HarvestEntity)
    private readonly harvestRepository: Repository<HarvestEntity>,
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
    @InjectRepository(CropEntity)
    private readonly cropRepository: Repository<CropEntity>,
    @InjectRepository(HarvestCropEntity)
    private readonly harvestCropRepository: Repository<HarvestCropEntity>,
  ) {}

  async findAll(): Promise<HarvestEntity[]> {
    return await this.harvestRepository.find();
  }

  async findById(id: string): Promise<HarvestEntity> {
    const harvest = await this.harvestRepository.findOne({ where: { id } });
    if (!harvest) {
      throw new NotFoundError(`Harvest with ID ${id} not found`);
    }
    return harvest;
  }

  async create(harvestDto: HarvestDto): Promise<HarvestEntity> {
    const property = await this.propertyRepository.findOne({
      where: { id: harvestDto.propertyId },
    });

    if (!property) {
      throw new NotFoundError(
        `Property with ID ${harvestDto.propertyId} not found`,
      );
    }

    const harvest = this.harvestRepository.create({
      ...harvestDto,
      property,
    });

    return await this.harvestRepository.save(harvest);
  }

  async update(id: string, harvestDto: HarvestDto): Promise<HarvestEntity> {
    const harvest = await this.findById(id);

    let property = null;
    if (harvestDto.propertyId) {
      property = await this.propertyRepository.findOne({
        where: { id: harvestDto.propertyId },
      });

      if (!property) {
        throw new NotFoundError(
          `Property with ID ${harvestDto.propertyId} not found`,
        );
      }
    }

    return await this.harvestRepository.save({
      ...harvest,
      ...harvestDto,
      property,
    });
  }

  async remove(id: string): Promise<void> {
    const harvest = await this.findById(id);
    await this.harvestRepository.remove(harvest);
  }

  async plantCrop(
    harvestId: string,
    dto: CreateHarvestCropDto,
  ): Promise<HarvestCropEntity> {
    const harvest = await this.harvestRepository.findOne({
      where: { id: harvestId },
      relations: ['property'],
    });

    if (!harvest) {
      throw new NotFoundError(`Harvest with ID ${harvestId} not found`);
    }

    const property = harvest.property;

    const crop = await this.cropRepository.findOne({
      where: { id: dto.cropId },
    });
    if (!crop) {
      throw new NotFoundError(`Crop with ID ${dto.cropId} not found`);
    }

    const newTotalArea = Number(property.totalArea) + Number(dto.area);
    if (newTotalArea > property.farmableArea) {
      throw new Error(
        `The total area (${newTotalArea} ha) exceeds the farmable area (${property.farmableArea} ha) of the property.`,
      );
    }

    property.totalArea = newTotalArea;
    await this.propertyRepository.save(property);

    const harvestCrop = this.harvestCropRepository.create({
      harvest,
      crop,
      area: dto.area,
    });

    return this.harvestCropRepository.save(harvestCrop);
  }
}
