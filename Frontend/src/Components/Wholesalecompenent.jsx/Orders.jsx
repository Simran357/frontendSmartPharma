import React from 'react'

const Orders = () => {
  return (
    <div className="flex">  
  <main className=" flex-1 flex flex-col overflow-x-hidden">
    <header className="hidden sm:flex sm:h-16  px-14 border-b border-slate-200  items-center justify-between bg-white/80  backdrop-blur-md sticky top-0 z-40">
      <div>
        <h2 className="text-xl font-bold">Fulfillment Dashboard</h2>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-full max-w-md  ">
          <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-slate-100  border-none rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none placeholder-slate-400"
            placeholder="Search orders, retailers, or SKUs..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-4">  
          <button className="relative p-2 text-slate-500 hover:bg-slate-100  rounded-full transition-colors">
            <span className="material-icons-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white  rounded-full" />
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-10  rounded-full transition-colors">
            <span className="material-icons-outlined">settings</span>
          </button>
          
          <button className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap text-white px-2    rounded-xl font-semibold text-sm flex items-center  shadow-sm transition-all active:scale-95">
            <span className="material-icons-outlined   text-sm">add</span> 
            Create Manual Order
          </button> 
        </div>
      </div>
    </header> 
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-2  ms:grid-cols-3 md:grid-cols-3 gap-4"> 
        <div className="bg-card-light  p-6 rounded-2xl shadow-sm border border-slate-200  relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50  rounded-xl flex items-center justify-center text-orange-500">
              <span className="material-icons-outlined">inventory</span>
            </div>
            <span className="text-[11px] font-bold text-orange-600  bg-orange-50  px-2 py-1 rounded">
              High Priority
            </span>
          </div>
          <p className="text-sm text-slate-500  font-medium">
            Orders to Pack
          </p>
          <h3 className="text-3xl font-bold mt-1">24</h3>
          <p className="text-xs text-slate-400 mt-2">
            8 requiring expedited shipping
          </p>
        </div>
        <div className="bg-card-light  p-6 rounded-2xl shadow-sm border border-slate-200  group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50  rounded-xl flex items-center justify-center text-primary">
              <span className="material-icons-outlined">local_shipping</span>
            </div>
          </div>                                                                     
          <p className="text-sm text-slate-500  font-medium">
            Pending Shipments
          </p>
          <h3 className="text-3xl font-bold mt-1">12</h3>
          <p className="text-xs text-slate-400 mt-2">
            Ready for carrier pickup
          </p>
        </div>
        <div className="bg-card-light  p-6 rounded-2xl shadow-sm border border-slate-200  group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50  rounded-xl flex items-center justify-center text-green-500">
              <span className="material-icons-outlined">add_shopping_cart</span>
            </div>
            <span className="text-[11px] font-bold text-green-600  bg-green-50  px-2 py-1 rounded">
              +3 New
            </span> 
          </div>
          <p className="text-sm text-slate-500  font-medium">
            New Orders
          </p>
          <h3 className="text-3xl font-bold mt-1">8</h3>
          <p className="text-xs text-slate-400 mt-2">
            Received in the last 4 hours
          </p>
        </div>
      </div>
      <div className="bg-card-light  rounded-2xl shadow-sm border border-slate-200  overflow-hidden">
        <div className="p-6 border-b border-slate-100  flex items-center justify-between">
          <h3 className="font-bold text-lg">Recent Orders</h3>
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100  p-1 rounded-lg">
              <button className="px-3 py-1.5 text-xs font-semibold bg-white  rounded shadow-sm">
                All Statuses
              </button>
              <button className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700">
                Unfulfilled
              </button>
            </div>
            <button className="text-xs font-semibold text-slate-600  hover:text-primary flex items-center gap-1">
              <span className="material-icons-outlined text-sm">
                file_download
              </span>
              Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400  uppercase tracking-wider border-b border-slate-100 ">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Retailer Name</th>
                <th className="px-6 py-4">Order Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total Value</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 ">
              <tr className="hover:bg-slate-50  transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-primary hover:underline cursor-pointer">
                    #ORD-7732
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  Urban Goods Co.
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Oct 12, 2023, 09:45 AM
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50  text-blue-600  uppercase">
                    Processing
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">$2,450.00</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-semibold text-primary hover:text-blue-700 transition-colors">
                    Start Packing
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50  transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-primary hover:underline cursor-pointer">
                    #ORD-7731
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  City Retailers
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Oct 12, 2023, 08:30 AM
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-orange-50  text-orange-600  uppercase">
                    Packing
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">$1,120.00</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-semibold text-primary hover:text-blue-700 transition-colors">
                    Print Label
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50  transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-primary hover:underline cursor-pointer">
                    #ORD-7730
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">Metro Mart</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Oct 11, 2023, 04:15 PM
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-green-50  text-green-600  uppercase">
                    Shipped
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">$3,890.00</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-semibold text-slate-600  hover:text-primary transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50  transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-primary hover:underline cursor-pointer">
                    #ORD-7729
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  Boutique Finds
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Oct 11, 2023, 11:20 AM
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50  text-blue-600  uppercase">
                    Processing
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">$850.00</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-semibold text-primary hover:text-blue-700 transition-colors">
                    Start Packing
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50  transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-primary hover:underline cursor-pointer">
                    #ORD-7728
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">Global Supply</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  Oct 10, 2023, 02:50 PM
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-green-50  text-green-600  uppercase">
                    Shipped
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">$12,400.00</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-semibold text-slate-600  hover:text-primary transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-100  flex items-center justify-between">
          <p className="text-xs text-slate-500 ">
            Showing 1 to 5 of 248 orders
          </p>
          <div className="flex items-center gap-2">
            <button className="p-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-icons-outlined text-lg">
                chevron_left
              </span>
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">
              1
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600  hover:bg-slate-100  text-xs font-bold transition-colors">
              2
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600  hover:bg-slate-100  text-xs font-bold transition-colors">
              3
            </button>
            <button className="p-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-icons-outlined text-lg">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
 </div>
  )
}

export default Orders
