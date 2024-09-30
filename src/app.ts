import './path-register';

import express from 'express';
import { setServerCors } from './server/server-cors';
import { setServerMiddlewraes } from './server/server-middleware';
import { startServer } from './server/server-runner';

function bootstrap() {
  try {
    const app = express();

    setServerCors(app);
    setServerMiddlewraes(app);
    startServer(app);
  } catch (error) {
    console.error(`Server failed: ${error}`);
  }
}

bootstrap();
