import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Building2,
  BookOpen,
  FileSpreadsheet,
  UserCheck,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Headphones,
  ThumbsUp,
  FileText,
  PieChart,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import Button from "../ui/Button";
import ThreeBackground from "./ThreeBackground";
import ThemeToggle from "../common/ThemeToggle";
import HeroVectorIllustration from "./HeroVectorIllustration";
import BenefitsVectorIllustration from "./BenefitsVectorIllustration";
import WorkspaceVectorIllustration from "./WorkspaceVectorIllustration";
import FloatingAccents from "./FloatingAccents";

// Top 4 Feature Cards
const TOP_FEATURES = [
  {
    icon: MessageSquare,
    title: "Digital Campus",
    desc: "Streamlined administrative and academic workflows with friction-free web interfaces.",
    bgColor: "bg-[#EEF2FF] dark:bg-[#6366F1]/20",
    iconColor: "text-[#6366F1] dark:text-[#A5B4FC]",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Always-on system assistance, real-time alerts, and instant warden leave tracking.",
    bgColor: "bg-[#EEF2FF] dark:bg-[#6366F1]/20",
    iconColor: "text-[#818CF8] dark:text-[#C7D2FE]",
  },
  {
    icon: ThumbsUp,
    title: "Optimal Choice",
    desc: "Data-driven analytics for student academic performance and geo-fenced attendance.",
    bgColor: "bg-[#FEF3C7] dark:bg-[#F59E0B]/20",
    iconColor: "text-[#F59E0B]",
  },
  {
    icon: FileText,
    title: "Business Strategy",
    desc: "Enterprise management solution designed for departments, faculties, and admins.",
    bgColor: "bg-[#D1FAE5] dark:bg-[#34D399]/20",
    iconColor: "text-[#10B981]",
  },
];

// Why Choose Us Features
const WHY_CHOOSE_US = [
  {
    title: "Reporting & Analysis",
    desc: "Continually aggregate friction-free campus intelligence and custom analytical reports.",
    bgColor: "bg-[#EEF2FF] dark:bg-[#6366F1]/30",
    iconColor: "text-[#6366F1]",
    icon: PieChart,
  },
  {
    title: "Strategic Advisor",
    desc: "Smart decision-making metrics for course registration, exams, and faculty allocation.",
    bgColor: "bg-[#FEF3C7] dark:bg-[#F59E0B]/30",
    iconColor: "text-[#F59E0B]",
    icon: Sparkles,
  },
  {
    title: "Leave Management",
    desc: "Automated hostel leave approval system with warden notification matrix.",
    bgColor: "bg-[#D1FAE5] dark:bg-[#34D399]/30",
    iconColor: "text-[#10B981]",
    icon: UserCheck,
  },
  {
    title: "Secure Access",
    desc: "Enterprise role-based security ensuring top-tier data protection & compliance.",
    bgColor: "bg-[#EEF2FF] dark:bg-[#818CF8]/30",
    iconColor: "text-[#818CF8]",
    icon: Send,
  },
];

