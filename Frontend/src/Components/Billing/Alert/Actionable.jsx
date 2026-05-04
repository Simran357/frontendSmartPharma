import React from 'react'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BoltIcon from '@mui/icons-material/Bolt';
import LoopIcon from '@mui/icons-material/Loop';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BlockIcon from '@mui/icons-material/Block';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Actionable = () => {
  return (
    <>
      <div className="min-h-screen bg-[#f6f9f6] p-6">
        <div className="mx-auto relative">
          <div className=' -top-9 absolute -left-2 m-2'>
            <div className='  border p-4  gap-6 border-gray-300 bg-white rounded-md justify-between flex items-center w-full lg:max-w-md'>
              {/* Critical */}
              <div className='flex items-center gap-2'>
                <span className='flex items-center gap-2 bg-red-500 text-white px-4 py-1 rounded-md font-semibold'>
                  Critical
                  <span className='bg-white text-red-500 w-6 h-6 flex items-center justify-center rounded-full text-xs'>
                    12
                  </span>
                </span>
              </div>

              {/* Warning */}
              <div className='flex items-center gap-2'>
                <span className='text-green-500 font-semibold'>Warning</span>
                <span className='bg-yellow-400 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold'>
                  5
                </span>
              </div>

              {/* Info */}
              <div className='flex items-center gap-2'>
                <span className='text-blue-500 font-semibold'>Info</span>
                <span className='bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold'>
                  12
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute right-4 flex gap-2 items-center '>
          <p className='whitespace-nowrap'>Sort By:</p>
          <select className='flex justify-between gap-4 border border-slate-300 rounded-xl shadow-xl bg-white p-2'>
            <option className=' w-full  bg-slate-200 rounded'>Newest First</option>
          </select>
          <button className='border border-slate-200 rounded-xl px-4 py-2 bg-white w-full'>filter</button>
        </div>
        {/*Boxes*/}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16 gap-6'>
          <div className="bg-white p-6 rounded-lg border-l-4 border-red-500 space-y-4">
            <div className='flex justify-between'>
              <span className='bg-red-500 text-red-200 p-1 rounded'>LOGISTICS FAILURE</span>
              <span className='text-green-600'>14 mins ago</span>
            </div>
            <h2 className='font-black  text-md '>Critical Delivery Delay</h2>
            <p className='text-green-500'>Batch ID #7721 (Insulin Cold Chain) is delayed by 4 hours. Temperature integrity sensor
              reporting 8°C. Immediate tracking required.
            </p>
            <div className='border border-black rounded p-4 flex items-center gap-2'> <MedicalServicesIcon sx={{ fontSize: 40, color: "#2e7d32" }} />Courier:ExpressWay Logistics</div>

            <div className='flex  p-4  my-4 mt-6 gap-4  justify-between'>
              <span className='bg-red-500  text-center text-white w-full  p-3 rounded-full'> <LocalShippingIcon /> Courier</span>
              <span className='bg-white text-black inline-block text-center  w-24 p-2 rounded'>Dismiss</span>
            </div>
          </div>

          {/*box2*/}
          <div className="bg-white p-6 rounded-lg border-l-4 border-red-500 space-y-4">
            <div className='flex justify-between'>
              <span className='bg-red-500 text-red-200 p-1 rounded'>INVENTORY GAP</span>
              <span className='text-green-600'>2 hours ago</span>
            </div>
            <h1 className='text-black font-bold text-md'>Shortage Alert: Top Seller</h1>
            <p className='text-green-500'>Dolo 650mg is currently out of stock. Estimated Loss: ₹4,500/day. High demand spike detected in your locality (Counter 01 & 03).</p>
            <div className="mt-6">

              {/* Boxes Section */}
              <div className="flex gap-4 mb-6">
                <div className="bg-green-200 border border-green-200 p-3 flex-1 rounded">
                  <span className="text-green-700">CURRENT STOCK</span>
                  <span className="text-red-500 block">0 Units</span>
                </div>
                <div className="bg-green-200 border border-green-200 p-3 flex-1 rounded">
                  <span className="text-green-700">MONTHLY AVG</span>
                  <span className="text-black block">1,420 Units</span>
                </div>
              </div>
              <div className="flex gap-4 ">
                <div className="bg-red-500 border border-red-200 p-3 flex-1 items-center flex justify-center rounded-full">
                  <span className="text-white"><BoltIcon /> QuickReorder</span></div>
                <div className='bg-white border border-blue-50 p-2 rounded-md items-center flex justify-between'>
                  <span className="text-black ">Find Alt</span>
                </div>
              </div>
            </div>
          </div>

          {/*box3*/}
          <div className="bg-white p-6 rounded-lg border-l-4 border-red-500  space-y-4">
            <div className='flex justify-between'>
              <span className='bg-red-500 text-red-200 p-1 rounded'>COMPLIANCE RISK</span>
              <span className='text-green-600'>System Alert</span>
            </div>
            <h1 className='text-black font-bold text-md'>License Renewal Overdue</h1>
            <p className='text-green-500'>Retail pharmacy license(Reg #MH-10229) expires in 48 hours. Billing for Narcotic drug will be blocked automatically on expiry.</p>
            <div className="mt-6"></div>
            <div className='border border-red-200 p-4 text-red-500'><NotificationsActiveIcon /> Auto-Block Schedule:Dec 14,00:00 AM</div>
            <div className="flex mt-8 gap-4 ">
              <div className="bg-red-500 border border-red-200 p-3 flex-1 items-center flex justify-center rounded-full">
                <span className="text-white"><LoopIcon /> Renew Now</span></div>
              <div className='bg-white border border-blue-50 p-2 rounded-md items-center flex justify-between'>
                <span className="text-black ">Docs</span>
              </div>
            </div>
          </div>


          {/*box4*/}
          <div className="bg-white p-6 rounded-lg border-l-4 border-yellow-500 space-y-4">
            <div className='flex justify-between'>
              <span className='bg-yellow-100 text-yellow-400 p-1 rounded-md'>STOCK EXPIRY</span>
              <span className='text-green-600'>1 day ago</span>
            </div>
            <h1 className='text-black font-bold text-md'>Near-Expiry Warning</h1>
            <p className='text-green-500'>Augmentin 625 DUO (Batch A22) has 45 units expiring in 30 days. Liquidation value:₹12,400.</p>
            <div className="border border-amber-200 rounded-md p-2
            bg-[linear-gradient(to_right,#fbbf24_90%,white_90%)]">
            </div>
            <div className='flex justify-between'>
              <span className='text-green-500'>Self-through Rate</span>
              <span className='text-amber-500'>85% risk</span>
            </div>
            <div className="flex mt-8 gap-4 ">
              <div className="bg-amber-400 border border-amber-200 p-3 rounded-full flex-1 items-center flex justify-center ">
                <span className="text-white">% Discount</span></div>
              <div className='bg-white border border-blue-50 p-2 rounded-md items-center flex justify-between'>
                <span className="text-black ">Return</span>
              </div>
            </div>
          </div>

          {/*box5*/}
          <div className="bg-white p-6 rounded-lg  border-l-4 border-yellow-500  flex flex-col gap-4  ">
            <div className='flex justify-between'>
              <span className='bg-yellow-100 text-yellow-400 p-1 rounded-md'>QUALITY CONTROL</span>
              <span className='text-green-600'>4 hours ago</span>
            </div>
            <h1 className='text-black font-bold text-md'>Recalled Batch Detected</h1>
            <p className='text-green-500'>Health Minister notice on Batch #B990 (Anti-acid syrup). Traces of impurities found. 12 units currently in stock.</p>
            <div className="flex justify-between mt-auto w-full">
              <div className="bg-amber-400 border border-amber-200 p-3 flex-1 text-center rounded-full  ">
                <span className="text-white">
                  <BlockIcon /> Block Reorder</span></div>
              <div className='bg-white border border-blue-50 p-2  rounded-md items-center flex justify-between'>
                <span className="text-black ">Quarntine</span>
              </div>
            </div>
          </div>


          {/*box6*/}
          <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500 space-y-4">
            <div className='flex justify-between'>
              <span className='bg-blue-100 text-blue-400 p-1 rounded-md'>WHOLESALE INSIGHT</span>
              <span className='text-green-600'>Just now</span>
            </div>
            <h1 className='text-black font-bold text-md'>Price Drop Alert</h1>
            <p className='text-green-500'>ABC Pharma offering 5% additional bulk discount on generic Paracetamol for the next 24 hours. High profit margin potential.</p>
            <div className="flex mt-20 gap-4 ">
              <div className="bg-blue-400 border border-amber-200 p-3 rounded-full flex-1 items-center flex justify-center">
                <span className="text-white"><ShoppingCartIcon /> Analyze Order</span></div>
              <div className='bg-white border border-blue-50 p-2 rounded-md items-center flex justify-between'>
                <span className="text-black ">Snooze</span>
              </div>
            </div>
          </div>
        </div>
        {/* Horizontal line */}
        <div className='border-t border-black my-4'>
          <div className='max-w-7xl mx-auto px-4'>
            <div className='flex items-center justify-between mt-4'>
              {/* LEFT SIDE CONTENT */}
              <div className='flex items-center gap-4'>
                <span className='text-green-500'>GLOBAL STATUS:</span>
                <span className='flex items-center gap-2 border text-green-500 bg-green-200 border-green-300 rounded-md px-2'>
                  <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                  Inventory Sync: Active
                </span>

                <span className='flex items-center gap-2 border text-red-600 bg-red-200 border-red-500 rounded-md px-2'>
                  <span className='w-2 h-2 bg-red-600 rounded-full'></span>
                  3 Critical Alerts Pending
                </span>
              </div>

              {/* RIGHT SIDE CONTENT */}
              <div className='flex gap-4'>
                <span className='text-black rounded-md border p-2 border-gray-300'>
                  Export Report
                </span>

                <span className='text-white bg-black rounded-md border p-2 border-gray-300'>
                  Alert History (Alt+H)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}
export default Actionable