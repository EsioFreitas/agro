import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';
import { Module } from '@nestjs/common';
import { PropertyEntity } from 'src/database/entities/property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
