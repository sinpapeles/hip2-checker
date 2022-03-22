/// <reference types="vite/client" />

declare module 'https-dane' {
  import https from 'https';
  import { LookupFunction } from 'net';

  export class DANEAgent extends https.Agent {}
  export function setServers(servers: string[]): void;
  export const lookup: LookupFunction;
}
