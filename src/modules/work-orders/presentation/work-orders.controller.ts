import { Body, Controller, Get, Post, Patch, Param, UseFilters } from '@nestjs/common';
import { CreateWorkOrderUseCase } from '../application/create-work-order.use-case.js';
import { GetWorkOrderByIdUseCase } from '../application/get-work-order-by-id.use-case.js';
import { WorkOrderNotFoundFilter } from './filters/work-order-not-found.filter.js';
import { AssignTechnicianUseCase } from '../application/assign-technician.use-case.js';
import { StartWorkOrderUseCase } from "../application/start-work-order.use-case.js";
import { CompleteWorkOrderUseCase } from '../application/complete-work-order.use-case.js';

@Controller('work-orders')
@UseFilters(WorkOrderNotFoundFilter)
export class WorkOrdersController {
    constructor(
        private readonly createWorkOrderUseCase: CreateWorkOrderUseCase,
        private readonly getWorkOrderByIdUseCase: GetWorkOrderByIdUseCase,
        private readonly assignTechnicianUseCase: AssignTechnicianUseCase,
        private readonly startWorkOrderUseCase: StartWorkOrderUseCase,
        private readonly completeWorkOrderUseCase: CompleteWorkOrderUseCase
    ) { }

    @Get(':id')
    getById(
        @Param('id') id: string
    ) {
        console.debug("Request received with id: ", id)
        return this.getWorkOrderByIdUseCase.execute(id)
    }

    @Post()
    create(
        @Body()
        body: {
            title: string;
            description: string;
        },
    ) {
        return this.createWorkOrderUseCase.execute(
            body.title,
            body.description
        );
    }

    @Patch(':id/technician')
    async assignTechnician(
        @Body()
        body: {
            wordOrderId: string,
            technicianId: string
        }
    ) {
        await this.assignTechnicianUseCase.execute(body.wordOrderId, body.technicianId);
        return {
            message: 'Technician assigned successfully'
        }
    }

    @Patch(':id/start')
    async startWorkOrder(
        @Body()
        body: {
            workOrderId: string
        }
    ) {
        await this.startWorkOrderUseCase.execute(body.workOrderId);
        return {
            message: 'Work Order started sucessfully'
        }
    }

    @Patch(':id/complete')
    async completeWorkOrder(
        @Body()
        body: {
            workOrderId: string
        }
    ) {
        await this.completeWorkOrderUseCase.execute(body.workOrderId);
    }

}
