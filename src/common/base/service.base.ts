import { Repository } from 'typeorm';

export abstract class BaseService<Entity extends { id: string }, Dto> {
  constructor(
    protected readonly repository: Repository<Entity>,
    protected readonly fromDto: (id: string, dto: Dto) => Entity,
  ) {}

  async findAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Entity | null> {
    return this.repository.findOne({ where: { id: id as any } });
  }

  async create(dto: Dto): Promise<Entity> {
    const entity = this.fromDto('id', dto);
    return this.repository.save(entity);
  }

  async update(id: string, dto: Dto): Promise<Entity> {
    const entity = this.fromDto(id, dto);
    return this.repository.save(entity);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
