import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getFaculty } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { SET_ERRORS } from "../../../redux/actionTypes";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminPageCard from "../common/AdminPageCard";
import { muiSelectSx } from "../common/adminTheme";

const Body = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [error, setError] = useState({});
  const departments = useSelector((state) => state.admin.allDepartment);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getFaculty({ department }));
  };

  const faculties = useSelector((state) => state.admin.faculties.result);

  useEffect(() => {
    if (faculties?.length !== 0) {
      setLoading(false);
    }
  }, [faculties]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={Users}
        badge="Faculty"
        title="Our Faculty"
        description="Search and view faculty members by department."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <AdminPageCard className="lg:col-span-1 h-fit">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className={classes.adminForm3}>
              <label className={classes.adminLabel}>Department</label>
              <Select
                required
                displayEmpty
                fullWidth
                sx={muiSelectSx}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="">Select department</MenuItem>
                {departments?.map((dp, idx) => (
                  <MenuItem key={idx} value={dp.department}>
                    {dp.department}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <button className={`${classes.adminFormSubmitButton} w-full`} type="submit">
              Search
            </button>
          </form>
        </AdminPageCard>

        <AdminPageCard className="lg:col-span-3">
          <div className={classes.loadingAndError}>
            {loading && (
              <Spinner message="Loading" height={50} width={150} color="#5B4B8A" messageColor="#5B4B8A" />
            )}
            {(error.noFacultyError || error.backendError) && (
              <p className="text-red-600 font-medium">{error.noFacultyError || error.backendError}</p>
            )}
          </div>

          {search && !loading && Object.keys(error).length === 0 && faculties?.length !== 0 && (
            <div className={classes.adminData}>
              <div className="grid grid-cols-12 bg-[#F8FAFC] sticky top-0">
                <h1 className={`${classes.adminDataHeading} col-span-1`}>#</h1>
                <h1 className={`${classes.adminDataHeading} col-span-3`}>Name</h1>
                <h1 className={`${classes.adminDataHeading} col-span-2`}>Username</h1>
                <h1 className={`${classes.adminDataHeading} col-span-3`}>Email</h1>
                <h1 className={`${classes.adminDataHeading} col-span-3`}>Designation</h1>
              </div>
              {faculties?.map((fac, idx) => (
                <div key={idx} className={`${classes.adminDataBody} grid-cols-12`}>
                  <span className={`${classes.adminDataBodyFields} col-span-1 font-medium text-[#6B7280]`}>{idx + 1}</span>
                  <span className={`col-span-3 ${classes.adminDataBodyFields}`}>{fac.name}</span>
                  <span className={`col-span-2 ${classes.adminDataBodyFields}`}>{fac.username}</span>
                  <span className={`col-span-3 ${classes.adminDataBodyFields}`}>{fac.email}</span>
                  <span className={`col-span-3 ${classes.adminDataBodyFields}`}>{fac.designation}</span>
                </div>
              ))}
            </div>
          )}
        </AdminPageCard>
      </div>
    </div>
  );
};

export default Body;
