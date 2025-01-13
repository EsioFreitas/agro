import { Test, TestingModule } from '@nestjs/testing';

import { HarvestController } from '../harvest.controller';
import { HarvestService } from '../../services/harvest.service';
import { PropertyService } from '../../services/property.service';

describe('HarvestController', () => {
  let controller: HarvestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [
        {
          provide: HarvestService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: PropertyService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HarvestController>(HarvestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
