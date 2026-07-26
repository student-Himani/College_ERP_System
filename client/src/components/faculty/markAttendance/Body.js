import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudent,
  markAttendance,
} from "../../../redux/actions/facultyActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { ATTENDANCE_MARKED, SET_ERRORS } from "../../../redux/actionTypes";
import { getTest } from "../../../redux/actions/facultyActions";
import { getSubject } from "../../../redux/actions/adminActions";
const Body = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const facultyDept = user?.faculty?.department || user?.result?.department;
  const departments = useSelector((state) => state.admin.allDepartment);

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [subjectName, setSubjectName] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);

  const [value, setValue] = useState({
    department: "",
    year: "",
    section: "",
  });
  const [search, setSearch] = useState(false);

  // normalize student state from API payload in both admin/faculty paths
  const studentState = useSelector((state) => state.admin.students);
  const students = studentState?.result || studentState || [];

  const subjects = useSelector((state) => state.admin.subjects?.result || []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (facultyDept && !value.department) {
      setValue((prev) => ({ ...prev, department: facultyDept }));
    }
  }, [facultyDept, value.department]);

  const handleInputChange = (e) => {
    const id = e.target.value;
    if (e.target.checked) {
      setCheckedValue((prev) => [...prev, id]);
    } else {
      setCheckedValue((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    setCheckedValue([]);
    dispatch(getStudent({
      department: value.department,
      year: Number(value.year),
      section: value.section,
    }));
    dispatch(getSubject({ department: value.department, year: Number(value.year) }));
  };
  const uploadAttendance = (e) => {
    setError({});
    dispatch(
      markAttendance(
        checkedValue,
        subjectName,
        value.department,
        value.year,
        value.section
      )
    );
  };

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0 || store.faculty.attendanceUploaded) {
      setLoading(false);
      if (store.faculty.attendanceUploaded) {
        setValue({ department: "", year: "", section: "" });
        setSearch(false);
        setSubjectName("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ATTENDANCE_MARKED, payload: false });
      }
    }
  }, [store.errors, store.faculty.attendanceUploaded]);

  useEffect(() => {
    if (store.faculty.attendanceUploaded) {
      setValue({ department: "", year: "", section: "" });
    }
  }, [store.faculty.attendanceUploaded]);

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400">
          <BoyIcon />
          <h1>All Students</h1>
        </div>
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]">
          <form
            className="flex flex-col col-span-1 space-y-2"
            onSubmit={handleSubmit}>
            <label htmlFor="department">Department</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.department}
              onChange={(e) =>
                setValue({ ...value, department: e.target.value })
              }>
              <MenuItem value="">None</MenuItem>
              {departments?.filter(dp => dp.department === facultyDept).map((dp, idx) => (
                <MenuItem key={idx} value={dp.department}>
                  {dp.department}
                </MenuItem>
              ))}
            </Select>
            <label htmlFor="year">Year</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.year}
              onChange={(e) => setValue({ ...value, year: e.target.value })}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
            <label htmlFor="section">Section</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.section}
              onChange={(e) => setValue({ ...value, section: e.target.value })}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>

            <button
              className={`${classes.adminFormSubmitButton} w-56`}
              type="submit">
              Search
            </button>
          </form>
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
              {(error.noStudentError || error.backendError) && (
                <p className="text-2xl font-bold text-red-500">
                  {error.noStudentError || error.backendError}
                </p>
              )}
            </div>
            {search &&
              !loading &&
              Object.keys(error).length === 0 &&
              students?.length !== 0 && (
                <div className={`${classes.adminData} h-[20rem]`}>
                  <div className="grid grid-cols-7">
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Select
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Sr no.
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                      Name
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                      Username
                    </h1>

                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Section
                    </h1>
                  </div>
                  {students?.map((stu, idx) => (
                    <div
                      key={idx}
                      className={`${classes.adminDataBody} grid-cols-7`}>
                      <input
                        onChange={handleInputChange}
                        value={stu._id}
                        className="w-16 h-4 col-span-1 px-2 mt-3 border-2 "
                        type="checkbox"
                      />
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {idx + 1}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {stu.name}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {stu.username}
                      </h1>

                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {stu.section}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
            {search && Object.keys(error).length === 0 && (
              <div className="flex items-center justify-center mt-5 space-x-3">
                <label className="text-lg font-bold">Subject</label>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36, width: 224 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}>
                  <MenuItem value="">None</MenuItem>
                  {subjects?.map((dp, idx) => (
                    <MenuItem key={idx} value={dp.subjectName}>
                      {dp.subjectName}
                    </MenuItem>
                  ))}
                </Select>
                <button
                  onClick={uploadAttendance}
                  className={`${classes.adminFormSubmitButton}`}>
                  Mark
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
