import React from "react";
import { useAppSelector } from "../utils/hook";
import { useHistory } from "react-router-dom";

const ViewDoc = () => {
  const selectedDoc = useAppSelector((state) => state.document);
  const history = useHistory();

  console.log(selectedDoc);
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <div
          className="shadow sm:rounded-md sm:overflow-hidden mx-auto mt-8"
          style={{ width: "40%" }}
        >
          <div className="bg-white py-6 px-4 sm:p-6">
            <div>
              <h2
                id="payment-details-heading"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                View Documents
              </h2>
            </div>
          </div>

          <div className="flex flex-col pl-8">
            <div className="flex flex-row justify-start">
              <div className="text-xl font-bold mr-4">Name:</div>
              <div className="text-xl ">{selectedDoc.name}</div>
            </div>
            <div className="flex flex-row justify-start">
              <div className="text-xl font-bold mr-4">Email:</div>
              <div className="text-xl ">{selectedDoc.email}</div>
            </div>
            <div className="flex flex-row justify-start">
              <div className="text-xl font-bold mr-4">Title:</div>
              <div className="text-xl ">{selectedDoc.title}</div>
            </div>
            <div className="flex flex-row justify-start">
              <div className="text-xl font-bold mr-4">Created Date:</div>
              <div className="text-xl ">{selectedDoc.createdDate}</div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              onClick={() => history.push("/home")}
              className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDoc;
