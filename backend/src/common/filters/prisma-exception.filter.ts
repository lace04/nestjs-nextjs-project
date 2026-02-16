import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('PrismaExceptionFilter');

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = 'Database error occurred';

    // Mapeo de códigos de error de Prisma a HTTP status
    switch (exception.code) {
      case 'P2002':
        // Unique constraint violation
        status = HttpStatus.CONFLICT;
        errorMessage = `Unique constraint failed on field(s): ${
          exception.meta?.target instanceof Array
            ? exception.meta.target.join(', ')
            : 'unknown'
        }`;
        break;

      case 'P2025':
        // Record not found
        status = HttpStatus.NOT_FOUND;
        errorMessage = 'Record not found';
        break;

      case 'P2003':
        // Foreign key constraint
        status = HttpStatus.BAD_REQUEST;
        errorMessage = 'Foreign key constraint failed';
        break;

      case 'P2014':
        // Required relation violation
        status = HttpStatus.BAD_REQUEST;
        errorMessage = 'Required relation violation';
        break;

      case 'P2001':
        // Record to update not found
        status = HttpStatus.NOT_FOUND;
        errorMessage = 'Record to update not found';
        break;

      case 'P2004':
        // Constraint failed
        status = HttpStatus.BAD_REQUEST;
        errorMessage = 'Database constraint failed';
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        errorMessage = 'Database error occurred';
    }

    this.logger.error(`Prisma Error [${exception.code}]: ${message}`);

    response.status(status).json({
      statusCode: status,
      message: errorMessage,
      code: exception.code,
      timestamp: new Date().toISOString(),
    });
  }
}

@Catch(Prisma.PrismaClientValidationError)
export class PrismaValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('PrismaValidationExceptionFilter');

  catch(exception: Prisma.PrismaClientValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;

    this.logger.error(`Prisma Validation Error: ${message}`);

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation error in database operation',
      error: 'Bad Request',
      timestamp: new Date().toISOString(),
    });
  }
}
