import { Test, TestingModule } from '@nestjs/testing';

import { PropertyController } from '../property.controller';
import { PropertyService } from '../../services/property.service';

describe('PropertyController', () => {
  let controller: PropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [
        {
          provide: PropertyService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PropertyController>(PropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
