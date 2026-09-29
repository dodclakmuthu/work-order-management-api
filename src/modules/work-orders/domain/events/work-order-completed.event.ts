export class WorkorderCompletedEvent{
    constructor(
        public readonly workOrderId: string,
        public readonly assignedAt: Date
    ) {

    }
}