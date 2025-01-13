import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

export class TooManyRequestsException extends HttpException {
  constructor(message: string = 'Too many requests, please try again later.') {
    super(message, HttpStatus.TOO_MANY_REQUESTS);
  }
}

@Catch(TooManyRequestsException)
export class RateLimitExceptionFilter implements ExceptionFilter {
  catch(exception: TooManyRequestsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
