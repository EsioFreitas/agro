import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(500).json({
      statusCode: 500,
      message: 'A database error occurred.',
      error: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
