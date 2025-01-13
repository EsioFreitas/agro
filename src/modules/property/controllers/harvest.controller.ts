import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { HarvestService } from '../services/harvest.service';
import { HarvestDto } from '../dtos/harvest.dto';
import { HarvestEntity } from 'src/database/entities/harvest.entity';
import { HarvestCropEntity } from 'src/database/entities/harvest-crop.entity';
import { CreateHarvestCropDto } from '../dtos/harvest-crop.dto';

@Controller('harvests')
@ApiTags('Harvests')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all harvests' })
  @ApiResponse({
    status: 200,
    description: 'List of all registered harvests.',
    type: [HarvestEntity],
  })
  async findAll(): Promise<HarvestEntity[]> {
    return await this.harvestService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a harvest by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the harvest.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the harvest with the specified ID.',
    type: HarvestEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Harvest not found.',
  })
  async findById(@Param('id') id: string): Promise<HarvestEntity> {
    return await this.harvestService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new harvest' })
  @ApiBody({
    description: 'Data required to create a new harvest.',
    type: HarvestDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Harvest successfully created.',
    type: HarvestEntity,
  })
  async create(@Body() harvestDto: HarvestDto): Promise<HarvestEntity> {
    return await this.harvestService.create(harvestDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing harvest by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the harvest to update.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiBody({
    description: 'Data required to update the harvest.',
    type: HarvestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Harvest successfully updated.',
    type: HarvestEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Harvest not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() harvestDto: HarvestDto,
  ): Promise<void> {
    await this.harvestService.update(id, harvestDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a harvest by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the harvest to delete.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiResponse({
    status: 200,
    description: 'Harvest successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Harvest not found.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.harvestService.remove(id);
  }

  @Post('/:id/plant-crop')
  @ApiOperation({ summary: 'Plant a crop in a specific harvest' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the harvest.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiResponse({
    status: 201,
    description: 'Crop successfully planted in the specified harvest.',
    type: HarvestCropEntity,
  })
  async plantCrop(
    @Param('id') harvestId: string,
    @Body() dto: CreateHarvestCropDto,
  ): Promise<HarvestCropEntity> {
    return await this.harvestService.plantCrop(harvestId, dto);
  }
}
