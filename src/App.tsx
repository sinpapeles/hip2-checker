import { useEffect, useState, FC } from 'react';
import { useQueryClient } from 'react-query';
import useDebounce from 'react-use/lib/useDebounce';
import useSearchParam from 'react-use/lib/useSearchParam';
import { Address } from './Address';
import { Status } from './Status';
import { Token } from './Token';

function App() {
  const initalName = useSearchParam('name') || '';
  const initalToken = useSearchParam('token') || 'HNS';

  const [token, setToken] = useState(initalToken.toUpperCase());
  const [value, setValue] = useState(initalName);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [addr, setAddr] = useState('');

  useDebounce(() => setName(value), 350, [value]);

  const loadData = async () =>
    queryClient.fetchQuery(['hip2', name, token], () =>
      Promise.resolve()
        .then(() => {
          setLoading(true);
          history.pushState({ name, token }, '', `?name=${name}&token=${token}`);
        })
        .then(() => fetch(`/api?name=${name}&token=${token}`))
        .then((r) => r.json())
        .then((r) => setAddr(r.addr))
        .finally(() => setLoading(false))
    );

  useEffect(() => {
    if (name) loadData();
  }, [name, token]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="p-4 text-center bg-white border border-gray-400 shadow-lg rounded-xl w-96 ">
          <div className="mb-3 text-3xl font-bold">HIP2 Checker</div>
          <div>
            <div className="flex ">
              <input
                type="text"
                className="w-full p-2 text-center border border-gray-400 rounded-l shadow"
                placeholder="Domain"
                value={value}
                onChange={({ currentTarget }) => {
                  setValue(currentTarget.value);
                  setAddr('');
                }}
              />
              <Token value={token} onChange={setToken} />
            </div>
            <Status {...{ name, loading, setValue, addr }} />
            {addr && (
              <>
                <Address value={addr} />
                <div className="flex justify-center py-5">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${addr}&size=220x220&margin=0`}
                    alt=""
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <span className="mt-2 text-sm text-center text-gray-400 transition duration-200 hover:text-gray-200">
          Don't trust. Verify.
          <br />
          <a href="https://sinpapeles.xyz">Sinpapeles</a>
          {' | '}
          <a href="https://github.com/sinpapeles/hip2-checker">Source</a>
        </span>
      </div>
    </>
  );
}

export default App;
