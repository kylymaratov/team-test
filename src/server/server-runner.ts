import { Express } from 'express';
import serverEnv from './server-env';

const beforeStart = (app: Express) => {
  app.get('*', (req, res) => {
    res.sendFile(serverEnv.WEB_PATH + 'index.html');
  });
};

const afterStart = (port: number) => {
  console.info(`Server running on port: ${port}...`);
};

export const startServer = (app: Express) => {
  beforeStart(app);

  const port = Number(serverEnv.PORT) || 5000;

  app.listen(port, () => afterStart(port));
};
