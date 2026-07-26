import React, { useEffect, useState, useRef } from "react";
import { UserPlus, CloudUpload, X, Check, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addStudent } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_STUDENT, SET_ERRORS } from "../../../redux/actionTypes";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { motion, AnimatePresence } from "framer-motion";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const errorRef = useRef();

  const [value, setValue] = useState({
    name: "",
    dob: "",
    email: "",
    department: "",
    contactNumber: "",
    avatar: "",
    batch: "",
    gender: "",
    year: "",
    fatherName: "",
    motherName: "",
    section: "",
    fatherContactNumber: "",
    motherContactNumber: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      errorRef.current?.scrollIntoView({ behavior: "smooth" });
      setValue({ ...value, email: "" });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addStudent(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.studentAdded) {
      setLoading(false);
      if (store.admin.studentAdded) {
        setValue({
          name: "",
          dob: "",
          email: "",
          department: "",
          contactNumber: "",
          avatar: "",
          batch: "",
          gender: "",
          year: "",
          fatherName: "",
          motherName: "",
          section: "",
          fatherContactNumber: "",
          motherContactNumber: "",
        });

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_STUDENT, payload: false });
      }
    }
  }, [store.errors, store.admin.studentAdded, dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  const handleInputChange = (field, val) => {
    setValue({ ...value, [field]: val });
    if (error[field]) {
      const newErrors = { ...error };
      delete newErrors[field];
      setError(newErrors);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.2em] mb-1">Registry Management</h2>
          <h1 className="text-3xl font-black text-primary tracking-tight">
            Add New Student
          </h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100 font-bold text-xs uppercase tracking-widest text-primary/60">
          <UserPlus className="w-4 h-4 text-accent" />
          Enrolling Entry
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Section 1: Identity & Photo */}
          <div className="lg:col-span-1 space-y-8">
            <Card title="Student Identity" subtitle="Primary documentation and photo">
              <div className="space-y-6 mt-6">
                <div className="relative group">
                   <div className="aspect-square w-full rounded-2xl bg-surface border-2 border-dashed border-primary/5 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-accent/40">
                      {value.avatar ? (
                        <img src={value.avatar} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-6">
                           <CloudUpload className="mx-auto text-primary/10 mb-2" size={40} />
                           <p className="text-[10px] font-black text-primary/20 uppercase tracking-widest">Upload Profile Photo</p>
                        </div>
                      )}
                   </div>
                   <div className="mt-4">
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => handleInputChange("avatar", base64)}
                      />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="col-span-2">
                      <Input 
                        label="Full Legal Name" 
                        placeholder="John Doe" 
                        required 
                        value={value.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                   </div>
                   <Input 
                      label="Date of Birth" 
                      type="date" 
                      required 
                      value={value.dob}
                      onChange={(e) => handleInputChange("dob", e.target.value)}
                   />
                   <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.2em] mb-1">Gender</label>
                      <Select
                        required
                        displayEmpty
                        className="rounded-xl bg-white text-sm font-bold border-none shadow-sm"
                        sx={{ borderRadius: '12px', bgcolor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f1f5f9' } }}
                        value={value.gender}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                      >
                        <MenuItem value="" disabled><span className="text-primary/20">Select Gender</span></MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                   </div>
                </div>
              </div>
            </Card>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/5">
              <p className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em] leading-relaxed">
                Ensure all identity details match the student's legal documentation before submission.
              </p>
            </div>
          </div>

          {/* Section 2: Academic & Contact */}
          <div className="lg:col-span-2 space-y-8">
            <Card title="Academic Registry" subtitle="Department and enrollment details">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Input 
                    label="Official Email" 
                    type="email" 
                    placeholder="student@college.edu" 
                    required 
                    value={value.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.2em] mb-1">Department</label>
                      <Select
                        required
                        displayEmpty
                        className="rounded-xl bg-white text-sm font-bold border-none shadow-sm"
                        sx={{ borderRadius: '12px', bgcolor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f1f5f9' } }}
                        value={value.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                      >
                        <MenuItem value="" disabled><span className="text-primary/20">Select Department</span></MenuItem>
                        {departments?.map((dp, idx) => (
                          <MenuItem key={idx} value={dp.department}>{dp.department}</MenuItem>
                        ))}
                      </Select>
                  </div>
                  <Input 
                    label="Academic Batch" 
                    placeholder="2023-2027" 
                    required 
                    value={value.batch}
                    onChange={(e) => handleInputChange("batch", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.2em] mb-1">Year</label>
                        <Select
                          required
                          displayEmpty
                          sx={{ borderRadius: '12px', bgcolor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f1f5f9' } }}
                          value={value.year}
                          onChange={(e) => handleInputChange("year", e.target.value)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {["1", "2", "3", "4"].map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                        </Select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-extrabold text-primary/30 uppercase tracking-[0.2em] mb-1">Section</label>
                        <Select
                          required
                          displayEmpty
                          sx={{ borderRadius: '12px', bgcolor: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f1f5f9' } }}
                          value={value.section}
                          onChange={(e) => handleInputChange("section", e.target.value)}
                        >
                          <MenuItem value="">None</MenuItem>
                          {["1", "2", "3"].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                        </Select>
                    </div>
                  </div>
                  <Input 
                    label="Primary Contact" 
                    type="number" 
                    placeholder="9998887770" 
                    required 
                    value={value.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                  />
               </div>
            </Card>

            <Card title="Guardian Information" subtitle="Emergency and parental contact records">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Input 
                    label="Father's Name" 
                    placeholder="Full Name" 
                    required 
                    value={value.fatherName}
                    onChange={(e) => handleInputChange("fatherName", e.target.value)}
                  />
                  <Input 
                    label="Mother's Name" 
                    placeholder="Full Name" 
                    required 
                    value={value.motherName}
                    onChange={(e) => handleInputChange("motherName", e.target.value)}
                  />
                  <Input 
                    label="Father's Contact" 
                    type="number" 
                    required 
                    value={value.fatherContactNumber}
                    onChange={(e) => handleInputChange("fatherContactNumber", e.target.value)}
                  />
                  <Input 
                    label="Mother's Contact" 
                    type="number" 
                    required 
                    value={value.motherContactNumber}
                    onChange={(e) => handleInputChange("motherContactNumber", e.target.value)}
                  />
               </div>
            </Card>

            <div className="flex items-center justify-end gap-4 p-4">
               <button 
                  type="button"
                  onClick={() => {
                    setValue({
                      name: "", dob: "", email: "", department: "", contactNumber: "", avatar: "", batch: "", gender: "", year: "", fatherName: "", motherName: "", section: "", fatherContactNumber: "", motherContactNumber: "",
                    });
                    setError({});
                  }}
                  className="px-6 py-3 text-sm font-bold text-primary/20 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <X size={18} /> Clear Form
               </button>
               <Button 
                type="submit" 
                isLoading={loading}
                icon={Check}
                className="px-10 h-14 rounded-2xl shadow-xl shadow-primary/10"
               >
                 Register Student
               </Button>
            </div>
            
            <div ref={errorRef} className="flex justify-center">
              <AnimatePresence>
                {(error.emailError || error.backendError) && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 font-bold bg-red-50 px-4 py-2 rounded-lg border border-red-100 text-xs"
                  >
                    {error.emailError || error.backendError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default Body;
