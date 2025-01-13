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
import { ProducerService } from '../services/producer.service';
import { ProducerDto } from '../dtos/producer.dto';
import { ProducerEntity } from 'src/database/entities/producer.entity';

@Controller('producer')
@ApiTags('Producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all producers' })
  @ApiResponse({
    status: 200,
    description: 'List of all registered producers.',
    type: [ProducerEntity],
  })
  async findAll(): Promise<ProducerEntity[]> {
    return this.producerService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a producer by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the producer.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the producer with the specified ID.',
    type: ProducerEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Producer not found.',
  })
  async findById(@Param('id') id: string): Promise<ProducerEntity> {
    return this.producerService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new producer' })
  @ApiBody({
    description: 'Data to create a new producer.',
    type: ProducerDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Producer successfully created.',
    type: ProducerEntity,
  })
  async create(@Body() producerDto: ProducerDto): Promise<ProducerEntity> {
    return this.producerService.create(producerDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing producer by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the producer to update.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiBody({
    description: 'Data to update the producer.',
    type: ProducerDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Producer successfully updated.',
    type: ProducerEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Producer not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() producerDto: ProducerDto,
  ): Promise<void> {
    await this.producerService.update(id, producerDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a producer by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the producer to delete.',
    example: '1b6e2a12-6f22-4b0b-9e0d-9a5db6b24756',
  })
  @ApiResponse({
    status: 200,
    description: 'Producer successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producer not found.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.producerService.remove(id);
  }
}
