import { FC } from 'react';

interface Props {
  addr?: string;
  loading: boolean;
  name?: string;
  setValue: (value: string) => void;
}
export const Status: FC<Props> = ({ addr, loading, name, setValue }) => (
  <>
    {!addr && !loading && !name && (
      <span
        key="example"
        className="text-sm text-gray-500 cursor-pointer"
        onClick={() => setValue('iamfernando')}
      >
        Example: falci.me
      </span>
    )}
    {!addr && !loading && name && (
      <span key="failed" className="text-sm text-red-500">
        Failed
      </span>
    )}
    {loading && (
      <span key="loading" className="text-sm text-gray-500">
        Loading...
      </span>
    )}
    {addr && !loading && (
      <span key="success" className="text-sm text-green-500">
        Success!
      </span>
    )}
  </>
);
