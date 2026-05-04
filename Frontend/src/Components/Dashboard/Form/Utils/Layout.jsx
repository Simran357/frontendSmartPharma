import { useEffect, useState } from "react";
import {  Outlet, useNavigate } from "react-router-dom";
import Retailerlayout from "./Retailerlayout";
import Wholesalerlayout from "./WholesalerLayout";
import axiosInstance from "./AxiosInstance";
import Header from "./Header";

export default function Layout() {

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
console.log("ROLE:", role)
const navigate = useNavigate()
useEffect(() => {
  const fetchMeApi = async ()=>{
  await axiosInstance.get("/registerroute/me")
    .then(res => { 
      setRole(res?.data?.user?.role);
    })
    .catch(err => {          
      console.error(err);
    })  
    .finally(() => {
      setLoading(false);
    });
  }
  fetchMeApi()
}, []);

 useEffect(() => {
  if (!loading && role) {
    if (role === "Retailer") {
      navigate("/Dashboard/Retailer", { replace: true });
    }
    if (role === "Wholesaler") {
      navigate("/Dashboard/Wholesaler", { replace: true });
    }
  }
}, [role, loading]);
if (loading) return <div>Loading...</div>;

if (!role) return <div>Loading...</div>; // ADD THIS

switch(role){
  case 'Admin':
    return <>
      <Header/>
      <Outlet/>
    </>
  case 'Wholesaler':   
    return <Wholesalerlayout/>
  case 'Retailer':
    return <Retailerlayout/>
  default:
    return <div>Unauthorized</div>
}
}