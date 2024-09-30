import { config } from 'dotenv';
import { join } from 'path';

config();

interface ServerEnv extends NodeJS.ProcessEnv {
  WEB_PATH: string;
  SERVER_VERSION: 'v1' | 'v2' | 'v3';
  SECRET_KEY: string;
  IS_PROD: string;
}

const serverEnv: ServerEnv = {
  ...process.env,
  WEB_PATH: join(__dirname, '../../', 'web/dist/'),
  SERVER_VERSION: 'v1',
  SECRET_KEY: 'key',
  IS_PROD: process.env.NODE_ENV === 'production' ? 'true' : '',
};

export default serverEnv;
