import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('GlobalException');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = 500;
    let message = 'Internal Server Error';
    let errorResponse: any;

    // Si es HttpException (validación, etc)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorResponse = exception.getResponse();
      message = errorResponse.message || exception.message;
    }
    // Para cualquier otro error
    else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(`Unexpected Error: ${exception.message}`, exception.stack);
    }
    // Error completamente desconocido
    else {
      message = 'Unknown error occurred';
      this.logger.error(`Unknown Error:`, exception);
    }

    const finalResponse = {
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (status >= 500) {
      this.logger.error(`[${request.method}] ${request.url} - ${status} - ${message}`);
    }

    response.status(status).json(finalResponse);
  }
}
