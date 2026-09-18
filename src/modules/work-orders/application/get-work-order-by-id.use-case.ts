import { Injectable } from "@nestjs/common";
import { WorkOrder } from "../domain/work-order.entity.js";
import { WorkOrderRepository } from "../domain/work-order.repository.js";
import { WorkOrderNotFounodException } from "../domain/exceptions/work-order-not-found.exception.js";

@Injectable()
export class GetWorkOrderByIdUseCase{
    constructor(private readonly workOrderRepository: WorkOrderRepository){}

    async execute(id: string): Promise<WorkOrder | null> {
        const workOrder = await this.workOrderRepository.findById(id);
        console.log(workOrder)
        if (!workOrder){
            console.log("work order not found");
            throw new WorkOrderNotFounodException(id);
        }

        return workOrder;
    }
}