import { Test, TestingModule } from '@nestjs/testing';

import { CropController } from '../crop.controller';
import { CropService } from '../../services/crop.service';

describe('CropController', () => {
  let controller: CropController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropController],
      providers: [
        {
          provide: CropService,
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

    controller = module.get<CropController>(CropController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
