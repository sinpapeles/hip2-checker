import Skeleton from 'react-loading-skeleton';
import { Address } from './Address';

export interface ResultBoxProps {
  addr?: string;
}
export const ResultBox = ({ addr }: ResultBoxProps) => (
  <>
    {addr ? <Address value={addr} /> : <Skeleton height={35} count={2} />}
    <div className="flex justify-center py-5">
      {addr ? (
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${addr}&size=220x220&margin=0`}
          alt={`Address: ${addr}`}
        />
      ) : (
        <Skeleton height={220} width={220} count={1} />
      )}
    </div>
  </>
);
