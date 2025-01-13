import { CropDto } from '../dtos/crop.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CropEntity } from 'src/database/entities/crop.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'src/common/base/error.base';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(CropEntity)
    private readonly cropRepository: Repository<CropEntity>,
  ) {}

  findAll() {
    const crops = this.cropRepository.find();
    return crops;
  }

  findById(id: string) {
    const crop = this.cropRepository.findOne({
      where: {
        id,
      },
    });
    return crop;
  }

  async create(crop: CropDto): Promise<CropEntity> {
    const newCrop = await this.cropRepository.save(crop);
    return newCrop;
  }

  async update(id: string, crop: CropDto) {
    const findCrop = await this.cropRepository.findOne({ where: { id } });

    if (!findCrop) {
      throw new NotFoundError(`CropEntity with id ${id} not found`);
    }

    await this.cropRepository.update(id, crop);
  }

  async remove(id: string) {
    await this.cropRepository.delete(id);
  }
}
