import { ArgumentsHost, ExceptionFilter, Catch } from '@nestjs/common';

import { Response } from 'express'

import { WorkOrderNotFounodException } from '../../domain/exceptions/work-order-not-found.exception.js';

@Catch(WorkOrderNotFounodException)
export class WorkOrderNotFoundFilter implements ExceptionFilter {
    catch(
        exception: WorkOrderNotFounodException,
        host: ArgumentsHost
    ) {
        const response = host.switchToHttp().getResponse<Response>();
        
        response.status(404).json(
            {
                statusCode: 404,
                message: exception.message
            }
        )
    }
}