import 'express-session';

declare module 'express-session' {
  interface SessionData {
    request: {
      timeout: NodeJS.Timeout;
      path: string;
    } | null;
  }
}
