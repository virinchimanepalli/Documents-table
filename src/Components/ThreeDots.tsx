import React, { Fragment, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import { classNames } from "../utils/utils";

const ThreeDots = ({
  list,
  isThreeDots = true,
  styles,

  getSelectedItem,
}: {
  list: string[];

  getSelectedItem: Function;
  styles?: string | undefined;
  isThreeDots?: boolean;
}) => {
  return (
    <>
      <Menu
        as="div"
        className={classNames(
          styles !== undefined ? styles : "",
          "items-start inline-block"
        )}
      >
        <div className="mr-12">
          <Menu.Button className="bg-gray-100 flex items-center rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            <span className="sr-only">Open options</span>

            {isThreeDots ? (
              <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            )}
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
          <Menu.Items className="origin-top-right flex flex-col py-1 rounded-md absolute ml-4 mt-2  w-40 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {list.map((value) => {
              return (
                <>
                  <Menu.Item as="div" className="flex w-full">
                    {({ active }) => (
                      <div
                        onClick={() => {
                          getSelectedItem(value);
                        }}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900 w-full flex justify-start"
                            : "text-gray-700 w-full flex justify-start",

                          "block pr-4 py-1.5 text-sm px-2"
                        )}
                      >
                        {value}
                      </div>
                    )}
                  </Menu.Item>
                </>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default ThreeDots;
