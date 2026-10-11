import { Injectable } from "@nestjs/common";

import { db } from '../../../../prisma/db.js';

import { WorkOrderRepository } from "../../domain/work-order.repository.js";
import { WorkOrder } from "../../domain/work-order.entity.js";
import { WorkOrderMapper } from "./work-order.mapper.js";

@Injectable()
export class PrismaWorkOrderRepository implements WorkOrderRepository {
    async findById(id: string): Promise<WorkOrder | null> {
        const record = await db.orm.public.WorkOrder.where({ id }).first();
        if (!record) {
            return null;
        }
        return WorkOrderMapper.toDomain(record);
    }

    async save(workOrder: WorkOrder): Promise<void> {
        const data = WorkOrderMapper.toPresistance(workOrder);
        await db.orm.public.WorkOrder.upsert({
            create: data,

            update: {
                title: data.title,
                description: data.description,
                status: data.status,
                assignedTechnicianId: data.assignedTechnicianId
            },

            conflictOn: {
                id: data.id
            }
        })
    }
}