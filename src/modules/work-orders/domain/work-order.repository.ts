import { WorkOrder } from "./work-order.entity.js";

export abstract class WorkOrderRepository {

    abstract save(WorkOrder: WorkOrder): Promise<void>;

    abstract findById(id: string): Promise<WorkOrder | null>;
}