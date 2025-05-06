import { Outlet, Link } from "react-router";
import { useState } from "react";
import { MagnifyingGlassIcon, ArrowLeftIcon } from "@heroicons/react/16/solid";
import {
  AdjustmentsVerticalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  return (
    <main className="flex relative">
      <div className="w-full max-w-md px-6 bg-white md:bg-gray-50 h-screen">
        <header className="pt-10 pb-2">
          <h1 className="text-2xl font-bold leading-8 text-gray-800 md:font-normal">
            Rick and Morty list
          </h1>
        </header>
        <div className="py-4 md:pt-4 md:pb-16">
          <div className="flex">
            <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
              <input
                id="query"
                name="query"
                type="text"
                placeholder="Search or filter results"
                className="col-start-1 row-start-1 block w-full rounded-l-lg bg-gray-100 py-2 pr-3 pl-10 text-base font-medium leading-6 text-gray-500 outline-none -outline-offset-none placeholder:text-gray-500 placeholder:leading-6 placeholder:text-base placeholder:font-medium focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 ml-2 size-6 self-center text-gray-400 stroke-2"
              />
            </div>
            <button
              type="button"
              className="flex shrink-0 items-center gap-x-1.5 rounded-r-lg bg-gray-100 px-3 py-2.5 text-base font-semibold text-gray-900 leading-6 outline-none -outline-offset-none hover:bg-gray-50 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            >
              <AdjustmentsVerticalIcon
                aria-hidden="true"
                className="-ml-0.5 size-7 text-[#8054C7] stroke-2"
              />
            </button>
          </div>
        </div>
        <div>
          <h3 className="py-4 leading-4 text-xs font-semibold tracking-wider text-gray-500">
            STARRED CHARACTERS (2)
          </h3>
          <ul>
            <li>
              <Link
                to="character/1"
                className="group block outline-none shrink-0 py-4 border-t border-t-gray-200 cursor-pointer"
                onClick={() => {
                  setSidebarOpen(true);
                }}
              >
                <div className="flex items-center">
                  <div>
                    <img
                      alt=""
                      src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                      className="inline-block size-9 rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-base leading-6 font-semibold text-gray-900">
                      Abadango Cluster Pricess
                    </p>
                    <p className="text-base leading-6 font-normal text-gray-500">
                      Alien
                    </p>
                  </div>
                  <div className="ml-auto">
                    <HeartIcon
                      aria-hidden="true"
                      className="ml-auto size-7 text-[#63D838]"
                      style={{ fill: "#63D838" }}
                    />
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="py-4 leading-4 text-xs font-semibold tracking-wider text-gray-500">
            CHARACTERS (4)
          </h3>
          <ul>
            <li>
              <a
                href="#"
                className="group block shrink-0 py-4 border-t border-t-gray-200"
              >
                <div className="flex items-center">
                  <div>
                    <img
                      alt=""
                      src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                      className="inline-block size-9 rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-base leading-6 font-semibold text-gray-900">
                      Abadango Cluster Pricess
                    </p>
                    <p className="text-base leading-6 font-normal text-gray-500">
                      Alien
                    </p>
                  </div>
                  <div className="ml-auto">
                    <HeartIcon
                      aria-hidden="true"
                      className="ml-auto size-7 text-gray-300 stroke-2"
                    />
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden md:block w-full">
        <Outlet />
      </div>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative flex w-full flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex grow flex-col overflow-y-auto bg-white px-6">
              <div>
                <Link
                  to="/"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 my-4 p-2.5 cursor-pointer"
                >
                  <span className="sr-only">Close sidebar</span>
                  <ArrowLeftIcon
                    aria-hidden="true"
                    className="size-6 text-[#8054C7] stroke-2"
                  />
                </Link>
              </div>
              <Outlet />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </main>
  );
}
