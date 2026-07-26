import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { facultySignIn } from "../../../redux/actions/facultyActions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../utils/Spinner";
import { Briefcase, ArrowLeft } from "lucide-react";

const FacultyLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(facultySignIn({ username: username, password: password }, navigate));
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 selection:bg-[#6366F1]/20 font-['Inter'] relative overflow-hidden transition-colors duration-500 bg-[#F7F8FC] dark:bg-[#0F172A]">
      
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#6366F1]/10 to-[#818CF8]/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#EEF2FF]/50 to-[#6366F1]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      
      <svg className="absolute inset-0 w-full h-full text-[#6366F1]/[0.04] dark:text-[#818CF8]/[0.04] pointer-events-none" fill="currentColor">
        <pattern id="campusGridFaculty" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#campusGridFaculty)" />
      </svg>

      <header className="fixed top-8 left-8">
        <button 
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md hover:scale-105 transition-all"
        >
          <ArrowLeft size={18} className="text-[#1E293B] dark:text-white group-hover:text-[#6366F1]" />
          <span className="text-xs font-extrabold text-[#1E293B] dark:text-white uppercase tracking-wider">Back to Portal</span>
        </button>
      </header>

      <div className="w-full max-w-[440px] bg-white/95 dark:bg-[#1E293B]/95 backdrop-blur-2xl border border-[#E2E8F0] dark:border-[#334155] rounded-[36px] p-8 sm:p-10 shadow-2xl shadow-[#6366F1]/8 relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] text-[#818CF8] flex items-center justify-center mb-4 shadow-sm">
            <Briefcase className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black text-[#1E293B] dark:text-white tracking-tight mb-1">Faculty Sign In</h1>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium">Enter faculty credentials to manage classes & marks</p>
        </div>

        <form onSubmit={login} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-[#1E293B] dark:text-white">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Faculty Username"
              className="w-full h-13 px-4 py-3 rounded-2xl bg-[#F1F5F9] dark:bg-[#0F172A]/60 border border-[#E2E8F0] dark:border-[#334155] text-sm font-semibold text-[#1E293B] dark:text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-all"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-[#1E293B] dark:text-white">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-13 pl-4 pr-12 py-3 rounded-2xl bg-[#F1F5F9] dark:bg-[#0F172A]/60 border border-[#E2E8F0] dark:border-[#334155] text-sm font-semibold text-[#1E293B] dark:text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-all"
              />
              <div 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-[#94A3B8] cursor-pointer hover:text-[#6366F1]"
              >
                {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 mt-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#6366F1] to-[#818CF8] hover:from-[#4F46E5] hover:to-[#6366F1] shadow-xl shadow-[#6366F1]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Spinner message="Logging In" height={20} width={20} color="#ffffff" messageColor="#fff" /> : "Get Started"}
          </button>

          {(error.usernameError || error.passwordError) && (
            <p className="text-xs font-bold text-red-500 text-center mt-2">
              {error.usernameError || error.passwordError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FacultyLogin;