// Enterprise Modules
const MODULES = [
  { name: "Academic Management", desc: "Courses, Timetables & Syllabus Tracking", icon: BookOpen, color: "text-[#6366F1]" },
  { name: "Exam & Results Portal", desc: "Automated Marking, Transcripts & Analysis", icon: FileSpreadsheet, color: "text-[#818CF8]" },
  { name: "Hostel Leave System", desc: "Digital Leave Applications & Warden Approvals", icon: Building2, color: "text-[#F59E0B]" },
  { name: "Geo-Fence Attendance", desc: "Location-Verified Student & Faculty Check-in", icon: MapPin, color: "text-[#10B981]" },
  { name: "Human Resources", desc: "Faculty Management & Payroll Processing", icon: Users, color: "text-[#6366F1]" },
  { name: "Enterprise Security", desc: "Role-Based Access Control & Audit Trails", icon: ShieldCheck, color: "text-[#818CF8]" },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const whyUsRef = useRef(null);
  const modulesRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#0F172A] text-[#1E293B] dark:text-[#F1F5F9] selection:bg-[#6366F1]/20 transition-colors duration-500 overflow-x-hidden font-['Inter']">
      {/* Background Three.js Particle Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ThreeBackground />
      </div>

      {/* Floating Geometric Vector Accents */}
      <FloatingAccents />

      {/* Sticky Navigation Bar */}
      <nav className="fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-center border-b border-[#E2E8F0] dark:border-[#334155] bg-[#FFFFFF]/90 dark:bg-[#0F172A]/90 backdrop-blur-xl transition-all duration-300 shadow-sm">
        <div className="max-w-7xl w-full px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#818CF8] flex items-center justify-center shadow-lg shadow-[#6366F1]/25">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-[#1E293B] dark:text-white tracking-tight">
              Halci <span className="bg-gradient-to-r from-[#6366F1] to-[#818CF8] bg-clip-text text-transparent">ERP</span>
            </span>
          </div>

          {/* Links */}
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-bold text-[#64748B] hover:text-[#6366F1] dark:hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollToRef(featuresRef)} className="text-sm font-bold text-[#64748B] hover:text-[#6366F1] dark:hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToRef(whyUsRef)} className="text-sm font-bold text-[#64748B] hover:text-[#6366F1] dark:hover:text-white transition-colors">Why Us</button>
            <button onClick={() => scrollToRef(modulesRef)} className="text-sm font-bold text-[#64748B] hover:text-[#6366F1] dark:hover:text-white transition-colors">Modules</button>
            <button onClick={() => navigate("/login")} className="text-sm font-bold text-[#64748B] hover:text-[#6366F1] dark:hover:text-white transition-colors">Contact</button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="hidden sm:inline-flex px-5 text-sm font-bold text-[#1E293B] dark:text-white hover:bg-[#EEF2FF] dark:hover:bg-[#6366F1]/20"
            >
              Sign In
            </Button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#6366F1] to-[#818CF8] hover:from-[#4F46E5] hover:to-[#6366F1] shadow-lg shadow-[#6366F1]/25 hover:shadow-[#6366F1]/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-36 pb-20 px-6 min-h-[90vh] flex items-center justify-center z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 text-left"
          >
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF2FF] dark:bg-[#6366F1]/20 border border-[#E2E8F0] dark:border-[#6366F1]/30 text-[#6366F1] dark:text-[#C7D2FE] font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B] animate-pulse" />
              <span>Campus Digital Transformation</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black text-[#1E293B] dark:text-white leading-[1.1] tracking-tight mb-6">
              Strategic Design <br className="hidden sm:block" />
              And Technology <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#F59E0B] bg-clip-text text-transparent">
                Agency.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#64748B] dark:text-[#CBD5E1] font-medium leading-relaxed mb-8 max-w-xl">
              Compellingly streamline cooperative strategic theme synergistic process improvements across student attendance, hostel approvals, and campus administration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#6366F1] to-[#818CF8] hover:from-[#4F46E5] hover:to-[#6366F1] shadow-xl shadow-[#6366F1]/25 hover:shadow-[#6366F1]/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3"
              >
                Read More <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToRef(featuresRef)}
                className="px-8 py-4 rounded-full text-base font-bold text-[#1E293B] dark:text-white bg-[#FFFFFF] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] hover:bg-[#EEF2FF] shadow-md transition-all duration-200"
              >
                Explore Features
              </button>
            </div>
          </motion.div>

          {/* Right Column: Hero Vector Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <HeroVectorIllustration />
          </motion.div>
        </div>
      </section>

      {/* --- TOP 4 FEATURE CARDS SECTION --- */}
      <section ref={featuresRef} className="py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TOP_FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-[#FFFFFF] dark:bg-[#1E293B] rounded-3xl p-8 border border-[#E2E8F0] dark:border-[#334155] shadow-xl shadow-[#6366F1]/5 hover:shadow-2xl hover:shadow-[#6366F1]/10 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-extrabold text-[#1E293B] dark:text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-[#64748B] dark:text-[#94A3B8] font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- "WHY CHOOSE US" SECTION --- */}
      <section ref={whyUsRef} className="py-24 px-6 relative z-10 bg-[#FFFFFF]/80 dark:bg-[#0F172A]/40 backdrop-blur-md border-y border-[#E2E8F0] dark:border-[#334155]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: 2x2 Feature Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <span className="text-xs font-black text-[#6366F1] dark:text-[#A5B4FC] uppercase tracking-[0.25em] block mb-3">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] dark:text-white tracking-tight mb-4 leading-tight">
              Get Benefits And <br />
              Advantages Your Market Goal.
            </h2>
            <p className="text-[#64748B] dark:text-[#94A3B8] font-medium text-sm sm:text-base leading-relaxed mb-10">
              Conveniently customize proactive web design service for leveraged interfaces without globally.
            </p>

            {/* 2x2 Feature Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {WHY_CHOOSE_US.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1E293B] dark:text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Rocket Launch Vector */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center"
          >
            <BenefitsVectorIllustration />
          </motion.div>
        </div>
      </section>

      {/* --- "PERFECT SOLUTION" SECTION --- */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Team Collaboration Vector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center"
          >
            <WorkspaceVectorIllustration />
          </motion.div>

          {/* Right Column: Details & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <span className="text-xs font-black text-[#6366F1] dark:text-[#A5B4FC] uppercase tracking-[0.25em] block mb-3">Research</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] dark:text-white tracking-tight mb-4 leading-tight">
              We Can Give Perfect Solution <br />
              For Your Business.
            </h2>
            <p className="text-[#64748B] dark:text-[#94A3B8] font-medium text-sm sm:text-base leading-relaxed mb-8">
              Conveniently customize proactive web build services for leveraged interfaces without globally continually aggregate friction-free without globally wellies richard.
            </p>

            {/* Feature Bullet List */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EEF2FF] dark:bg-[#6366F1]/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-[#6366F1]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1E293B] dark:text-white mb-1">Strategic Advisor</h4>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium leading-relaxed">
                    Continually aggregate friction-free web interfaces without globally wellies richard.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D1FAE5] dark:bg-[#34D399]/20 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5 text-[#10B981]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1E293B] dark:text-white mb-1">Support Center</h4>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium leading-relaxed">
                    Continually aggregate friction-free web interfaces without globally wellies richard.
                  </p>
                </div>
              </div>
            </div>

            {/* Pill CTA Button */}
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#6366F1] to-[#818CF8] hover:from-[#4F46E5] hover:to-[#6366F1] shadow-lg shadow-[#6366F1]/25 hover:scale-105 transition-all duration-200"
            >
              Read More
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- ENTERPRISE MODULES GRID --- */}
      <section ref={modulesRef} className="py-24 px-6 relative z-10 bg-[#FFFFFF]/80 dark:bg-[#0F172A]/40 backdrop-blur-md border-t border-[#E2E8F0] dark:border-[#334155]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-black text-[#6366F1] dark:text-[#A5B4FC] uppercase tracking-[0.25em] block mb-3">Institutional Capabilities</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1E293B] dark:text-white tracking-tight">Scalable ERP Modules</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((module, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate("/login")}
                className="p-8 rounded-3xl bg-[#FFFFFF] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] shadow-lg shadow-[#6366F1]/5 hover:border-[#6366F1] transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] dark:bg-[#6366F1]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <module.icon className={`w-6 h-6 ${module.color}`} />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] dark:text-white mb-2 group-hover:text-[#6366F1] transition-colors">{module.name}</h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium leading-relaxed">{module.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 px-6 relative z-10 bg-gradient-to-r from-[#6366F1] via-[#4F46E5] to-[#1E293B] text-white overflow-hidden shadow-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 text-center">
          {[
            { label: "Active Students", val: "15,000+", color: "text-[#C7D2FE]" },
            { label: "Certified Faculty", val: "850+", color: "text-[#A5B4FC]" },
            { label: "Daily Uptime", val: "99.99%", color: "text-[#6EE7B7]" },
            { label: "Years Excellence", val: "12+", color: "text-[#FDE68A]" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <p className={`text-4xl sm:text-6xl font-black mb-2 tracking-tight ${stat.color}`}>{stat.val}</p>
              <p className="text-xs font-black text-[#C7D2FE]/70 uppercase tracking-[0.25em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#6366F1] to-[#818CF8] p-12 sm:p-16 text-center text-white shadow-2xl shadow-[#6366F1]/25 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">Ready to Modernize Your Campus?</h2>
            <p className="text-[#C7D2FE] text-base sm:text-lg max-w-2xl mx-auto mb-8 font-medium">
              Join top educational institutions leveraging our unified ERP system for students, faculty, wardens, and administrators.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-4 rounded-full text-base font-bold text-[#6366F1] bg-white hover:bg-[#EEF2FF] shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Sign In to Portal Now
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="pt-20 pb-12 px-6 relative z-10 bg-[#FFFFFF] dark:bg-[#0F172A] border-t border-[#E2E8F0] dark:border-[#334155]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#818CF8] text-white flex items-center justify-center shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-[#1E293B] dark:text-white tracking-tight">Halci <span className="text-[#6366F1]">ERP</span></span>
              </div>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium leading-relaxed mb-6">
                Streamlining academic governance, location attendance, hostel leave approvals, and campus analytics.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <button key={i} className="p-2.5 rounded-xl bg-[#EEF2FF] text-[#6366F1] hover:bg-[#6366F1] hover:text-white transition-all">
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black text-[#1E293B] dark:text-white uppercase tracking-[0.25em] mb-6">Quick Links</h4>
              <ul className="space-y-3 text-xs font-semibold text-[#64748B]">
                <li><button onClick={() => scrollToRef(featuresRef)} className="hover:text-[#6366F1] transition-colors">Academic Management</button></li>
                <li><button onClick={() => scrollToRef(modulesRef)} className="hover:text-[#6366F1] transition-colors">Hostel Leave Approvals</button></li>
                <li><button onClick={() => scrollToRef(modulesRef)} className="hover:text-[#6366F1] transition-colors">Geo-Attendance System</button></li>
                <li><button onClick={() => scrollToRef(modulesRef)} className="hover:text-[#6366F1] transition-colors">Role-Based Security</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-[#1E293B] dark:text-white uppercase tracking-[0.25em] mb-6">Support</h4>
              <ul className="space-y-3 text-xs font-semibold text-[#64748B]">
                <li className="flex items-center gap-2"><Mail size={14} className="text-[#6366F1]" /> support@halcierp.edu</li>
                <li className="flex items-center gap-2"><Phone size={14} className="text-[#6366F1]" /> +1 (800) 234-5678</li>
                <li className="flex items-center gap-2"><MapPin size={14} className="text-[#6366F1]" /> University Campus, Tech Park</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-[#1E293B] dark:text-white uppercase tracking-[0.25em] mb-6">Newsletter</h4>
              <p className="text-xs text-[#64748B] font-medium mb-4">Get updates on new campus ERP modules.</p>
              <div className="flex p-1.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0]">
                <input type="email" placeholder="Your email..." className="bg-transparent border-none outline-none px-4 flex-1 text-xs font-bold text-[#1E293B] placeholder:text-[#94A3B8]" />
                <button className="px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#6366F1] to-[#818CF8] hover:from-[#4F46E5] hover:to-[#6366F1] transition-all">Join</button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">
            <p>© 2026 Halci ERP Agency. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="hover:text-[#6366F1]">Privacy</button>
              <button className="hover:text-[#6366F1]">Terms</button>
              <button className="hover:text-[#6366F1]">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
