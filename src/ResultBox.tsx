import Skeleton from 'react-loading-skeleton';
import { Address } from './Address';

export interface ResultBoxProps {
  addr?: string;
}
export const ResultBox = ({ addr }: ResultBoxProps) => (
  <>
    {addr ? (
      <Address value={addr} />
    ) : (
      <div className="mt-2">
        <Skeleton height={30} count={2} />
        <Skeleton height={20} width={100} />
      </div>
    )}
    <div className="flex justify-center py-5">
      {addr ? (
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${addr}&size=220x220&margin=0`}
          alt={`Address: ${addr}`}
          width={220}
          height={220}
        />
      ) : (
        <Skeleton height={220} width={220} count={1} />
      )}
    </div>
  </>
);
