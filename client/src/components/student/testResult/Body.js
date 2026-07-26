import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  // Safely extract test result from state (handling both nested object or direct array)
  const testResultState = useSelector((state) => state.student.testResult);
  const testResult = testResultState?.result || testResultState || [];

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (testResult !== undefined || Object.keys(error).length !== 0) {
      setLoading(false);
    }
  }, [testResult, error]);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <MenuBookIcon />
          <h1>All Test Results</h1>
        </div>
        <div className=" mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem] overflow-y-auto">
          <div className="col-span-3 mr-6">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {error.notestError && (
                <p className="text-2xl font-bold text-red-500">
                  {error.notestError}
                </p>
              )}
            </div>
            {!loading && Object.keys(error).length === 0 && (
              testResult && testResult.length > 0 ? (
                <div className={classes.adminData}>
                  <div className="grid grid-cols-8">
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Sr no.
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Subject Code
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      Subject Name
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      Test
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Marks Obtained
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Total Marks
                    </h1>
                  </div>
                  {testResult?.map((res, idx) => (
                    <div
                      key={idx}
                      className={`${classes.adminDataBody} grid-cols-8`}>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {idx + 1}
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {res.subjectCode || "N/A"}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {res.subjectName || res.subjectCode || "N/A"}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {res.test || "N/A"}
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {res.marks === -1 ? "Pending" : res.marks}
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {res.totalMarks}
                      </h1>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xl font-bold mt-5 text-gray-500">No Data Available</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
