import {SublettingApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {SublettingApiApplication};

export async function main(options?: ApplicationConfig) {
  const app = new SublettingApiApplication(options);
  await app.boot();
  await app.start();
  return app;
}
