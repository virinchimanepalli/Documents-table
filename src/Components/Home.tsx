/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import TailwindModal from "../Reusablecomponents/Tailwindmodal";
import ThreeDots from "./ThreeDots";

import { people } from "../utils/utils";
import { addUser, logoutUser } from "../redux/slices/account";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../utils/hook";
import "./style.css";
import { useHistory } from "react-router-dom";
import { viewDoc } from "../redux/slices/document";

export interface IDocs {
  id: string;
  name: string;
  title: string;
  createdDate: string;
  email: string;
}

export default function Home() {
  const AccountDetails = useAppSelector((state) => state.account.email);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.account.login);
  const [open, setOpen] = useState(true);
  const [addUserModal, setAddUserModal] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [docs, setDocs] = useState<IDocs[]>(people);
  const [selectedDoc, setSelectedDoc] = useState<IDocs | null>(null);
  const [name, setName] = useState("");
  const [displayUsers, setDisplayUsers] = useState<IDocs[] | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [openRename, setOpenRename] = useState(false);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(people.length / usersPerPage);
  const history = useHistory();

  useEffect(() => {
    const displayedUsers = people.slice(
      pagesVisited,
      pagesVisited + usersPerPage
    );

    setDisplayUsers(displayedUsers);
    // setDocs(displayedUsers);
  }, [pageNumber]);

  useEffect(() => {
    if (isLogin) {
      return;
    }
    history.push("/");
  }, [isLogin]);

  const changePage = ({ selected }: { selected: any }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="px-4 sm:px-6 md:px-0">
        <div className="py-6">
          <div className="w-full flex-col">
            <div className="ml-auto"></div>
            <div className="ml-96">
              <div>welcome {AccountDetails ?? "no user"}</div>
              <div className="flex-row w-full">
                <button
                  type="button"
                  onClick={() => setAddUserModal(!addUserModal)}
                  className="inline-flex items-center px-6 mr-96 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 focus:outline-none  mt-4 ml-auto"
                >
                  Add User
                </button>

                <button
                  type="button"
                  onClick={() => {
                    dispatch(logoutUser());
                  }}
                  className="inline-flex items-center px-6 py-1.5 border ml-40 border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 focus:outline-none  mt-4 "
                >
                  Logout
                </button>
              </div>
              <TailwindModal open={addUserModal} setOpen={setAddUserModal}>
                <div className="flex-col flex ">
                  <div className="flex flex-row">
                    <div className="flex flex-col mr-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 mt-1 mb-1"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        autoComplete="cc-given-name"
                        className="block w-56 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 mt-1 mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        autoComplete="cc-given-name"
                        className="block w-56 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mt-1">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700 mt-2 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      autoComplete="cc-given-email"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                  </div>

                  <div className="flex flex-row justify-around mt-4">
                    <button
                      type="button"
                      className="mt-3 w-56 mr-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={() => setAddUserModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      // disabled={true}
                      className="w-56 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none  sm:col-start-2 sm:text-sm"
                      onClick={() => {
                        const AddDetails: IDocs[] = [
                          {
                            id: "4",
                            name: firstName,
                            title: "Frontend Developer",
                            createdDate: `${"5"}` + "September",
                            email: email,
                          },
                        ];

                        setDocs([...docs, ...AddDetails]);
                        setDisplayUsers([...displayUsers!, ...AddDetails]);
                        setAddUserModal(false);
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </TailwindModal>
              <TailwindModal open={openRename} setOpen={setOpenRename}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg mb-4 font-medium text-gray-700"
                  >
                    Rename Document
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="rename"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="rename"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pl-4 block w-full sm:text-sm border-gray-300 rounded-md h-10"
                      placeholder="Book #1"
                      aria-describedby="rename-description"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={name === selectedDoc?.name}
                    className="justify-center mt-5 ml-auto rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={() => {
                      if (selectedDoc) {
                        const doc = { ...selectedDoc, name };
                        const filterDoc = displayUsers?.filter(
                          (v) => v.id !== doc.id
                        );
                        const filterAllDoc = docs?.filter(
                          (v) => v.id !== doc.id
                        );
                        const arr = filterDoc?.unshift();

                        // console.log([...filterDoc!, { ...selectedDoc, name }]);
                        setDisplayUsers([
                          ...filterDoc!,
                          { ...selectedDoc, name },
                        ]);
                        // setDocs([...filterAllDoc, { ...selectedDoc, name }]);
                      }
                      setOpenRename(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </TailwindModal>
            </div>
            <div className="flex flex-col w-1/2 ml-auto mr-auto mt-10">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Last Edited
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      {isModal ? (
                        <TailwindModal open={open} setOpen={setOpen}>
                          <div className="flex flex-col">
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700 mt-1 mb-1"
                            >
                              Rename Name
                            </label>
                            <input
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="cc-given-name"
                              className="block w-56 border border-gray-300 rounded-md hover:bg-gray-600  hover:text-white shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                            />
                            <div className="flex flex-row justify-around">
                              <button
                                onClick={() => {
                                  setOpen(false);
                                }}
                                className="bg-white py-1 px-6 mt-8 text-gray-800 shadow-sm border-1 border-black"
                              >
                                cancel
                              </button>
                              <button
                                onClick={() => setOpen(false)}
                                className="bg-indigo-800  py-1 px-6 mt-8 text-white"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </TailwindModal>
                      ) : null}
                      <tbody className="bg-white divide-y divide-gray-200">
                        {displayUsers?.map((person) => (
                          <tr key={person.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {person.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {person.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {person.createdDate}
                              </div>
                            </td>

                            <td>
                              <ThreeDots
                                list={["Remove Item", "Edit Item", "View Doc"]}
                                getSelectedItem={(value: string) => {
                                  switch (value) {
                                    case "Edit Item":
                                      setSelectedDoc(person);
                                      setName(person.name);
                                      setOpenRename(true);
                                      return null;
                                    case "Remove Item":
                                      const FilteredArray = docs?.filter(
                                        (val) => val.id !== person.id
                                      );
                                      const displayUsersArray =
                                        displayUsers?.filter(
                                          (val) => val.id !== person.id
                                        );

                                      setDocs(FilteredArray);
                                      setDisplayUsers(displayUsersArray);
                                      return null;

                                    case "View Doc":
                                      const selectedItem = docs?.filter(
                                        (val) => val.id === person.id
                                      );
                                      dispatch(viewDoc(selectedItem[0]));
                                      history.push("./viewdoc");
                                  }
                                }}
                                styles="ml-8"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 mx-auto flex">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                pageRangeDisplayed={15}
                marginPagesDisplayed={15}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
