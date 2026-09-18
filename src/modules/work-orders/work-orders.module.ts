import { Module } from "@nestjs/common";
import { CreateWorkOrderUseCase } from "./application/create-work-order.use-case.js";
import { WorkOrdersController } from "./presentation/work-orders.controller.js";
import { WorkOrderRepository } from "./domain/work-order.repository.js";
import { InMemoryWorkOrderRepository } from "./infrastructure/persistence/in-memory-work-order.repository.js";
import { GetWorkOrderByIdUseCase } from "./application/get-work-order-by-id.use-case.js";
import { AssignTechnicianUseCase } from "./application/assign-technician.use-case.js";

@Module({
    controllers: [
        WorkOrdersController,
    ],

    providers: [
        CreateWorkOrderUseCase,
        GetWorkOrderByIdUseCase,
        AssignTechnicianUseCase,
        {
            provide: WorkOrderRepository,
            useClass: InMemoryWorkOrderRepository
        },
        
    ],
})

export class WorkOrdersModule { }
