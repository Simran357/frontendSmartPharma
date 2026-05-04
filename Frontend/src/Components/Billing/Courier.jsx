
import React from 'react'

const Connectcourier = () => {
  return (
    <>
      
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-72 bg-white border-r p-6">
        <h2 className="text-md font-semibold mb-2">Configuration</h2>
        <p className="text-sm text-green-500 mb-6">
          Enter shipment details to calculate
        </p>

        <p className="text-xs font-semibold text-green-500 mb-2">
          LOGISTICS ROUTE
        </p>

        <div className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="Origin PIN (e.g. 400001)"
            className="w-full border rounded-lg px-3 py-2  text-sm"
          />
          <input
            type="text"
            placeholder="Destination PIN (e.g. 560001)"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <p className="text-xs font-semibold text-green-500 mb-2">
          WEIGHT & VOLUME
        </p>

        <div className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="Weight (kg)"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <div className="grid grid-cols-3 gap-2">
            <input placeholder="L (cm)" className="border rounded-lg px-2 py-2 text-sm" />
            <input placeholder="W (cm)" className="border rounded-lg px-2 py-2 text-sm" />
            <input placeholder="H (cm)" className="border rounded-lg px-2 py-2 text-sm" />
          </div>
        </div>

        <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
          Calculate Rates
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-2">Shipping Rate Comparison</h1>
        <p className="text-green-600 text-sm mb-6">
          Real-time rates for 5kg package from Mumbai (400001) to Bangalore (560001)
        </p>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-6">
          <button className="pb-3 border-b-2 border-green-600 font-medium">
            All Rates
          </button>
          <button className="pb-3 text-gray-500">Cheapest</button>
          <button className="pb-3 text-gray-500">Fastest</button>
        </div>

        {/* Rate Cards Grid */}
        <div className="grid grid-col-1 md:grid-cols-2 gap-4">

          {/* Card */}
          <div className="bg-white rounded-xl border-2 border-green-500 p-4 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">BlueDart Express</h3>
                <p className="text-sm text-green-500">Air Freight Service</p>
              </div>
              <span className="text-xs bg-green-100 whitespace-nowrap text-green-600 px-3 py-1 rounded-full">
                BEST VALUE
              </span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <div>
                <p className="text-green-500">ESTIMATED DELIVERY</p>
                <p className="font-medium">Oct 26 (2 Days)</p>
              </div>
              <div>
                <p className="text-green-500">RELIABILITY</p>
                <p className="text-green-500">★★★★★</p>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-green-400">Base: ₹340 + Surcharges</p>
                <p className="text-2xl font-bold">₹412.50</p>
              </div>

              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Select & Label
              </button>
            </div>
          </div>

          {/* Second Card */}
          <div className="bg-white rounded-xl border-white border p-4 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">FedEx Priority</h3>
                <p className="text-sm text-green-500">Overnight Express</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                FASTEST
              </span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <div>
                <p className="text-green-500">ESTIMATED DELIVERY</p>
                <p className="font-medium">Tomorrow, 10 AM</p>
              </div>
              <div>
                <p className="text-green-500">RELIABILITY</p>
                <p className="text-green-500">★★★★★</p>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-green-500">Base: ₹650 + Surcharges</p>
                <p className="text-2xl font-bold">₹785.00</p>
              </div>

              <button className="bg-black text-white px-4 py-2 rounded-lg">
                Select & Label
              </button>
            </div>
          </div>

             {/* Card 3 */}
            <div className="bg-white rounded-xl  border-white border p-4 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
              <h3 className="font-semibold text-lg">Delhivery Surface</h3>
              <p className="text-sm text-green-500">Standard Ground</p>
                 </div>
                  </div>

              <div className="flex justify-between text-sm mb-4">
                         <div>
               <p className="text-green-500">ESTIMATED DELIVERY</p>
                 <p className="font-medium">Oct 29 (5 Days)</p>
                   </div>
                        <div>
                 <p className="text-green-500">RELIABILITY</p>
                     <p className="text-green-500">★★★★☆</p>
                        </div>
                          </div>

             <div className="border-t pt-4 flex justify-between items-center">
                 <div>
                  <p className="text-sm text-green-500">Base: ₹180 + Surcharges</p>
                     <p className="text-2xl font-bold">₹245.00</p>
                       </div>
               <button className="bg-black text-white px-4 py-2 rounded-lg">
             Select & Label
            </button>
            </div>
             </div>

                  {/* Card 4 */}
          <div className="bg-white rounded-xl border-white  border p-4 shadow-sm">
           <div className="flex justify-between items-start mb-4">
           <div>
            <h3 className="font-semibold text-lg">DHL Express</h3>
            <p className="text-sm text-green-500">Premium International</p>
             </div>
             </div>

          <div className="flex justify-between text-sm mb-4">
            <div>
          <p className="text-green-500">ESTIMATED DELIVERY</p>
           <p className="font-medium">Oct 26 (2 Days)</p>
           </div>
           <div>
         <p className="text-green-500">RELIABILITY</p>
         <p className="text-green-500">★★★★☆</p>
           </div>
           </div>

         <div className="border-t pt-4 flex justify-between items-center">
             <div>
         <p className="text-sm text-green-500">Base: ₹180 + Surcharges</p>
           <p className="text-2xl font-bold">₹680.00</p>
             </div>
          <button className="bg-white text-black px-4 py-2 rounded-lg">
          Select & Label
              </button>
                </div>
                </div>
                </div>
                 </div>
                   </div>
                  </>
  )
}

export default Connectcourier