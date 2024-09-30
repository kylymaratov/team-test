import cors from 'cors';
import { Express } from 'express';
import serverEnv from './server-env';

export const setServerCors = (app: Express) => {
  const origin = Boolean(serverEnv.IS_PROD) ? '/' : 'http:localhost:5173';

  app.use(
    cors({
      origin,
      methods: '*',
      maxAge: 86400,
      credentials: true,
    }),
  );
};
