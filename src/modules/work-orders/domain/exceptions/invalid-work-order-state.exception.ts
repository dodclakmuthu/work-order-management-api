export class InvalidWorkOrderStateException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidWorkOrderStateException";
    }
}