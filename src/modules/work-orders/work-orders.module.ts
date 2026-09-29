import { Module } from "@nestjs/common";
import { CreateWorkOrderUseCase } from "./application/create-work-order.use-case.js";
import { WorkOrdersController } from "./presentation/work-orders.controller.js";
import { WorkOrderRepository } from "./domain/work-order.repository.js";
import { InMemoryWorkOrderRepository } from "./infrastructure/persistence/in-memory-work-order.repository.js";
import { GetWorkOrderByIdUseCase } from "./application/get-work-order-by-id.use-case.js";
import { AssignTechnicianUseCase } from "./application/assign-technician.use-case.js";
import { StartWorkOrderUseCase } from "./application/start-work-order.use-case.js";
import { CompleteWorkOrderUseCase } from './application/complete-work-order.use-case.js';
import { DomainEventPublisher } from "./application/ports/domain-event-publisher.js";
import { InMemoryDomainEventPublisher } from "./infrastructure/messaging/in-memory-domain-event-publisher.js";
import { WorkorderCompletedHandler } from "./application/event-handlers/work-order-completed.handler.js";
import { NotificationPort } from "./application/ports/notification.port.js";
import { ConsoleNotificationAdapter } from "./infrastructure/notification/console-notification.adapter.js";

@Module({
    controllers: [
        WorkOrdersController,
    ],

    providers: [
        CreateWorkOrderUseCase,
        GetWorkOrderByIdUseCase,
        AssignTechnicianUseCase,
        StartWorkOrderUseCase,
        CompleteWorkOrderUseCase,
        WorkorderCompletedHandler,
        {
            provide: WorkOrderRepository,
            useClass: InMemoryWorkOrderRepository
        },
        {
            provide: DomainEventPublisher,
            useClass: InMemoryDomainEventPublisher
        },
        {
            provide: DomainEventPublisher,
            useClass: InMemoryDomainEventPublisher
        },
        {
            provide: NotificationPort,
            useClass: ConsoleNotificationAdapter
        }
    ],
})

export class WorkOrdersModule { }
