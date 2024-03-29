import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useState } from 'react';

interface Props {
  isOpen: boolean;
  closeModal: (token?: string) => void;
}
export const AddToken: FC<Props> = ({ isOpen, closeModal }) => {
  const [value, setValue] = useState('');

  const addToken = () => {
    return closeModal(value);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => closeModal()}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <form onSubmit={addToken}>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Token
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full px-2 py-2 border border-gray-400 rounded"
                    value={value}
                    onChange={(e) => setValue(e.target.value.toUpperCase())}
                  />
                </div>

                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    type="button"
                    onClick={() => closeModal()}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
