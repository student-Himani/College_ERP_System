import React, { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment } from "../../../redux/actions/adminActions";
import Spinner from "../../../utils/Spinner";
import { ADD_DEPARTMENT, SET_ERRORS } from "../../../redux/actionTypes";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminPageCard from "../common/AdminPageCard";
import AdminFormActions from "../common/AdminFormActions";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addDepartment({ department }));
    setDepartment("");
  };

  useEffect(() => {
    if (store.errors || store.admin.departmentAdded) {
      setLoading(false);
      if (store.admin.departmentAdded) {
        setDepartment("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_DEPARTMENT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.departmentAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={Building2}
        badge="Academic"
        title="Add Department"
        description="Create a new academic department in the system."
      />

      <AdminPageCard>
        <form onSubmit={handleSubmit}>
          <div className="max-w-md">
            <div className={classes.adminForm3}>
              <label className={classes.adminLabel}>Department Name</label>
              <input
                placeholder="e.g. Computer Science"
                required
                className={classes.adminInput}
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          </div>

          <AdminFormActions onClear={() => setDepartment("")} submitLabel="Add Department" />

          <div className={classes.loadingAndError}>
            {loading && (
              <Spinner message="Adding Department" height={30} width={150} color="#5B4B8A" messageColor="#5B4B8A" />
            )}
            {(error.departmentError || error.backendError) && (
              <p className="text-red-600">{error.departmentError || error.backendError}</p>
            )}
          </div>
        </form>
      </AdminPageCard>
    </div>
  );
};

export default Body;
