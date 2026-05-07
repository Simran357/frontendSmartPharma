import React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Upload, ReceiptLong, Verified, CloudOutlined, Error, LocalFireDepartment, AddShoppingCart, EventBusy, TrendingUp, Assessment, AutoAwesome, AssignmentTurnedIn, CurrencyRupee, Inventory, WarningAmber, StarTwoTone } from '@mui/icons-material';
import MedicineSalesChart from './SubComponent/MedicineSalesChart';
import axiosInstance from '../Form/Utils/AxiosInstance'
const Retailer = () => {
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState({
    totalStockValue: 0,
    lowStock: 0,
    nearExpiry: 0,
  });

  const [state, setState] = useState(null);
  // dynamic the main cards 
  useEffect(() => {
    console.log("Component Mounted");
    fetchDashboard();
  }, []);



  const fetchDashboard = async () => {
    try {
      const res = await axiosInstance.get("/registerroute/getDashboardStats");
      console.log("API RESPONSE:", res.data);

      setDashboardData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // impulsive div 
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/registerroute/inventaryImpulse");
        setState(res.data.data);
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };

    fetchStats();
  }, []);




  const stats = [
    {
      id: 1,
      title: "Total Stock Value",
      icon: <Inventory />,
      value: `₹${(dashboardData.totalStockValue / 100000).toFixed(1)}L`,
      change: "Net",
      disc: "Valuation of 2,450 unique SKUs",
      iconBg: "text-green-400",
      border: "hover:border-green-500",
    },
    {
      id: 2,
      title: "Low Stock",
      icon: <WarningAmber />,
      value: `${dashboardData.lowStock} Items`,
      disc: "Items below safety threshold",
      iconBg: "text-yellow-400",
      border: "hover:border-yellow-500",
    },
    {
      id: 3,
      title: "Near Expiry",
      icon: <EventBusy />,
      value: `${dashboardData.nearExpiry} Items`,
      change: "30 Days",
      disc: "Immediate action required",
      border: "hover:border-red-500",
      iconBg: "text-red-600"

    },
    {
      id: 4,
      title: "Pending Bills",
      icon: <ReceiptLong />,
      value: "64K",
      change: "Due: 4",
      disc: "Outstanding supplier payments",
      border: "hover:border-red-500",
      iconBg: "text-red-600"
    },
  ];


  return (
    <>
      <section className="p-4 md:p-6 space-y-6">
        <section className="mt-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {stats.map((item, i) => (
              <div
                key={i}
                className={`rounded-xl bg-gray p-2 flex flex-col justify-between border border-gray-200 shadow-lg ${item.border} hover:scale-[1.02] transition-all duration-200`}              >
                <div className="flex justify-between items-center ">
                  <span className={`text-black  ${item.iconBg} uppercase text-xs font-semibold`}>
                    {item.title}
                  </span>
                  <span className={`rounded-lg text-green-600  ${item.iconBg} p-2`}>
                    {item.icon}</span>
                </div>
                <div className={`flex items-end ${item.iconBg} justify-between `}>
                  <h1 className='font-bold text-xl'>
                    {item.value}
                  </h1>
                  <span className={`text-sm  ${item.iconBg}  text-green-700  px-2 py-1 rounded-full`}>
                    {item.change}
                  </span>
                </div>
                <span className={`text-xs mt-2 lg:whitespace  ${item.iconBg} font-50% text-gray-600 `}>
                  {item.disc}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col gap-6">
              <section className="rounded-2xl bg-gray-50 shadow-xs p-4 border max-h-3xl border-gray-200 gap-2">
                <div className='flex flex-row justify-between'>
                  <div className='flex gap-2'>
                    <span className='text-green-500'>
                      <TrendingUp />
                    </span>
                    <h1 className='text-xl font-medium'>SALES TREND</h1>
                  </div>
                  <div className='flex gap-2'>
                    <button className='rounded-xl px-2 bg-green-200 text-green-600 font-medium text-xs  hover:border-green-600 hover:shadow-md hover:bg-green-800 transition-all'> Sales</button>
                    <button className='rounded-xl px-2 bg-gray-200 text-gray-600 text-xs font-medium   hover:border-gray-600 hover:shadow-md hover:bg-gray-300 transition-all'>Profit</button>
                  </div>
                </div>
                <div className='mt-6'>
                  <MedicineSalesChart />
                </div>
                <hr className='text-gray-300' />
                <div className='mt-4 flex justify-between'>
                  <span className='flex flex-row gap-2 items-center'>
                    <h1 className='text-gray-600 text-xs'>Avg Margin</h1>
                    <p className='text-green-600 text-xs font-medium'>22.4%</p></span>
                  <span className=''>
                    <button className='bg-green-500 p-2 rounded-xl text-xs text-green-200 font-medium'>Best: Dolo 650</button></span>
                </div>
              </section>

            </div>
          </div>

          <div className="flex flex-col gap-6 ">

            <section className="rounded-xl bg-gray-50 shadow-sm  p-4 max-h-fit max-w-full border border-gray-200">
              <span className='text-xs font-bold text-gray-400'>COMMAND CENTER  ACTIONS</span>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* NEW BILL */}
                <button 
                 onClick={()=>navigate("RetailerOrderHistory")}
                className="group rounded-2xl border border-green-200 bg-grey-50 p-4
      flex flex-col items-center justify-center 
      hover:border-green-600 hover:shadow-lg hover:bg-green-50 transition-all">
                  <div className="w-14 h-14 rounded-full  text-green-700
        flex items-center justify-center text-xl">
                    <ReceiptLong />
                  </div>
                  <span className="font-semibold text-green-700">NEW Orders</span>
                  <span className="text-xs text-gray-500">(F1)</span>
                </button>
                {/* CREATE ORDER */}
                <button className="group rounded-2xl border border-green-200 bg-grey-50  p-4
      flex flex-col items-center justify-center 
      hover:border-green-600 hover:shadow-lg hover:bg-green-50 transition-all"
                  onClick={() => {
                    navigate("Order")
                  }}>
                  <div className="w-14 h-14 rounded-full  text-green-700
        flex items-center justify-center text-xl" >
                    <AddShoppingCart />
                  </div>
                  <span className="font-semibold text-green-700">CREATE ORDER</span>
                </button>
                <button
                 onClick={()=>navigate("InvoicePurchaseScan")}
                className="group rounded-2xl border border-green-200 bg-grey-50 p-4
      flex flex-col items-center justify-center  font-
      hover:border-green-600 hover:shadow-lg  hover:bg-green-50 transition-all">
                  <div className="w-14 h-14 rounded-full  text-green-700
        flex items-center justify-center text-xl">
                    <Upload />
                  </div>
                  <span className="font-semibold text-green-700">UPLOAD BILL</span>
                </button>
                {/* REPORT HUB */}
                <button 
                 onClick={()=>navigate("ReturnInvoice")}
                className="group rounded-2xl border border-green-200 bg-grey-50 p-4
      flex flex-col items-center justify-center
      hover:border-green-600 hover:shadow-lg hover:bg-green-50 transition-all"
                >
                  <div className="w-14 h-14 rounded-full  text-green-700
        flex items-center justify-center text-xl">
                    <Assessment />
                  </div>
                  <span className="font-semibold text-green-700">REPORT HUB</span>
                </button>
              </div>
            </section>

            <section className='bg-gray-50  shadow-xs border border-gray-200 rounded-xl p-6 max-w-full max-h-full'>
              <div className='flex flex-row justify-between gap-2 items-center'>
                <span className='flex flex-row  gap-4 '>
                  <AssignmentTurnedIn className='text-amber-600' />
                  <h1 className='text-lg font-medium  text-gray-800'>INVENTORY PULSE</h1>
                </span>                                          
                <button className='text-green-500 underline text-sm font-semibold cursor-pointer'>Auto-Reorder</button>
              </div>                                   
              <div className='grid grid-cols-2 gap-6 relative mt-6 '>
                <div className="absolute left-1/2 top-0 h-full w-px bg-gray-200">
                </div>            
                <div className="flex flex-col justify-between text-sm mb-2">
                  <div>   
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">In Stock</span>
                      <span className="text-green-600 font-semibold">{state?.inStockPercent || 0}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${state?.inStockPercent || 0}%` }}
                      />
                    </div>
                  </div>    
                  <div className='mt-4'>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">Low Stock</span>
                      <span className="text-amber-500 font-semibold"> {state?.lowStockPercent || 0}%</span>
                    </div>
                    <div className='w-full bg-gray-200 h-2 rounded-full overflow-hidden'>
                      <div className='h-full bg-amber-400'
                        style={{ width: `${state?.lowStockPercent || 0}%` }}>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <h4 className="text-xs font-semibold text-gray-500">
                    EXPIRY RADAR
                  </h4>
                  <div className="flex items-center mt-2 justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className='font-semibold'>&lt; 30d</span>
                    </div>
                    <span className="font-semibold text-gray-800"> {state?.expiry30 || 0} </span>
                  </div>                               
                  <div className='mt-8'>           
                                                             
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-300"></span>
                        <span className='font-semibold'>30d - 90d</span>
                      </div>
                      <span className="font-semibold text-amber-600"> {state?.expiry90 || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          
          </div>
        </section>
      </section>
      <Outlet />
    </>
  )
}
export default Retailer