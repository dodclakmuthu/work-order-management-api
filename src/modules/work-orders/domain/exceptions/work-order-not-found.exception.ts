export class WorkOrderNotFounodException extends Error{
    constructor(id: string){
       super(`Work order ${id} was not found`);

       this.name='WorkOrderNotFoundException'; 
    }
}