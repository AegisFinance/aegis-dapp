import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export function Disclaimer() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-slate-300	 w-full max-w-md transform overflow-hidden rounded-2xl  p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className=" font-serif text-lg font-medium leading-6 text-gray-900"
                  >
                    Disclaimer
                  </Dialog.Title>
                  <div className="mt-2">
                    <ul>
                      <li>
                        <p className="font-serif text-sm text-gray-500">
                          <b>Beta Application:</b> Aegis Finance is currently in beta
                          testing. This means that it is still under development
                          and may contain bugs or errors. We are working hard to
                          improve the application and fix any issues that arise.
                          Please use the application at your own risk and be
                          sure to report any bugs or errors to us.
                        </p>
                      </li>
                      <br />
                      {/* <li>
                        <p className="font-serif text-sm text-gray-500">
                          <b>Eligibility:</b> InheritX is only available to
                          French citizens or people who have an INSEE number. If
                          you are not a French citizen or do not have an INSEE
                          number, you will not be able to use the application.
                          We apologize for any inconvenience this may cause.
                        </p>
                      </li> */}
                    </ul>
                  </div>

                  <div className="bg-slate-300 mt-4">
                    <button
                      type="button"
                      className=" bg-slate-400 inline-flex justify-center rounded-md border border-transparent text-slate-700 px-4 py-2 text-sm font-medium  hover:bg-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
