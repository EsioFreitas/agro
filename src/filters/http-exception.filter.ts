import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { BaseError } from 'src/common/base/error.base';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;

    switch (true) {
      case exception instanceof BaseError:
        status = exception.statusCode;
        message = exception.message;
        break;
      case exception instanceof HttpException:
        status = exception.getStatus();
        const responseMessage = exception.getResponse();
        message = JSON.stringify(responseMessage);
        break;
      default:
        status = 500;
        message = exception.message || 'Internal Server Error';
        break;
    }

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      status,
      message,
    });
  }
}
