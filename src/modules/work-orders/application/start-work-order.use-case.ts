import { WorkOrderRepository } from "../domain/work-order.repository.js";
import { WorkOrderNotFounodException } from "../domain/exceptions/work-order-not-found.exception.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StartWorkOrderUseCase {
    constructor(
        private readonly workOrderRepository: WorkOrderRepository
    ) { }

    async execute(workOrderId: string) {
        const workOrder = await this.workOrderRepository.findById(workOrderId);

        if (!workOrder) {
            throw new WorkOrderNotFounodException(workOrderId);
        }

        workOrder.start();
        this.workOrderRepository.save(workOrder);
    }
}