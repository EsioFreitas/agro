import { Test, TestingModule } from '@nestjs/testing';

import { ProducerController } from '../producer.controller';
import { ProducerModule } from '../../producer.module';

describe('ProducerController', () => {
  let controller: ProducerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProducerModule],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
