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
import { CropService } from '../services/crop.service';
import { CropDto } from '../dtos/crop.dto';
import { CropEntity } from 'src/database/entities/crop.entity';

@Controller('crops')
@ApiTags('Crops')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all crops' })
  @ApiResponse({
    status: 200,
    description: 'List of all registered crops.',
    type: [CropEntity],
  })
  async findAll(): Promise<CropEntity[]> {
    return await this.cropService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a crop by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the crop.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the crop with the specified ID.',
    type: CropEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Crop not found.',
  })
  async findById(@Param('id') id: string): Promise<CropEntity> {
    return await this.cropService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new crop' })
  @ApiBody({
    description: 'Data required to create a new crop.',
    type: CropDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Crop successfully created.',
    type: CropEntity,
  })
  async create(@Body() cropDto: CropDto): Promise<CropEntity> {
    return await this.cropService.create(cropDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing crop by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the crop to update.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiBody({
    description: 'Data required to update the crop.',
    type: CropDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Crop successfully updated.',
    type: CropEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Crop not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() cropDto: CropDto,
  ): Promise<void> {
    await this.cropService.update(id, cropDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a crop by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the crop to delete.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiResponse({
    status: 200,
    description: 'Crop successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Crop not found.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.cropService.remove(id);
  }
}
