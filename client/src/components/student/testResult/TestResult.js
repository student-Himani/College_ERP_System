import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTestResult } from "../../../redux/actions/studentActions";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Body from "./Body";

const TestResult = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.result) {
      dispatch(
        getTestResult(
          user.result.department,
          user.result.year,
          user.result.section
        )
      );
    }
  }, [dispatch, user]);

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

export default TestResult;
