
import { WorkOrderRepository } from "../domain/work-order.repository.js";
import { WorkOrderNotFounodException } from "../domain/exceptions/work-order-not-found.exception.js";
import { DomainEventPublisher } from "./ports/domain-event-publisher.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CompleteWorkOrderUseCase{
    constructor(
        private readonly workOrderRepository: WorkOrderRepository,
        private readonly eventPublisher: DomainEventPublisher,
    ){}

    async execute(workOrderId: string) {
        const workOrder = await this.workOrderRepository.findById(workOrderId);

        if (!workOrder){
            throw new WorkOrderNotFounodException(workOrderId); 
        }
        workOrder.complete();
        await this.workOrderRepository.save(workOrder);

        await this.eventPublisher.publish(
            workOrder.getDomainEvents()
        )

        workOrder.clearDomainEvents();
    }
}