export abstract class NotificationPort{
    abstract notifyWorkOrderCompleted(workOrderId: string): Promise<void>;
}