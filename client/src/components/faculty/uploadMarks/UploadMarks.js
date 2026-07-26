import React from "react";
import Body from "./Body";
import Header from "../Header";
import Sidebar from "../Sidebar";

const UploadMarks = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Main Container - Full screen layout */}
      <div className="flex flex-col h-screen w-full overflow-hidden">

        {/* Header */}
        <Header />

        {/* Content Section */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Body */}
          <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6">
            <Body />
          </div>

        </div>
      </div>
    </div>
  );
};

export default UploadMarks;
