import bodyParser from 'body-parser';
import { static as static_ } from 'express';
import { Express } from 'express';
import serverEnv from './server-env';
import api from '@/api/v1/api';
import { sendError } from './server-error';
import { serverRequestTime } from './server-request-time';
import session from 'express-session';
import { serverDelay } from './server-delay';

export const setServerMiddlewraes = (app: Express) => {
  const apiPath = `/api/${serverEnv.SERVER_VERSION}/`;

  app.use(bodyParser.json());
  app.use(
    session({
      secret: serverEnv.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: Boolean(serverEnv.IS_PROD),
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
    }),
  );

  app.use(apiPath, serverRequestTime);
  app.use(apiPath, serverDelay);
  app.use(static_(serverEnv.WEB_PATH));
  app.use(apiPath, api);

  app.use(sendError);
};
