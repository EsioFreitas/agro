import { Module } from '@nestjs/common';
import { ProducerController } from './controllers/producer.controller';
import { ProducerEntity } from 'src/database/entities/producer.entity';
import { ProducerService } from './services/producer.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerEntity])],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
