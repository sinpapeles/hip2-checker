/// <reference types="vite/client" />

declare module 'hip2-dane' {
  const hip2: {
    fetchAddress(name: string, token: string): Promise<string>;
    setServers(servers: string[]): void;
  };
  export default hip2;
}
