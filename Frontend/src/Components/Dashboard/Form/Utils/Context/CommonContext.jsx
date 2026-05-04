import React, { createContext, useEffect, useState } from 'react'
import axiosInstance from '../AxiosInstance'
export const contextProvide = createContext()
const CommonContext = ({ children }) => { 
  const [auth, setAuth] = useState(null)
  const [userRoles,setUserRoles] = useState(null)
console.log("auth in context",auth)
console.log("userrole in sontext", userRoles)
    useEffect(() => {
  axiosInstance.get("/registerroute/me")
    .then((res) => {
      const role = res?.data?.user?.role;
      const id = res?.data?.user?.id;

      setAuth(id);
      setUserRoles(role);

      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
    })  
    .catch(() => {
      const role = localStorage.getItem("role");
      const id = localStorage.getItem("userId");

      setAuth(id || "");
      setUserRoles(role || "");
    });
}, []);
                                                        
   return (    
    <contextProvide.Provider value={{auth ,setAuth,userRoles,setUserRoles}}>
      {children}
    </contextProvide.Provider>
  )
}
export default CommonContext  