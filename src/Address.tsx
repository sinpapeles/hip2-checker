import { FC, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const Address: FC<{ value: string }> = ({ value }) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
      <div>
        <span className="block px-5 pt-5 font-mono text-2xl break-all select-none">
          {value}
        </span>

        <div className="text-sm text-center text-gray-400">
          {copied ? 'Copied!' : 'Click to copy'}
        </div>
      </div>
    </CopyToClipboard>
  );
};
