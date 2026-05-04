import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

const UserProfileMenu = ({ username, role }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const initials = username?.charAt(0)?.toUpperCase() || "U";

  return (
    <div ref={menuRef} className="relative">
      {/* Profile Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
          {initials}
        </div>

        {/* User Info */}
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-slate-800 leading-none">
            {username}
          </p>

          <div className="flex items-center gap-1 mt-1">
            <ShieldCheck size={12} className="text-emerald-500" />
            <p className="text-xs text-slate-500">{role}</p>
          </div>
        </div>

        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50"
          >
            {/* Top Header */}
            <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-bold border border-white/20">
                  {initials}
                </div>
                 
                <div>
                  <h3 className="font-semibold text-lg">{username}</h3>
                  <p className="text-sm opacity-90">{role}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button className="w-full flex items-center gap-2 px-2 py-2 rounded-2xl hover:bg-slate-100 transition-all text-slate-700">
                <User size={18} />
                <span className="font-medium">My Profile</span>
              </button>

              <button className="w-full flex items-center gap-2 px-2 py-2 rounded-2xl hover:bg-slate-100 transition-all text-slate-700">
                <Settings size={18} />
                <span className="font-medium">Settings</span>
              </button>

              <div className="border-t my-2" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-red-50 transition-all text-red-500"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default UserProfileMenu;