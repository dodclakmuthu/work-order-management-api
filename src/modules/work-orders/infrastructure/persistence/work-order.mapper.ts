import { title } from "process";
import { WorkOrder, WorkOrderStatus } from "../../domain/work-order.entity.js";

type WorkOrderRecord = {
    id: string;
    title: string;
    description: string;
    status: string;
    assignedTechnicianId: number | null;
}

export class WorkOrderMapper {
    static toDomain(record: WorkOrderRecord): WorkOrder {
        return new WorkOrder(
            record.id,
            record.title,
            record.description,
            record.status as WorkOrderStatus,
            record.assignedTechnicianId ?? undefined
        )
    }

    static toPresistance(workOrder: WorkOrder){
        return {
            id: workOrder.id,
            title: workOrder.title,
            description: workOrder.description,
            status: workOrder.getStatus(),
            assignedTechnicianId: workOrder.getAssignedTechnicianId() ?? null
        }
    }
}