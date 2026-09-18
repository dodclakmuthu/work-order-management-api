import { Injectable } from "@nestjs/common";
import { WorkOrderRepository } from "../../domain/work-order.repository.js";
import { WorkOrder } from "../../domain/work-order.entity.js";

@Injectable()
export class InMemoryWorkOrderRepository implements WorkOrderRepository {

    private readonly workOrders: WorkOrder[] = [];

    async save(workOrder: WorkOrder): Promise<void> {
        const index = this.workOrders.findIndex(
            item => item.id === workOrder.id,
        );

        if (index == -1) {
            this.workOrders.push(workOrder);
        }

        this.workOrders[index] = workOrder
    }

    async findById(id: string): Promise<WorkOrder | null> {
        console.debug(this.workOrders);
        return (
            this.workOrders.find((workOrder) => workOrder.id === id) ?? null
        );
    }
}