import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin, deleteAdmin } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { DELETE_ADMIN, SET_ERRORS } from "../../../redux/actionTypes";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminPageCard from "../common/AdminPageCard";
import { muiSelectSx } from "../common/adminTheme";

const Body = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.admin.allDepartment);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [checkedValue, setCheckedValue] = useState([]);

  const [value, setValue] = useState({
    department: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleInputChange = (e) => {
    const tempCheck = checkedValue;
    let index;
    if (e.target.checked) {
      tempCheck.push(e.target.value);
    } else {
      index = tempCheck.indexOf(e.target.value);
      tempCheck.splice(index, 1);
    }
    setCheckedValue(tempCheck);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getAdmin(value));
  };
  const students = useSelector((state) => state.admin.students.result);

  const dltAdmin = (e) => {
    setError({});
    setLoading(true);
    dispatch(deleteAdmin(checkedValue));
  };

  useEffect(() => {
    if (store.admin.adminDeleted) {
      setValue({ department: "", year: "" });
      setLoading(false);
      setSearch(false);
      dispatch({ type: DELETE_ADMIN, payload: false });
    }
  }, [store.admin.adminDeleted]);

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={Trash2}
        badge="Administration"
        title="Delete Admin"
        description="Search by department and remove administrator accounts."
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
                value={value.department}
                onChange={(e) => setValue({ ...value, department: e.target.value })}
              >
                <MenuItem value="">Select department</MenuItem>
                {departments?.map((dp, idx) => (
                  <MenuItem key={idx} value={dp.department}>{dp.department}</MenuItem>
                ))}
              </Select>
            </div>
            <button className={`${classes.adminFormSubmitButton} w-full`} type="submit">Search</button>
          </form>
        </AdminPageCard>

        <AdminPageCard className="lg:col-span-3">
          <div className={classes.loadingAndError}>
            {loading && <Spinner message="Loading" height={50} width={150} color="#5B4B8A" messageColor="#5B4B8A" />}
            {(error.noAdminError || error.backendError) && (
              <p className="text-red-600 font-medium">{error.noAdminError || error.backendError}</p>
            )}
          </div>
          {search && !loading && Object.keys(error).length === 0 && students?.length !== 0 && (
            <>
              <div className={`${classes.adminData} h-[20rem]`}>
                <div className="grid grid-cols-8 bg-[#F8FAFC] sticky top-0">
                  <h1 className={`col-span-1 ${classes.adminDataHeading}`}>Select</h1>
                  <h1 className={`col-span-1 ${classes.adminDataHeading}`}>#</h1>
                  <h1 className={`col-span-2 ${classes.adminDataHeading}`}>Name</h1>
                  <h1 className={`col-span-2 ${classes.adminDataHeading}`}>Username</h1>
                  <h1 className={`col-span-2 ${classes.adminDataHeading}`}>Email</h1>
                </div>
                {students?.map((adm, idx) => (
                  <div key={idx} className={`${classes.adminDataBody} grid-cols-8`}>
                    <input
                      onChange={handleInputChange}
                      value={adm._id}
                      className="col-span-1 w-4 h-4 mt-1 accent-[#5B4B8A]"
                      type="checkbox"
                    />
                    <span className={`col-span-1 ${classes.adminDataBodyFields}`}>{idx + 1}</span>
                    <span className={`col-span-2 ${classes.adminDataBodyFields}`}>{adm.name}</span>
                    <span className={`col-span-2 ${classes.adminDataBodyFields}`}>{adm.username}</span>
                    <span className={`col-span-2 ${classes.adminDataBodyFields}`}>{adm.email}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <button onClick={dltAdmin} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors" type="button">
                  Delete Selected
                </button>
              </div>
            </>
          )}
        </AdminPageCard>
      </div>
    </div>
  );
};

export default Body;
