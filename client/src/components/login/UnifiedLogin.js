import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, GraduationCap, ArrowLeft, Lock, User as UserIcon, Shield, UserCheck, Briefcase, Home, LogIn } from "lucide-react";
import { adminSignIn } from "../../redux/actions/adminActions";
import { facultySignIn } from "../../redux/actions/facultyActions";
import { studentSignIn } from "../../redux/actions/studentActions";
import { wardenLogin } from "../../redux/actions/wardenActions";
import ThemeToggle from "../common/ThemeToggle";

const UnifiedLogin = () => {
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  useEffect(() => {
    if (store.errors) {
      setError(store.errors?.message || "Invalid credentials. Please try again.");
      setLoading(false);
    }
  }, [store.errors]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (role === "admin") await dispatch(adminSignIn({ username, password }, navigate));
      else if (role === "student") await dispatch(studentSignIn({ username, password }, navigate));
      else if (role === "faculty") await dispatch(facultySignIn({ username, password }, navigate));
      else if (role === "warden") await dispatch(wardenLogin({ username, password }, navigate));
    } catch (err) {
      setError("System unreachable. Please check your connection.");
    }
    setLoading(false);
  };

  const roles = [
    { id: "student", label: "Student Portal", icon: UserCheck, color: "text-[#6366F1]", bg: "bg-[#EEF2FF]", desc: "View academic progress, marks & geo-attendance" },
    { id: "faculty", label: "Faculty Portal", icon: Briefcase, color: "text-[#818CF8]", bg: "bg-[#EEF2FF]", desc: "Manage subject tests & grade students" },
    { id: "admin", label: "Administrator", icon: Shield, color: "text-[#6366F1]", bg: "bg-[#EEF2FF]", desc: "Full institutional system management" },
    { id: "warden", label: "Hostel Warden", icon: Home, color: "text-[#F59E0B]", bg: "bg-[#FEF3C7]", desc: "Approve hostel leave applications & logs" },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 selection:bg-[#6366F1]/20 font-['Inter'] relative overflow-hidden transition-colors duration-500 bg-[#F7F8FC] dark:bg-[#0F172A]">
      
      {/* Fresh Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#6366F1]/10 to-[#818CF8]/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#EEF2FF]/50 to-[#6366F1]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      
      {/* Subtle Dot Grid */}
      <svg className="absolute inset-0 w-full h-full text-[#6366F1]/[0.04] dark:text-[#818CF8]/[0.04] pointer-events-none" fill="currentColor">
        <pattern id="campusGrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#campusGrid)" />
      </svg>

      <header className="fixed top-8 left-8 right-8 flex items-center justify-between z-20">
        <button 
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FFFFFF]/90 dark:bg-[#0F172A]/90 backdrop-blur-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md hover:scale-105 transition-all"
        >
          <ArrowLeft size={18} className="text-[#1E293B] dark:text-white group-hover:text-[#6366F1] transition-colors" />
          <span className="text-xs font-extrabold text-[#1E293B] dark:text-white group-hover:text-[#6366F1] transition-colors uppercase tracking-wider">Back to Portal</span>
        </button>
        <ThemeToggle />
      </header>

      <div className="w-full max-w-[480px] relative z-10">
        <AnimatePresence mode="wait">
          {!role ? (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FFFFFF]/95 dark:bg-[#1E293B]/95 backdrop-blur-2xl border border-[#E2E8F0] dark:border-[#334155] rounded-[36px] p-8 sm:p-10 shadow-2xl shadow-[#6366F1]/8"
            >
              <div className="text-center mb-8 flex flex-col items-center">
                <div className="w-14 h-14 bg-[#EEF2FF] dark:bg-[#6366F1]/20 text-[#6366F1] dark:text-[#A5B4FC] rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h1 className="text-3xl font-black text-[#1E293B] dark:text-white tracking-tight mb-2">Campus ERP Portal</h1>
                <p className="text-[#64748B] dark:text-[#94A3B8] text-xs font-semibold">Select your account type to sign in</p>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {roles.map((r) => (
                  <motion.button 
                    key={r.id} 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRole(r.id)}
                    className="w-full text-left p-4 rounded-2xl bg-[#F7F8FC] dark:bg-[#0F172A]/60 border border-[#E2E8F0] dark:border-[#334155] hover:border-[#6366F1] hover:bg-white transition-all flex items-center gap-4 group shadow-sm"
                  >
                    <div className={`w-11 h-11 rounded-xl ${r.bg} dark:bg-[#6366F1]/20 flex items-center justify-center shrink-0 shadow-sm`}>
                      <r.icon className={`w-5 h-5 ${r.color} dark:text-white`} />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-[#1E293B] dark:text-white group-hover:text-[#6366F1] transition-colors">{r.label}</h4>
                      <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-medium">{r.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FFFFFF]/95 dark:bg-[#1E293B]/95 backdrop-blur-2xl border border-[#E2E8F0] dark:border-[#334155] rounded-[36px] p-8 sm:p-10 shadow-2xl shadow-[#6366F1]/8"
            >
              {/* Top Icon Box */}
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] dark:bg-[#6366F1]/20 text-[#6366F1] dark:text-white flex items-center justify-center mb-4 shadow-sm">
                  <LogIn className="w-6 h-6 text-[#6366F1] dark:text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] dark:text-white tracking-tight mb-1">
                  Sign in as {roles.find(r => r.id === role)?.label}
                </h2>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium max-w-xs">
                  Enter your credentials to access your ERP dashboard.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username Input */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-[#1E293B] dark:text-white">Username / ID</label>
                  <div className="relative flex items-center">
                    <UserIcon className="absolute left-4 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="w-full h-13 pl-12 pr-4 py-3 rounded-2xl bg-[#F1F5F9] dark:bg-[#0F172A]/60 border border-[#E2E8F0] dark:border-[#334155] text-sm font-semibold text-[#1E293B] dark:text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-[#1E293B] dark:text-white">Password</label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-13 pl-12 pr-12 py-3 rounded-2xl bg-[#F1F5F9] dark:bg-[#0F172A]/60 border border-[#E2E8F0] dark:border-[#334155] text-sm font-semibold text-[#1E293B] dark:text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-[#94A3B8] hover:text-[#6366F1] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-200 text-center">
                    {error}
                  </div>
                )}

                {/* Primary Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 mt-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#6366F1] to-[#818CF8] hover:from-[#4F46E5] hover:to-[#6366F1] shadow-xl shadow-[#6366F1]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? "Authenticating..." : "Get Started"}
                </button>

                <div className="pt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setRole(null)}
                    className="text-xs font-bold text-[#64748B] hover:text-[#6366F1] transition-colors inline-flex items-center gap-1.5"
                  >
                    <ArrowLeft size={14} /> Switch Access Role
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UnifiedLogin;
