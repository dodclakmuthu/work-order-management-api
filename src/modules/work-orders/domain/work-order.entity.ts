import { InvalidWorkOrderStateException } from "./exceptions/invalid-work-order-state.exception.js";
import { WorkorderCompletedEvent } from "./events/work-order-completed.event.js";

export enum WorkOrderStatus {
    REPORTED = 'REPORTED',
    ASSIGNED = 'ASSIGNED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}

export class WorkOrder {
    private status: WorkOrderStatus;
    private assignedTechnicianId?: string;
    private domainEvents: object[] = [];

    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        status: WorkOrderStatus,
        assignedTechnicianId?: string
    ) {
        this.status = status;
        this.assignedTechnicianId = assignedTechnicianId;
    }

    static create(id: string, title: string, description: string): WorkOrder {
        return new WorkOrder(id, title, description, WorkOrderStatus.REPORTED)
    }

    assignTechnician(technicianId: string): void {
        if (this.status !== WorkOrderStatus.REPORTED) {
            throw new InvalidWorkOrderStateException(`Cannot assign technician when work order status is ${this.status}`);
        }
        this.assignedTechnicianId = technicianId;
        this.status = WorkOrderStatus.ASSIGNED;
    }

    getAssignedTechnicianId(): string | undefined {
        return this.assignedTechnicianId;
    }

    getStatus() {
        return this.status;
    }

    start() {
        if (this.status !== WorkOrderStatus.ASSIGNED) {
            throw new InvalidWorkOrderStateException(`Cannot start when work order status is ${this.status}`);
        }

        this.status = WorkOrderStatus.IN_PROGRESS;
    }

    complete() {
        if (this.status !== WorkOrderStatus.IN_PROGRESS) {
            throw new InvalidWorkOrderStateException(`Cannot complete when work order status is ${this.status}`);
        }

        this.status = WorkOrderStatus.COMPLETED;

        this.domainEvents.push(
            new WorkorderCompletedEvent(this.id, new Date())
        )
    }

    getDomainEvents(): object[] {
        return [...this.domainEvents];
    }

    clearDomainEvents(): void{
        this.domainEvents.length = 0;
    }
}