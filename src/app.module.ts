import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { WorkOrdersModule } from './modules/work-orders/work-orders.module.js';

@Module({
  imports: [WorkOrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
