import { NextFunction, Request, Response } from 'express';

export const serverRequestTime = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();
  const path = req.url;
  const contentType = req.headers['content-type'];
  const contentLength = req.headers['content-length'];

  res.on('finish', () => {
    const duration = Date.now() - start;

    console.info(
      `${req.method} ${path} - ${contentType} | ${contentLength} bytes - ${duration}ms | ${res.statusCode}`,
    );
  });

  next();
};
