import { randomUUID } from "crypto";
import { WorkOrder } from "../domain/work-order.entity.js";
import { WorkOrderRepository } from "../domain/work-order.repository.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateWorkOrderUseCase {
    constructor(private readonly workOrderRepositoy: WorkOrderRepository) { }

    async execute(title: string, description: string): Promise<WorkOrder> {
        const id = randomUUID();
        const workOrder = WorkOrder.create(id, title, description);
        await this.workOrderRepositoy.save(workOrder);
        return workOrder;
    }
}