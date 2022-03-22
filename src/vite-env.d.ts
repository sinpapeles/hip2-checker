/// <reference types="vite/client" />

declare module 'https-dane' {
  import https from 'https';
  import { LookupFunction } from 'net';

  export class DANEAgent extends https.Agent {}
  export function setServers(servers: string[]): void;
  export const lookup: LookupFunction;
}
declare module 'hip2-dane' {
  const hip2: {
    fetchAddress(name: string, token: string): Promise<string>;
    setServers(servers: string[]): void;
  };
  export default hip2;
}
