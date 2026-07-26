import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell, Send, Calendar, FileText, Users, GraduationCap, AlertCircle } from "lucide-react";
import { createNotice } from "../../../redux/actions/adminActions";
import { CREATE_NOTICE, SET_ERRORS } from "../../../redux/actionTypes";
import AdminPageHeader from "../common/AdminPageHeader";
import AdminPageCard from "../common/AdminPageCard";
import AdminFormActions from "../common/AdminFormActions";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    date: "",
    noticeFor: "",
    topic: "",
    content: "",
    from: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ date: "", noticeFor: "", topic: "", content: "", from: "" });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(createNotice(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.noticeCreated) {
      setLoading(false);
      if (store.admin.noticeCreated) {
        setValue({ date: "", noticeFor: "", topic: "", content: "", from: "" });
        dispatch({ type: CREATE_NOTICE, payload: false });
        dispatch({ type: SET_ERRORS, payload: {} });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.noticeCreated]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const handleClear = () => {
    setValue({ date: "", noticeFor: "", topic: "", content: "", from: "" });
    setError({});
  };

  const fieldClass = `${classes.adminInput}`;

  return (
    <div className="space-y-6 max-w-3xl">
      <AdminPageHeader
        icon={Bell}
        badge="Communication"
        title="Create Notice"
        description="Publish an announcement to students, faculty, or the entire campus."
      />

      <AdminPageCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={classes.adminForm3}>
              <label className={`${classes.adminLabel} flex items-center gap-1.5`}>
                <Calendar size={13} /> Date
              </label>
              <input required className={fieldClass} type="date" value={value.date} onChange={(e) => setValue({ ...value, date: e.target.value })} />
            </div>
            <div className={classes.adminForm3}>
              <label className={`${classes.adminLabel} flex items-center gap-1.5`}>
                <FileText size={13} /> Topic
              </label>
              <input required placeholder="Enter notice topic" className={fieldClass} type="text" value={value.topic} onChange={(e) => setValue({ ...value, topic: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={classes.adminForm3}>
              <label className={`${classes.adminLabel} flex items-center gap-1.5`}>
                <Users size={13} /> Notice For
              </label>
              <select required className={fieldClass} value={value.noticeFor} onChange={(e) => setValue({ ...value, noticeFor: e.target.value })}>
                <option value="">Select audience</option>
                <option value="all">All</option>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
              </select>
            </div>
            <div className={classes.adminForm3}>
              <label className={`${classes.adminLabel} flex items-center gap-1.5`}>
                <GraduationCap size={13} /> From
              </label>
              <input required placeholder="Sender name" className={fieldClass} type="text" value={value.from} onChange={(e) => setValue({ ...value, from: e.target.value })} />
            </div>
          </div>

          <div className={classes.adminForm3}>
            <label className={`${classes.adminLabel} flex items-center gap-1.5`}>
              <Bell size={13} /> Content
            </label>
            <textarea
              rows={6}
              required
              placeholder="Write your notice content here..."
              className={`${fieldClass} resize-none`}
              value={value.content}
              onChange={(e) => setValue({ ...value, content: e.target.value })}
            />
          </div>

          {(error.noticeError || error.backendError) && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              <AlertCircle size={16} />
              <span>{error.noticeError || error.backendError}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#5B4B8A] hover:bg-[#4A3A7A] disabled:opacity-50 transition-colors"
            >
              <Send size={16} />
              {loading ? "Publishing..." : "Publish Notice"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-[#5B4B8A] bg-[#F3F0FA] border border-[#E5E7EB] hover:bg-[#E8E0F5] disabled:opacity-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      </AdminPageCard>
    </div>
  );
};

export default Body;
