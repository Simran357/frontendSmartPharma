import { Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const SettingsMenu = () => {
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
        <div ref={menuRef} className="relative">

            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-full hover:bg-gray-100"
            >
                <Settings size={18} />
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-lg border z-50">
                    <button className="w-full text-left px-3  hover:bg-gray-100">
                        Preferences
                    </button>
                    <button className="w-full text-left px-3  hover:bg-gray-100">
                        Security
                    </button>
                </div>
            )}
        </div>
    );
};