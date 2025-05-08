import { Http } from '../core/Http';

declare global {
  namespace NodeJS {
    interface Global {
      Http: typeof Http;
    }
  }
  interface Window {
    Http: typeof Http;
  }
}

export {};