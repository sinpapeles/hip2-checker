declare module 'react-copy-to-clipboard' {
  export interface Options {
    debug?: boolean;
    message?: string;
  }

  export interface Props {
    text: string;
    onCopy?: (text: string, result: boolean) => void;
    options?: Options;
    children: React.ReactNode;
  }

  const CopyToClipboard: React.FC<Props>;
  export { CopyToClipboard };
}
