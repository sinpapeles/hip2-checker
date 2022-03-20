import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { FC, Fragment, useState } from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { AddToken } from './AddToken';

interface Props {
  value: string;
  onChange: (value: string) => void;
}
export const Token: FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [tokens, setTokens] = useLocalStorage('tokens', ['BTC', 'ETH', 'HNS']);

  const onClose = (token?: string) => {
    if (token && tokens) {
      onChange(token);
      if (!tokens.includes(token)) {
        setTokens([...tokens, token].sort());
      }
    }
    setOpen(false);
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left shadow">
        <div>
          <Menu.Button className="flex items-center px-3 py-3 border border-l-0 border-gray-400 rounded-r outline-none focus:outline-none">
            {value}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-20 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {tokens!.map((token) => (
                <Menu.Item key={token}>
                  <button
                    onClick={() => onChange(token)}
                    className={`${
                      token === value
                        ? 'bg-violet-500 text-white hover:bg-violet-600'
                        : 'text-gray-900 hover:bg-violet-200 '
                    } group w-full flex rounded-md justify-center px-2 py-2 text-sm duration-200 transition`}
                  >
                    {token}
                  </button>
                </Menu.Item>
              ))}
              <Menu.Item>
                <div className="border-t border-gray-200">
                  <button
                    onClick={() => setOpen(true)}
                    className={`text-gray-900 hover:bg-violet-300 w-full flex rounded-md justify-center px-2 py-2 text-sm duration-200 transition`}
                  >
                    Add
                  </button>
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <AddToken isOpen={open} closeModal={onClose} />
    </>
  );
};
