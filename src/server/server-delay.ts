import { NextFunction, Request, Response } from 'express';

export const serverDelay = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.session.request && req.url === req.session.request.path) {
    clearTimeout(req.session.request.timeout);
    req.session.request = null;
  }

  req.session.request = {
    timeout: setTimeout(() => {
      next();
    }, 5000),
    path: req.url,
  };
};
