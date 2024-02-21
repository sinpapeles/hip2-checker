import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import useDebounce from 'react-use/lib/useDebounce';
import useSearchParam from 'react-use/lib/useSearchParam';
import { ResultBox } from './ResultBox';
import { Status } from './Status';
import { Token } from './Token';

function App() {
  const initialName = useSearchParam('name') || '';
  const initialToken = useSearchParam('token') || 'HNS';

  const [token, setToken] = useState(initialToken.toUpperCase());
  const [value, setValue] = useState(initialName);
  const [name, setName] = useState('');
  const [addr, setAddr] = useState('');
  const [loading, setLoading] = useState(false);

  const { refetch } = useQuery({
    queryKey: [token, name],
    queryFn: () => {
      const controller = new AbortController();
      const { signal } = controller;

      setTimeout(() => controller.abort(), 3000);

      return fetch(`/api?name=${name}&token=${token}`, { signal }).then((r) => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
      });
    },
    retry: 3,
    retryDelay: 1,
    enabled: false,
  });

  useDebounce(() => setName(value), 350, [value]);

  const loadData = async () => {
    if (!name) return;
    setLoading(true);
    try {
      const { data } = await refetch();
      setAddr(data?.addr || '');
    } finally {
      setLoading(false);
    }

    window.history.pushState({}, '', `?name=${name}&token=${token}`);
  };

  useEffect(() => {
    loadData();
  }, [name, token]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-2 sn:p-0 min-w-screen bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="w-full p-4 text-center bg-white border border-gray-400 shadow-lg rounded-xl sm:w-96 ">
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
                  setName('');
                }}
              />
              <Token value={token} onChange={setToken} />
            </div>
            <Status
              {...{
                name,
                loading,
                setValue,
                addr,
              }}
            />
            <ResultBox addr={addr} />
          </div>
        </div>
        <span className="mt-2 text-sm text-center text-gray-200 transition duration-200 ">
          Don't trust. Verify.
          <br />
          <a className="hover:text-white" href="https://sinpapeles.xyz">
            Sinpapeles
          </a>
          {' | '}
          <a
            className="hover:text-white"
            href="https://github.com/sinpapeles/hip2-checker"
          >
            Source
          </a>
          {' | '}
          <a
            className="hover:text-white"
            href="https://hub.docker.com/r/sinpapeles/hip2-checker"
          >
            Docker
          </a>
        </span>
      </div>
    </>
  );
}

export default App;
