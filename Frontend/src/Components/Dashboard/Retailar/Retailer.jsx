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

              {/* <section className="grid md:grid-cols-1 gap-4 auto-rows-fr">
                <section className='bg-green-50 border border-green-200 rounded-xl p-2 max-h-fit'>
                  <div className='flex flex-row gap-2 items-center justify-between'>
                    <span className='flex gap-2  items-center text-green-400'>
                      <AutoAwesome />
                      <h4 className='text-md font-semibold'>SMART ORDER SUGGESTIONS</h4>
                    </span>
                    <div className='flex gap-2'>
                      <button className='rounded-lg bg-green-400 p-2 text-green-50'>OPTIMIZED</button>
                      <button className='text-green-500 underline text-sm font-semibold cursor-pointer'>View Comparison</button>
                    </div>
                  </div>
                  <section className='flex flex-col p-6 gap-4'>
                    <div className='bg-gray-50 shadow-xl border border-gray-300 rounded-xl  p-4'>
                      <h1 className='text-md font-sans font-medium'>Paracetamol 500mg (Strip of 10)</h1>
                      <div className='flex sm:flex-row flex-col justify-between  gap-2'>
                        <div className='flex flex-row sm:flex-col gap-2'>
                          <span className='text-xs font-medium text-gray-400'>Order :
                            <span className='text-gray-600 font-bold text-[12px]'> 12 Strips</span> </span>
                          <span className='text-gray-400 font-medium text-[12px]'>Best Wholesaler :
                            <span className='text-green-400 text-md font-medium rounded-full whitespace-nowrap'> ABC Pharma</span></span>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <span className='text-xs flex flex-col text-green-400 font-medium'>
                            <span>25% Margin</span>
                            <span className='text-gray-500 text-xs'>Avg Sale 4/day</span></span>
                          <div className='bg-green-600 px-1  text-green-100 rounded-lg'><AddShoppingCart /></div>
                        </div>
                      </div>
                    </div>
                    <div className='bg-gray-50 shadow-xl border border-gray-300 rounded-xl  p-6'>
                      <h1 className='text-md font-sans font-medium'>Amoxicilin 200mg (Capsules)</h1>
                      <div className='flex flex-row gap-2 mt-4'>
                        <span className='text-xs bg-orange-200 w-fit px-2 font-medium rounded text-orange-600'>FASTER DELIVERY : 4HRS </span>
                        <span className='text-xs bg-blue-200 text-blue-600 w-fit px-2 rounded font-medium'>ATL BRAND AVAILABLE</span>
                      </div>
                    </div>
                    <div className='bg-gray-50 shadow-xl border border-gray-300 rounded-xl  p-6'>
                      <h1 className='text-md font-sans font-medium'>Cetirizine 10mg </h1>
                      <div className='flex sm:flex-row flex-col justify-between  gap-2'>
                        <div className='flex flex-row gap-2 mt-4'>
                          <span className='text-xs font-medium text-gray-400'>Order :
                            <span className='text-gray-600 font-bold text-[12px]'> 5 Strips</span> </span>
                          <span className='text-gray-400 font-medium text-[12px]'>Supplier:
                            <span className='text-gray-600 font-medium text-xs rounded-full whitespace-nowrap'> City Distribution</span></span>
                        </div>
                      </div>
                    </div>
                  </section>
                </section>
              </section> */}
            </div>
          </div>

          <div className="flex flex-col gap-6 ">

            <section className="rounded-xl bg-gray-50 shadow-sm  p-4 max-h-fit max-w-full border border-gray-200">
              <span className='text-xs font-bold text-gray-400'>COMMAND CENTER  ACTIONS</span>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* NEW BILL */}
                <button className="group rounded-2xl border border-green-200 bg-grey-50 p-4
      flex flex-col items-center justify-center 
      hover:border-green-600 hover:shadow-lg hover:bg-green-50 transition-all">
                  <div className="w-14 h-14 rounded-full  text-green-700
        flex items-center justify-center text-xl">
                    <ReceiptLong />
                  </div>
                  <span className="font-semibold text-green-700">NEW BILL</span>
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
                <button className="group rounded-2xl border border-green-200 bg-grey-50 p-4
      flex flex-col items-center justify-center  font-
      hover:border-green-600 hover:shadow-lg  hover:bg-green-50 transition-all">
                  <div className="w-14 h-14 rounded-full  text-green-700
        flex items-center justify-center text-xl">
                    <Upload />
                  </div>
                  <span className="font-semibold text-green-700">UPLOAD PURCHASE</span>
                </button>
                {/* REPORT HUB */}
                <button className="group rounded-2xl border border-green-200 bg-grey-50 p-4
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
                                 
            {/* <section className=''>
              <div className='bg-gray-100 shadow-sm border border-gray-300 rounded-xl  p-6'>
                <h1 className="text-xs text-[#d5d3d3] font-medium">STOCK VELOCITY</h1>
                <div className="flex flex-row  mt-4 gap-2 justify-between">
                  <div className="flex flex-col w-full">
                    <span className="text-red-500 flex items-center gap-2 text-xs ">
                      <LocalFireDepartment />
                      <p>FAST MOVING</p>
                    </span>
                    <div className="flex flex-col gap-2 justify-between mt-2 ">
                      <span className=" bg-[#f7eba8] p-2 gap-4 flex justify-between  border-2 border-amber-300 rounded-xl">
                        <h1 className="text-sm text-black ">Dolo 650</h1>
                        <h1 className="text-sm text-red-700">12/d</h1>
                      </span>
                      <span className=" bg-[#f7eba8] p-2 rounded-xl gap-4 border-2 border-amber-300  flex justify-between ">
                        <h1 className="text-sm text-black ">Pan-D</h1>
                        <h1 className="text-sm text-red-700">8/d</h1>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <span className="text-red-500 flex items-center gap-2 text-xs">
                      <CloudOutlined />
                      <p>DEAD STOCK</p>
                    </span>
                    <div className="flex flex-col gap-2 justify-between mt-2 ">
                      <span className=" bg-red-100 p-2 flex justify-between  gap-2 border-2 border-red-300 rounded-xl">
                        <h1 className="text-sm text-black ">Zyrtec Syr</h1>
                        <h1 className="text-sm text-red-700">60d +</h1>
                      </span>
                      <span className="bg-red-300 p-2 flex justify-between  border border-red-500 rounded-xl">
                        <button className="text-sm text-red-700 font-medium" >Clearance Sale</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}


            {/* 
            <div className='bg-gray-50 shadow-sm border border-gray-200 rounded-xl  p-6'>
              <h1 className="text-sm text-[#6e6e6e]  font-medium">OUTSTANDING & COMPLIANCE</h1>
              <div className="flex flex-col gap-2 mt-2 justify-between">
                <h1 className="text-[14px] text-[#6e6e6e]  font-medium">SUPPLIER DUES</h1>
                <div className="">
                  <span className=" flex flex-row justify-between   items-center gap-2 text-xs ">
                    <h1 className="text-[14px] font-sans font-medium text-black">Wellness Medico</h1>
                    <span className="flex flex-row">
                      <span className="text-red-500 flex items-center">
                        <CurrencyRupee fontSize="" /></span>
                      <h2 className="text-sm text-red-500 font-medium">24.500</h2>
                    </span>
                  </span>
                  <span className="text-black mt-2 flex flex-row justify-between   items-center gap-2 text-xs ">
                    <h1 className="text-[14px] font-sans font-medium">City Distribution</h1>
                    <span className="flex flex-row">
                      <span className="text-black flex items-center">
                        <CurrencyRupee fontSize="" /></span>
                      <h2 className="text-sm font-medium">12.800</h2>
                    </span>
                  </span>
                  <hr className="mt-4 text-gray-300" />
                  <div>
                  </div>
                </div>
                <div className="flex  p-2 rounded-xl border-2 border-[#36a11533] bg-[#36a11533]">
                  <span className="text-green-800 flex items-center gap-2">
                    <Verified />
                    <span className="">
                      <h1 className="text-green-800 font-medium">GST Ready</h1>
                      <span className="text-green-600 font-medium">Quarter fillings done</span>
                    </span>
                  </span>  

                </div>
                <div className="flex  rounded-xl border-2 gap-2 border-[#efd5132f] p-2 bg-[#efd5132f]">
                  <span className="text-yellow-600 flex items-center gap-2">
                    <Error />
                    <span className="">
                      <h1 className="text-yellow-700 text-sm font-medium">License Alert</h1>
                      <span className="text-yellow-600 text-sm font-medium">Renew Narcotic in 12d</span>
                    </span>
                  </span>
                </div>
                <hr className="mt-2 text-gray-300" />
                <span className="flex gap-2 justify-between">
                  <h1 className="text-sm text-gray-500 font-medium">TOTAL PAYABLE</h1>
                  <span className="flex items-center">
                    <CurrencyRupee fontSize="" />
                    37,300
                  </span>
                </span>
              </div>
            </div> */}
          </div>
        </section>
      </section>
      <Outlet />
    </>
  )
}
export default Retailer