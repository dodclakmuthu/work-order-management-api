import { ArgumentsHost, ExceptionFilter, Catch } from "@nestjs/common";
import { InvalidWorkOrderStateException } from "../../domain/exceptions/invalid-work-order-state.exception.js";
import { Response } from "express";

@Catch(InvalidWorkOrderStateException)
export class InvalidWorkOrderStatusFilter implements ExceptionFilter{
    catch(
        exception: InvalidWorkOrderStateException, 
        host: ArgumentsHost
    ) {
        const response = host.switchToHttp().getResponse<Response>();

        response.status(409).json(
            {
                statusCode: 409,
                message: exception.message
            }
        )
    }
}