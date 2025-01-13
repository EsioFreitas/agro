import { HttpStatus } from '@nestjs/common';

export class BaseError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    isOperational = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = 'Resource not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class ValidationBaseError extends BaseError {
  constructor(message: string = 'Validation failed') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string = 'Internal server error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string = 'Forbidden') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
