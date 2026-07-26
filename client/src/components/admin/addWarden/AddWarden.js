import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircle } from "lucide-react";
import { addWarden } from "../../../redux/actions/adminActions";
import { SET_ERRORS } from "../../../redux/actionTypes";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminPageCard from "../common/AdminPageCard";
import AdminFormActions from "../common/AdminFormActions";
import * as classes from "../../../utils/styles";

const AddWarden = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [joiningYear, setJoiningYear] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
  }, [store.errors]);

  const clearForm = () => {
    setName("");
    setEmail("");
    setJoiningYear("");
    setContactNumber("");
    setDob("");
    setGender("");
    setHostelName("");
    setError({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    dispatch(
      addWarden({
        name,
        email,
        joiningYear,
        contactNumber,
        dob,
        gender,
        hostelName,
      })
    );
  };

  useEffect(() => {
    if (store.errors || store.admin.adminAdded) {
      setError(store.errors);
      if (store.admin.adminAdded) {
        clearForm();
        dispatch({ type: SET_ERRORS, payload: {} });
      }
    }
  }, [store.errors, store.admin.adminAdded]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={PlusCircle}
        badge="Hostel"
        title="Add Warden"
        description="Register a new warden and assign them to a hostel."
      />

      <AdminPageCard>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={classes.adminForm3}>
              <label className={classes.adminLabel}>Name</label>
              <input type="text" className={classes.adminInput} value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className={classes.adminForm3}>
              <label className={classes.adminLabel}>Email</label>
              <input type="email" className={classes.adminInput} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className={classes.adminForm3}>
              <label className={classes.adminLabel}>Hostel Name</label>
              <input type="text" className={classes.adminInput} value={hostelName} onChange={(e) => setHostelName(e.target.value)} required />
            </div>
            <div className={classes.adminForm3}>
              <label className={classes.adminLabel}>Joining Year</label>
              <input type="number" className={classes.adminInput} value={joiningYear} onChange={(e) => setJoiningYear(e.target.value)} required />
            </div>
            <div className={classes.adminForm3}>
              <label className={classes.adminLabel}>Gender</label>
              <select className={classes.adminInput} value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={classes.adminForm3}>
              <label className={classes.adminLabel}>Contact Number</label>
              <input type="text" className={classes.adminInput} value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
            </div>
            <div className={classes.adminForm3}>
              <label className={classes.adminLabel}>Date of Birth</label>
              <input type="date" className={classes.adminInput} value={dob} onChange={(e) => setDob(e.target.value)} required />
            </div>
          </div>

          {error.emailError && (
            <p className="text-sm text-red-600 mt-4">{error.emailError}</p>
          )}

          <AdminFormActions onClear={clearForm} submitLabel="Add Warden" />
        </form>
      </AdminPageCard>
    </div>
  );
};

export default AddWarden;
