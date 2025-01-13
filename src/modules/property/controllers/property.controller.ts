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
import { PropertyService } from '../services/property.service';
import { PropertyDto } from '../dtos/property.dto';
import { PropertyEntity } from 'src/database/entities/property.entity';

@Controller('properties')
@ApiTags('Properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all properties' })
  @ApiResponse({
    status: 200,
    description: 'List of all registered properties.',
    type: [PropertyEntity],
  })
  async findAll(): Promise<PropertyEntity[]> {
    return await this.propertyService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a property by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the property.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the property with the specified ID.',
    type: PropertyEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Property not found.',
  })
  async findById(@Param('id') id: string): Promise<PropertyEntity> {
    return await this.propertyService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new property' })
  @ApiBody({
    description: 'Data required to create a new property.',
    type: PropertyDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Property successfully created.',
    type: PropertyEntity,
  })
  async create(@Body() propertyDto: PropertyDto): Promise<PropertyEntity> {
    return await this.propertyService.create(propertyDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing property by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the property to update.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiBody({
    description: 'Data required to update the property.',
    type: PropertyDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Property successfully updated.',
    type: PropertyEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Property not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() propertyDto: PropertyDto,
  ): Promise<void> {
    await this.propertyService.update(id, propertyDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a property by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the property to delete.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiResponse({
    status: 200,
    description: 'Property successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Property not found.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.propertyService.remove(id);
  }
}
