import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

export const NotificationMenu = () => {
  const [open, setOpen] = useState(false);
    const menuRef = useRef();
  
useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef}  className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <Bell size={18} />

        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-50 bg-white shadow-lg rounded-lg border z-50">
          <div className="p-1 text-left border-b font-semibold">
            Notifications
          </div>

          <div className="p-3 text-sm text-gray-500">
            No new notifications
          </div>
        </div>
      )}
    </div>
  );
};