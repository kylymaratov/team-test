import { NextFunction, Request, Response } from 'express';

interface ServerErrorTypes {
  message: string;
  statusCode: number;
  errors?: any[];
}

export class ServerError extends Error {
  statusCode: number;
  errors?: any[];

  constructor(error: ServerErrorTypes) {
    super(error.message || 'Server internal error');
    this.name = this.constructor.name;
    this.statusCode = error.statusCode;
    this.errors = error.errors || [];
  }
}

export const sendError = (
  error: ServerError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error instanceof ServerError ? error.statusCode : 500;
  const errorMessage =
    error instanceof ServerError ? error.message : 'Internal Server Error';

  res.status(statusCode).json({
    path: req.url,
    statusCode,
    message: errorMessage,
    errors: error instanceof ServerError ? error.errors : undefined,
  });
};
