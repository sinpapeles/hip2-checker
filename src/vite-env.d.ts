/// <reference types="vite/client" />

declare module 'hip2-dane' {
  const hip2: {
    fetchAddress(name: string, token: string): Promise<string>;
  };
  export default hip2;
}
