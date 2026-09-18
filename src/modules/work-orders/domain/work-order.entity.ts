import { InvalidWorkOrderStateException } from "./exceptions/invalid-work-order-state.exception.js";

export enum WorkOrderStatus {
    REPORTED = 'REPORTED',
    ASSIGNED = 'ASSIGNED'
}

export class WorkOrder {
    private status: WorkOrderStatus;
    private assignedTechnicianId?: string;

    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        status: WorkOrderStatus,
        assignedTechnicianId?: string
    ) {
        this.status=status;
        this.assignedTechnicianId=assignedTechnicianId;
    }

    static create(id: string, title: string, description:  string) : WorkOrder {
        return new WorkOrder(id, title, description, WorkOrderStatus.REPORTED)
    }

    assignTechnician(technicianId: string): void {
        if (this.status !== WorkOrderStatus.REPORTED) {
            throw new InvalidWorkOrderStateException(`Cannot assign technician when work order status is ${this.status}`);
        }
        this.assignedTechnicianId=technicianId;
        this.status=WorkOrderStatus.ASSIGNED;
    }

    getAssignedTechnicianId(): string | undefined{
        return this.assignedTechnicianId;
    }

    getStatus(){
        return this.status;
    }
}