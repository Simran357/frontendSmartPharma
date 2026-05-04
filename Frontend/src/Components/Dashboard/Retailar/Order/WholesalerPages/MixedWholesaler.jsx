import { Download, Verified } from '@mui/icons-material'
import React from 'react'
import { Table, Tag } from 'antd';
import { DollarSign, DollarSignIcon, PlusIcon } from 'lucide-react';

const MixedWholesaler = () => {
  const data = [
  {
    id: 1,
    type: "medicine",
    status: "match",
    medicine: "Amoxicillin 500mg",
    company: "GlaxoSmithKline • 10x10 Strip",
    qty: 20,
    price: 4.2,
    subtotal: 84
  },

  {
    id: 2,
    type: "alternative",
    medicine: "Amoxicillin 500mg (Brand A)",
    qty: 100,
    oldPrice: 95,
    suggested: "Generic Amox-Gen",
    price: 72
  },

  {
    id: 3,
    type: "outofstock",
    medicine: "EpiPen 2-Pak (0.3mg)",
    message: "Backordered. Next availability 05/12"
  },

  {
    id: 4,
    type: "medicine",
    status: "match",
    medicine: "Paracetamol 650mg",
    company: "Generic • 1000 Count Jar",
    qty: 100,
    price: 1.1,
    subtotal: 110
  }
];

const statusDot = {
  match: "bg-green-500",
  alt: "bg-orange-400",
  missing: "bg-red-500"
};

const statusText = {
  match: "text-green-600",
  alt: "text-orange-500",
  missing: "text-red-500"
};
  return (
    <>
               <div className="flex flex-col lg:flex-row min-h-screen">
                   <div className="bg-white p-4 w-full lg:w-[22%] border-b lg:border-b-0 lg:border-r border-gray-200">
                       <div className='flex justify-between'>
                           <h1 className='text-gray-600 text-xs font-bold uppercase tracking-wide'>Active Quotes</h1>
                           <span className='text-xs text-blue-600 rounded-xl px-2 bg-blue-400/30'>3 Available </span>
                       </div>
                       <div className='bg-blue-200/10  rounded-xl  border-blue-600 p-4 border-2 mt-2 '>
                           <div className=' flex justify-between items-center'>
                               <div>
                                   <h1 className='font-bold '>MedLink Pharma </h1>
                                   <span className='text-xs text-gray-400'>ETA: 4hrs Reliable</span>
                               </div>
                               <span className='text-blue-600'><Verified /></span>
                           </div>
                           <div className='mt-2'>
                               <div className='mt-2'>
                                   <span className='flex justify-between '>
                                       <h1 className='text-xs font-bold '>Fullfilment</h1>
                                       <p className='text-blue-600 text-xs '>92%</p>
                                   </span>
                                   <div className='w-full  bg-gray-200 h-2 rounded-full overflow-hidden focus:ring-0 '>
                                       <div className='w-[92%] bg-blue-600 h-2 rounded-full overflow-hidden focus:ring-0 '></div>
                                   </div>
                                   <span className=''>
                                       <p className='text-[10px] text-gray-400'>8 Items MISSING 2 ALTERNATIVE </p>
                                   </span>
                               </div>
                           </div>
                       </div>
                       <div className='bg-blue-200/10  rounded-xl  border-gray-600 p-4 border-2 mt-2 '>
                           <div className=' flex justify-between items-center'>
                               <div>
                                   <h1 className='font-bold '>Mohali Drug House </h1>
                                   <span className='text-xs text-gray-400'>ETA: 2hrs Standard</span>
                               </div>
                           </div>
                           <div className='mt-2'>
                               <div className='mt-2'>
                                   <span className='flex justify-between '>
                                       <h1 className='text-xs font-bold '>Fullfilment</h1>
                                       <p className='text-gray-400 text-xs '>8%</p>
                                   </span>
                                   <div className='w-full  bg-gray-200 h-2 rounded-full overflow-hidden focus:ring-0 '>
                                       <div className='w-[8%] bg-gray-400 h-2 rounded-full overflow-hidden focus:ring-0 '></div>
                                   </div>
                                   <span className=''>
                                       <p className='text-[10px] text-gray-400'>92 Items MISSING 0 ALTERNATIVE </p>
                                   </span>
                               </div>
                           </div>
                       </div>
                            
                            <hr className='text-gray-400 mt-4 mb-4'/>

   
                       <div className='bg-blue-200/10  rounded-xl  border-gray-400 p-4 border-2 mt-2 '>
                           <div className=' flex justify-between items-center'>
                               <div>
                                   <h1 className='font-bold '>Apex Distributors </h1>
                                   <span className='text-xs text-gray-400'>ETA: 6hrs Standard</span>
                               </div>
                           </div>
                           <div className='mt-2'>
                               <div className='mt-2'>
                                   <span className='flex justify-between '>
                                       <h1 className='text-xs font-bold '>Fullfilment</h1>
                                       <p className='text-gray-400 text-xs '>78%</p>
                                   </span>
                                   <div className='w-full  bg-gray-200 h-2 rounded-full overflow-hidden focus:ring-0 '>
                                       <div className='w-[78%] bg-gray-400 h-2 rounded-full overflow-hidden focus:ring-0 '></div>
                                   </div>
                                   <span className=''>
                                       <p className='text-[10px] text-gray-400'>12 Items MISSING 5 ALTERNATIVE </p>
                                   </span>
                               </div>
                           </div>
                       </div>
   
   
                       <div className='bg-blue-200/10  rounded-xl  border-gray-400 p-4 border-2 mt-2 '>
                           <div className=' flex justify-between items-center'>
                               <div>
                                   <h1 className='font-bold '>Chandigarh Distributors </h1>
                                   <span className='text-xs text-gray-400'>ETA: 3hrs Standard</span>
                               </div>
                           </div>
                           <div className='mt-2'>
                               <div className='mt-2'>
                                   <span className='flex justify-between '>
                                       <h1 className='text-xs font-bold '>Fullfilment</h1>
                                       <p className='text-gray-400 text-xs '>22%</p>
                                   </span>
                                   <div className='w-full  bg-gray-200 h-2 rounded-full overflow-hidden focus:ring-0 '>
                                       <div className='w-[22%] bg-gray-400 h-2 rounded-full overflow-hidden focus:ring-0 '></div>
                                   </div>
                                   <span className=''>
                                       <p className='text-[10px] text-gray-400'>22 Items MISSING 2 ALTERNATIVE </p>
                                   </span>
                               </div>
                           </div>
                       </div>
                       <div>
                       </div>
                   </div>
   
                   <section className="w-full lg:w-[48%] flex-2">
                       <div className="p-4 md:p-6 overflow-x-auto">
                           <div className=''>
                               <h1 className='font-bold text-xl '>Mixed Wholesaler Order</h1>
                               <p className='text-[10px] text-gray-400'>Reviewing 48 line items for dispatch</p>
                           </div>
                           <div className="flex flex-wrap gap-2">
                               <button className='flex items-center gap-2 border border-gray-200 p-2 rounded-lg'>
                                   <Download fontSize='xs' />  Export</button>
                               <button className=' text-white bg-blue-600 p-2 rounded-lg text-xs '>
                                   Approve & Send Order</button>
                           </div>
                       </div>
   
<div className="bg-white border border-gray-200 rounded-xl m-6">

  {/* Header */}
  <div className="grid grid-cols-7 text-xs font-bold text-gray-500 px-6 py-3 ">
  <div>STATUS</div>
  <div className="col-span-2">MEDICINE NAME</div>
  <div>QTY</div>
  <div>UNIT PRICE</div>
  <div>SUBTOTAL</div>
  <div>ACTION</div>
</div>

  {data.map((item) => {

    /* ---------- MEDICINE ROW ---------- */
 if (item.type === "medicine") {
  return (
    <div key={item.id} className="">

      <div className="grid grid-cols-7 items-center px-6 py-4 hover:bg-gray-100">

        {/* STATUS */}
        <div className="flex items-center gap-2 text-sm">
          <span className={`w-2 h-2 rounded-full ${statusDot[item.status]}`}></span>
          <span className={statusText[item.status]}>
            {item.status}
          </span>
        </div>

        {/* MEDICINE */}
        <div className="col-span-2">
          <p className="font-semibold text-sm">{item.medicine}</p>
          <p className="text-xs text-gray-400">{item.company}</p>
        </div>

        {/* QTY */}
        <div>{item.qty}</div>

        {/* PRICE */}
        <div>${item.price}</div>

        {/* SUBTOTAL */}
        <div className="font-semibold">${item.subtotal}</div>

        {/* ACTION */}
        <div>
          <button className="text-blue-600 text-sm font-medium">
            Change
          </button>
        </div>

      </div>

      {/* Suggestion Row */}
      {item.suggestion && (
        <div className="mx-6 mb-4 bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between items-center">

          <div>
            <p className="font-semibold text-green-700 text-sm">
              Switch to Atorva-20 (Generic)
            </p>
            <p className="text-xs text-gray-500">
              Same formula, lower cost per unit
            </p>
          </div>

          <div className="flex items-center gap-4">

            <span className="text-green-700 text-xs font-semibold bg-green-100 px-2 py-1 rounded-full">
              +4.2% Margin Gain
            </span>

            <button className="bg-green-600 text-white px-4 py-1 rounded-lg text-xs font-semibold">
              Swap Now
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
    /* ---------- ALTERNATIVE CARD ---------- */
    if (item.type === "alternative") {
      return (
        <div key={item.id} className="p-6">

          <div className="border border-yellow-300 bg-yellow-50 rounded-xl p-4">

            <p className="text-xs font-bold text-yellow-700 mb-3">
              ALTERNATIVE SUGGESTED
            </p>

            {/* Original */}
            <div className="flex justify-between items-center bg-white border rounded-lg p-3 mb-2">

              <div>
                <p className="font-semibold text-sm">{item.medicine}</p>
                <p className="text-xs text-gray-400">
                  Original Request • Qty: {item.qty}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  SHORTAGE
                </span>

                <p className="text-gray-400 line-through">${item.oldPrice}</p>
              </div>

            </div>

            {/* Suggested */}
            <div className="flex justify-between items-center bg-white border rounded-lg p-3">

              <div>
                <p className="font-semibold text-sm">
                  Suggested: {item.suggested}
                </p>
                <p className="text-xs text-gray-400">
                  Immediate Availability
                </p>
              </div>

              <div className="flex items-center gap-4">

                <div className="text-right">
                  <p className="font-semibold">${item.price}</p>
                  <p className="text-xs text-green-600 font-medium">
                    +4% Margin
                  </p>
                </div>

                <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs">
                  Switch
                </button>

              </div>

            </div>

          </div>

        </div>
      );
    }

    /* ---------- OUT OF STOCK ---------- */
    if (item.type === "outofstock") {
      return (
        <div key={item.id} className="p-6">

          <div className="border border-red-300 border-dashed bg-red-50 rounded-xl p-4 flex justify-between items-center">

            <div>
              <p className="font-semibold text-sm">{item.medicine}</p>
              <p className="text-xs text-gray-400">{item.message}</p>
            </div>

            <button className="text-green-600 text-sm font-semibold">
              Find other supplier
            </button>

          </div>

        </div>
      );
    }

  })}

</div>
   
                   </section>
                   <section className="bg-white w-full lg:w-[30%] border-t lg:border-t-0 lg:border-l border-gray-200">
                       <div className='p-6 mt-2'>
                           <h1 className='text-xs font-bold text-slate-400'>ORDER SUMMARY</h1>
                           <div className='mt-4'>
                               <h1 className='text-slate-400 text-[10px] '>Total Order Value</h1>
                               <p className='flex gap-2 items-center text-xl font-bold'><DollarSignIcon fontSize='xs' />4,520.50</p>
                           </div>
                           <div className='mt-4'>
                               <h1 className='text-slate-400 text-[10px] '>Items Count</h1>
                               <p className='font-bold'>48 Line Items</p>
                           </div>
   
                           <hr className='text-slate-400 mt-1' />
                           <section className='mt-4' >
   
                               <div>
                                   <h1 className='text-slate-400 font-bold text-xs'>MARGIN IMPACT</h1>
                                   <span className='flex justify-between mt-4'>
                                       <h1 className='text-xs text-slate-600'>Current Margin</h1>
                                       <p className='text-black font-bold'>12.4%</p>
                                   </span>
                                   <div className='w-full h-4 bg-slate-300 rounded-full mt-2 overflow-hidden focus:ring-1'>
                                       <div className='w-[12.4%] h-4 bg-slate-600 rounded-full overflow-hidden focus:ring-1'> </div>
                                   </div>
                                   <span className='flex justify-between mt-4'>
                                       <h1 className='text-xs text-green-600'>Potential Margin</h1>
                                       <p className='text-green-600 font-bold'>16.4%</p>
                                   </span>
                                   <div className='w-full h-4 bg-green-300/20 mt-2 rounded-full overflow-hidden focus:ring-1'>
                                       <div className='w-[16.8%] h-4 bg-green-600 rounded-full overflow-hidden focus:ring-1'></div>
                                   </div>
                               </div>
   
                               <div className='mt-6 bg-blue-300/20 border border-blue-300 p-4 rounded-xl '>
                                   <span className='text-blue font-bold flex items-center '>
                                       <h1 className='text-blue-400 text-[10px] '>Profit Opportunity</h1>
                                   </span>
                                   <p className='flex text-lg font-bold'><PlusIcon fontSize="xs" /> <DollarSign fontSize="small" />184.20</p>
                                   <span>Extra profit identified by switching to 4 sugggested alternative brands</span>
                               </div>
                           </section>
   
                           <div className="flex justify-center mt-10">
                               <button className='text-white bg-blue-600 rounded-lg w-full p-2 font-bold'>Finalize Order</button>
   
                           </div>
                           <div className='mt-2 flex justify-center'>
                               <p className='text-slate-400 text-[10px] '>Updated 2 mins ago</p>
                           </div>
   
   
                       </div>
                   </section>
               </div>
   
           </>
  )
}

export default MixedWholesaler