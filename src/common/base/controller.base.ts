import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  getSchemaPath,
} from '@nestjs/swagger';

export abstract class BaseController<T, TDto> {
  constructor(private readonly service: any) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all records' })
  @ApiResponse({
    status: 200,
    description: 'List of all records.',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(Object) },
    },
  })
  async findAll(): Promise<T[]> {
    return await this.service.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a record by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the record.',
    example: '12345',
  })
  @ApiResponse({
    status: 200,
    description: 'The record with the specified ID.',
    schema: { $ref: getSchemaPath(Object) },
  })
  async findById(@Param('id') id: string): Promise<T> {
    return await this.service.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new record' })
  @ApiBody({
    description: 'Data required to create a new record.',
    schema: { $ref: getSchemaPath(Object) },
  })
  @ApiResponse({
    status: 201,
    description: 'The newly created record.',
    schema: { $ref: getSchemaPath(Object) },
  })
  async create(@Body() dto: TDto): Promise<T> {
    return await this.service.create(dto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing record by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the record to update.',
    example: '12345',
  })
  @ApiBody({
    description: 'Data for updating the record.',
    schema: { $ref: getSchemaPath(Object) },
  })
  @ApiResponse({
    status: 200,
    description: 'The updated record.',
    schema: { $ref: getSchemaPath(Object) },
  })
  async update(@Param('id') id: string, @Body() dto: TDto): Promise<T> {
    return await this.service.update(id, dto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a record by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the record to delete.',
    example: '12345',
  })
  @ApiResponse({
    status: 200,
    description: 'Record successfully deleted.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.service.remove(id);
  }
}
