import { ServerError } from '@/server/server-error';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export class UsersMiddlewares {
  findUser() {
    return [body('email').isEmail(), this.checkValidationResult];
  }

  private checkValidationResult(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      throw new ServerError({
        message: 'Validation failed',
        statusCode: 400,
        errors: errors.array(),
      });

    next();
  }
}
