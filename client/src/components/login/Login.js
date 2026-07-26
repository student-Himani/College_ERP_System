import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Briefcase, UserCheck, ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 font-['Inter'] relative overflow-hidden bg-[#F6F5FB] dark:bg-[#1C1B29]">
      
      {/* Background Blobs & Pattern */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#5B4B8A]/15 to-[#8E7CC3]/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#EDE9FA]/40 to-[#5B4B8A]/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      
      <svg className="absolute inset-0 w-full h-full text-[#5B4B8A]/5 dark:text-[#8E7CC3]/5 pointer-events-none" fill="currentColor">
        <pattern id="campusGridMain" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#campusGridMain)" />
      </svg>

      <header className="fixed top-8 left-8">
        <button 
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/90 dark:bg-[#1C1B29]/90 backdrop-blur-xl border border-[#E6E6EF] dark:border-[#5B4B8A]/30 shadow-md hover:scale-105 transition-all"
        >
          <ArrowLeft size={18} className="text-[#2A2A3A] dark:text-white group-hover:text-[#5B4B8A]" />
          <span className="text-xs font-extrabold text-[#2A2A3A] dark:text-white uppercase tracking-wider">Back to Home</span>
        </button>
      </header>

      <div className="w-full max-w-2xl bg-white/95 dark:bg-[#2A2A3A]/95 backdrop-blur-2xl border border-[#E6E6EF] dark:border-[#5B4B8A]/30 rounded-[36px] p-8 sm:p-12 shadow-2xl shadow-[#5B4B8A]/10 flex flex-col items-center text-center relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-[#EDE9FA] text-[#5B4B8A] flex items-center justify-center mb-4 shadow-sm">
          <GraduationCap className="w-7 h-7" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black text-[#2A2A3A] dark:text-white tracking-tight mb-2">
          Campus Access Portal
        </h1>
        <p className="text-xs sm:text-sm text-[#6D6B7A] dark:text-[#EDE9FA]/70 font-semibold mb-10">
          Select your portal to sign in
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {/* Faculty Card */}
          <div className="p-8 rounded-3xl bg-[#F6F5FB] dark:bg-[#1C1B29]/60 border border-[#E6E6EF] dark:border-[#5B4B8A]/30 flex flex-col items-center text-center hover:border-[#5B4B8A] transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-white text-[#8E7CC3] flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
              <Briefcase className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#2A2A3A] dark:text-white mb-2">Faculty</h3>
            <p className="text-xs text-[#6D6B7A] font-medium mb-6">Manage subject tests, attendance, & marks</p>
            <Link
              to="/login/facultylogin"
              className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#5B4B8A] to-[#8E7CC3] hover:from-[#4A3D73] hover:to-[#7C6BB2] shadow-lg transition-all flex items-center justify-center"
            >
              Faculty Login
            </Link>
          </div>

          {/* Student Card */}
          <div className="p-8 rounded-3xl bg-[#F6F5FB] dark:bg-[#1C1B29]/60 border border-[#E6E6EF] dark:border-[#5B4B8A]/30 flex flex-col items-center text-center hover:border-[#5B4B8A] transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-white text-[#5B4B8A] flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
              <UserCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#2A2A3A] dark:text-white mb-2">Student</h3>
            <p className="text-xs text-[#6D6B7A] font-medium mb-6">Access grades, hostel leaves, & attendance</p>
            <Link
              to="/login/studentlogin"
              className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#5B4B8A] to-[#8E7CC3] hover:from-[#4A3D73] hover:to-[#7C6BB2] shadow-lg transition-all flex items-center justify-center"
            >
              Student Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
