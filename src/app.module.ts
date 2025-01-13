import { ConfigModule } from '@nestjs/config';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ProducerModule } from './modules/producer/producer.module';
import { PropertyModule } from './modules/property/property.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PropertyModule,
    ProducerModule,
    DatabaseModule,
    DashboardModule,
  ],
})
export class AppModule {}
