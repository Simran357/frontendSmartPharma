import React, { useState, useEffect } from "react";
import { Menu, X, Pill } from "lucide-react";
import Login from "../../Components/Dashboard/Form/Login";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);     
  const [mobileOpen, setMobileOpen] = useState(false);              
  const [isOpen, setIsOpen] = useState(false)     
  const location = useLocation();                 
  const links = ["Home", "Medicines", "Services", "Contact", "RoleBased"];
console.log("location",location)
  // Scroll effect                          
  
  useEffect(() => {  
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
                                                               
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

useEffect(() => {
  if (location.state?.openModal) {
    setIsOpen(true);
  }   
}, [location.state]);  
  return ( 
    <nav className={`fixed top-0 w-full z-50 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>

      <div className="flex justify-between items-center p-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-linear-to-br from-emerald-400 to-teal-500 p-2 rounded-lg">
            <Pill className="text-white" />
          </div>
          <h2 className="text-xl text-emerald-500 font-semibold">
            SmartPharm
          </h2>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-slate-900">
          {links.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </div>
                                  
        {/* Desktop Right */}
        <div className="hidden md:flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 bg-white border rounded-lg"
          />
  
        <button
            className="bg-linear-to-r from-emerald-400 to-teal-500 text-white px-5 py-2 rounded-full"
            onClick={() => setIsOpen(true)}>
            Login/Register
          </button>
        </div>
   
        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        > 
          {mobileOpen ? <X /> : <Menu />}
        </button>   
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (    
        <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col gap-4 md:hidden">
                
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="text-black"
            >
              {item}
            </a>
          ))}
            
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 border rounded"
          />
               <button
            className="bg-linear-to-r from-emerald-400 to-teal-500 text-white px-5 py-2 rounded-full"
            onClick={() => setIsOpen(true)}>
            Login/Register
          </button> 
              

        </div>
 )}  
     {isOpen && (    
  <div   
className="fixed inset-0 bg-black/40 flex items-center justify-center"
    onClick={() => setIsOpen(false)} 
  >   
    <motion.div   
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}   
      transition={{ duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
      className="p-2 w-[90%] md:w-500px"
    >
      <Login />

      <button
        className="mt-2 text-red-400 text-sm block mx-auto"
        onClick={() => setIsOpen(false)}
      >  
        Close   
      </button>
    </motion.div>
  </div>   
)}</nav>
);}; 
export default NavBar;