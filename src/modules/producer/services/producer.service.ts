import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProducerDto } from '../dtos/producer.dto';
import { NotFoundError } from 'src/common/base/error.base';
import { ProducerEntity } from 'src/database/entities/producer.entity';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(ProducerEntity)
    private readonly producerRepository: Repository<ProducerEntity>,
  ) {}

  async findAll(): Promise<ProducerEntity[]> {
    return this.producerRepository.find();
  }

  async findById(id: string): Promise<ProducerEntity> {
    const producer = await this.producerRepository.findOne({ where: { id } });
    if (!producer) {
      throw new NotFoundError(`ProducerEntity with id ${id} not found`);
    }
    return producer;
  }

  async create(producer: ProducerDto): Promise<ProducerEntity> {
    const newProducer = await this.producerRepository.save(producer);
    return newProducer;
  }

  async update(id: string, producer: ProducerDto): Promise<void> {
    const findProducer = await this.producerRepository.findOne({
      where: { id },
    });

    if (!findProducer) {
      throw new NotFoundError(`ProducerEntity with id ${id} not found`);
    }

    await this.producerRepository.update(id, producer);
  }

  async remove(id: string): Promise<void> {
    const findProducer = await this.producerRepository.findOne({
      where: { id },
    });
    if (!findProducer) {
      throw new NotFoundError(`ProducerEntity with id ${id} not found`);
    }
    await this.producerRepository.delete(id);
  }
}
