import { WorkOrderRepository } from "../domain/work-order.repository.js";
import { WorkOrderNotFounodException } from "../domain/exceptions/work-order-not-found.exception.js";

export class AssignTechnicianUseCase{
    constructor(
        private readonly workOrderRepository: WorkOrderRepository
    ){}

    async execute(
        workOrderId: string,
        technicianId: number
    ){
        const workOrder = await this.workOrderRepository.findById(workOrderId);
        if (!workOrder) {
            throw new WorkOrderNotFounodException(workOrderId);
        }

        workOrder.assignTechnician(technicianId);
        await this.workOrderRepository.save(workOrder);
    }
}