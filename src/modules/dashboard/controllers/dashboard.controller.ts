import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { DashboardService } from '../services/dashboard.service';

@Controller('dashboard')
@ApiTags('Dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/area-by-state')
  @ApiOperation({
    summary: 'Retrieve cultivated area by state',
    description:
      'Fetch data representing the total cultivated area grouped by state.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response with area data grouped by state.',
    schema: {
      example: [
        { state: 'California', area: 1200 },
        { state: 'Texas', area: 1500 },
      ],
    },
  })
  async getAreaByState() {
    return this.dashboardService.getAreaByState();
  }

  @Get('/area-by-crop')
  @ApiOperation({
    summary: 'Retrieve cultivated area by crop type',
    description:
      'Fetch data representing the total cultivated area grouped by crop type.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response with area data grouped by crop type.',
    schema: {
      example: [
        { crop: 'Wheat', area: 2000 },
        { crop: 'Corn', area: 3000 },
      ],
    },
  })
  async getAreaByCrop() {
    return this.dashboardService.getAreaByCrop();
  }

  @Get('/vegetation-vs-total-area')
  @ApiOperation({
    summary: 'Retrieve the ratio of vegetation area to total area',
    description:
      'Fetch data representing the comparison between vegetation area and total area.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response with vegetation and total area data.',
    schema: {
      example: {
        vegetationArea: 500,
        totalArea: 2000,
      },
    },
  })
  async getVegetationVsTotalArea() {
    return this.dashboardService.getVegetationVsTotalArea();
  }
}
