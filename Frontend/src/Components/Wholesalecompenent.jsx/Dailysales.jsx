import React from 'react'
import PaymentsIcon from '@mui/icons-material/Payments';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import SellIcon from '@mui/icons-material/Sell';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Doughnut } from "react-chartjs-2";
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from "chart.js";
Chartjs.register(ArcElement, Tooltip, Legend);
import PrintIcon from '@mui/icons-material/Print'; 
const Dailysales = () => {

    const data = [
        { time: "9A", value: 30 },
        { time: "10A", value: 45 },
        { time: "11A", value: 60 },
        { time: "12P", value: 85 },
        { time: "1P", value: 70 },
        { time: "2P", value: 55 },
        { time: "3P", value: 40 },
        { time: "4P", value: 90 },
        { time: "5P", value: 75 },
        { time: "6P", value: 50 },
        { time: "7P", value: 65 },
    ];
    const Ddata = {
        labels: ["Blue", "Green", "Yellow", "Purple"],
        datasets: [
            {
                data: [45, 25, 20, 10],
                backgroundColor: [
                    "#135bec",
                    "#10b981",
                    "#f59e0b",
                    "#8b5cf6"
                ],
                borderWidth: 0
            }
        ]
    };
    const options = {
        cutout: "70%", // donut thickness
        plugins: {
            legend: {
                display: false
            }
        }
    };
    const payments = [
        { name: "UPI", value: "60%", color: "border-blue-500" },
        { name: "Cash", value: "25%", color: "border-emerald-400" },
        { name: "Card", value: "15%", color: "border-amber-400" },
    ]
    const transactions = [
        {
            id: "#ORD-9024",
            customer: "Robert Fox",
            payment: "UPI",
            items: "Paracetamol, B-Complex",
            amount: "₹124.50",
            status: "Success",
        },
        {
            id: "#ORD-9023",
            customer: "Jane Cooper",
            payment: "Cash",
            items: "Insulin Pen, Alcohol Swabs",
            amount: "₹450.00",
            status: "Success",
        },
        {
            id: "#ORD-9022",
            customer: "Cody Fisher",
            payment: "Card",
            items: "Multivitamins Syrup",
            amount: "₹12.20",
            status: "Pending",
        },
    ];
    return (
        <div className='bg-gray-50 font-display text-slate-900 '>
            {/* <!-- Main Content --> */}
            <main className='flex   flex-col min-h-screen'>
                {/* <!-- Dashboard Header: Title and Primary Action --> */}
                <div className='p-10  mb-1'>
                    <h1 className='text-3xl  font-bold mb-2 '>Daily Sales Analytics</h1>
                    <p className='text-sm text-slate-400'> Welcome back,what's happening today,Manage daily sales data and generate insights.</p>
                </div>

                <div className=' mx-12 space-y-8 max-w-6xl '>
                    {/* <!-- KPI Section --> */}
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 '>
                        <div
                            className="bg-white  p-6 rounded-xl border border-slate-200  shadow-sm">
                            <div className="flex justify-between items-start  gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-500">
                                    <PaymentsIcon />
                                </div>
                                <span className="text-emerald-500 text-xs font-bold flex items-center">
                                    <span className="material-symbols-outlined text-sm">trending_up</span> 12.5%
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">₹4,250.00</h3>
                        </div>
                        <div
                            className="bg-white  p-6 rounded-xl border border-slate-200  shadow-sm">
                            <div className="flex justify-between items-start  gap-3 mb-4">
                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-500">
                                    <QueryStatsIcon />
                                </div>
                                <span className="text-emerald-500 text-xs font-bold flex items-center">
                                    <span className="material-symbols-outlined text-sm">trending_up</span> 5.2%
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Growth %</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">+12.5%</h3>
                        </div>
                        <div
                            className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <LocalGroceryStoreIcon />
                                </div>
                                <span className="text-emerald-500 text-xs font-bold flex items-center">
                                    <span className="material-symbols-outlined text-sm">trending_up</span> 8.1%
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Orders</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">142</h3>
                        </div>
                        <div
                            className="bg-white  p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                    <SellIcon />
                                </div>
                                <span className="text-rose-500 text-xs font-bold flex items-center">
                                    <span className="material-symbols-outlined text-sm">trending_down</span> 2.4%
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Avg Order Value</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">₹29.92</h3>
                        </div>
                        <div
                            className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                    <AccessTimeIcon />
                                </div>
                                <span className="text-slate-400 text-xs font-bold flex items-center">Stable</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Peak Sales Hour</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">04:00 PM</h3>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* <!-- Hourly Sales Chart --> */}
                        <div className=' lg:col-span-2 pt-4 border-b border-slate-100   p-6 bg-white   rounded-xl  shadow-sm '>
                            <div className="flex justify-between items-center mb-8">
                                <h4 className="text-base font-bold text-slate-900 ">Hourly Sales (9 AM - 10 PM)</h4>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                    <span className="text-xs text-slate-500 font-medium">Today's Revenue</span>
                                </div>
                            </div>
                            <div className="flex items-end h-64  gap-2">
                                {data.map((item, index) => (
                                    <div key={index} className="flex flex-col flex-1 items-center gap-2">
                                        <div
                                            className="w-full bg-blue-300 hover:bg-blue-500 rounded-t-sm transition-all"
                                            style={{ height: `${item.value}%` }}
                                        ></div>
                                        <span className="text-[10px] text-slate-400 font-bold">
                                            {item.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <!-- Category & Payment Distribution --> */}
                        <div className='space-y-8'>
                            {/* <!-- Category Pie --> */}
                            <div className="bg-white  p-6 rounded-xl border border-slate-200  shadow-sm">
                                <h4 className="text-base font-bold text-slate-900  mb-6">Category-wise Breakdown</h4>
                                <div className="flex items-center gap-15">
                                    <div className="relative h-32 w-32 shrink-0">
                                        <Doughnut data={Ddata} options={options} />
                                    </div>
                                    <div className="flex-1   space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                                <span className="text-xs text-slate-500 font-medium">Tablets</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900 ">45%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                                <span className="text-xs text-slate-500 font-medium">Syrups</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900 dark:text-white">25%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                                <span className="text-xs text-slate-500 font-medium">Injections</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900 dark:text-white">20%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                                <span className="text-xs text-slate-500 font-medium">OTC</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900 dark:text-white">10%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Payment Mode Donut --> */}
                            <div className="bg-white  p-6 rounded-xl border border-slate-200  shadow-sm">
                                <h4 className="text-base font-bold text-slate-900  mb-6">Payment Mode Distribution</h4>
                                <div className="flex items-center justify-around">
                                    {payments.map((item) => (
                                        <div className="flex flex-col items-center gap-1">
                                            <div className={`h-12 w-12 rounded-full border-[6px] ${item.color} flex items-center justify-center`}>
                                                <span className="text-[10px] font-bold">{item.value}</span>
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-bold uppercase mt-1">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
                        {/* <!-- Sales Table --> */}
                        <div className="xl:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            {/* Header */}
                            <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                                <h4 className="text-base font-bold text-slate-900">Recent Sales Transactions</h4>
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold">
                                        <span className="material-symbols-outlined text-sm">
                                            calendar_today
                                        </span>
                                        Today
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold">
                                        <span className="material-symbols-outlined text-sm">
                                            download
                                        </span>
                                        Export CSV
                                    </button>
                                </div>
                            </div>
                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase"> Order ID </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase"> Customer </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase"> Payment </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase"> Items </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase"> Amount </th>

                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase"> Status </th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase"> Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {transactions.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 text-sm font-bold text-blue-600">{item.id}</td>
                                                <td className='px-6 py-4 text-sm font-bold text-blue-600'>{item.customer}</td>
                                                <td className='px-6 py-4'>
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">
                                                        {item.payment}
                                                    </span></td>
                                                <td className='px-6 py-4 text-sm font-bold text-blue-600'>{item.items}</td>
                                                <td className='px-6 py-4 text-sm font-bold text-blue-600'>{item.amount}</td>
                                                <td className='px-6 py-4 text-sm font-bold text-blue-600'>{item.status}</td>
                                                <td className='px-6 py-4px-6 py-4 text-sm font-bold text-blue-600'>
                                                    <button className="text-blue-500 hover:text-blue-700">
                                                        <PrintIcon className='text-sm' />View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* <!-- Top Medicines --> */}
                        <div className=" flex flex-col  bg-white rounded-xl border border-slate-200 shadow-sm ">
                            <div className="p-6 border-b border-slate-200 ">
                                <h4 className="textbase font-bold text-slate-700">Top 5 Medicines</h4>
                            </div>
                            <div className="p-4  flex-1 space-y-4">
                                <div className='flex items-center gap-1'>
                                    <div className="bg-blue-50 flex items-center justify-center h-10 w-10  rounded-lg  text-blue-600 font-bold p-2">01</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900  truncate">Metformin 500mg</p>
                                        <p className="text-xs text-slate-500">Diabetes Care</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-900 ">82</p>
                                        <p className="text-[10px] text-emerald-500 font-bold">₹820.00</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600 font-bold">02</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900  truncate">Amoxicillin
                                            250mg</p>
                                        <p className="text-xs text-slate-500">Antibiotics</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-900 ">64</p>
                                        <p className="text-[10px] text-emerald-500 font-bold">₹512.00</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg font-bold text-green-500 bg-green-50 p-2">03</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900  truncate">Lisinopril 10mg</p>
                                        <p className="text-xs text-slate-500">Cholesterol</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-900 ">51</p>
                                        <p className="text-[10px] text-emerald-500 font-bold">₹408.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* <!-- Profit Summary --> */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200  shadow-sm">
                            <h4 className="text-base font-bold text-slate-900  mb-6">Profit Summary</h4>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-xs text-slate-500 font-medium">Purchase Cost</p>
                                    <p className="text-lg font-bold text-slate-900 ">₹3,120.00</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-slate-500 font-medium">Selling Price</p>
                                    <p className="text-lg font-bold text-slate-900 ">₹4,250.00</p>
                                </div>
                                <div className="space-y-1 border-t border-slate-100  pt-4">
                                    <p className="text-xs text-slate-500 font-medium">Net Profit</p>
                                    <p className="text-xl font-bold text-emerald-500">₹1,130.00</p>
                                </div>
                                <div className="space-y-1 border-t border-slate-100  pt-4">
                                    <p className="text-xs text-slate-500 font-medium">Margin %</p>
                                    <p className="text-xl font-bold text-primary">26.5%</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Returns/Cancelled --> */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="text-base font-bold text-slate-900  mb-6">Returns &amp; Cancellations</h4>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-rose-500">08</span>
                                    <span className="text-xs text-slate-500 font-medium uppercase">Total Count</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-2xl font-bold text-slate-900 ">₹142.20</span>
                                    <span className="text-xs text-slate-500 font-medium uppercase">Refund Amount</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-2 bg-rose-50  rounded-lg">
                                    <span className="material-symbols-outlined text-rose-500 text-sm">error</span>
                                    <span className="text-xs text-slate-700 ">Expired batch returned by
                                        vendor (4)</span>
                                </div>
                                <div className="flex items-center gap-3 p-2 bg-slate-50  rounded-lg">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">cancel</span>
                                    <span className="text-xs text-slate-700 ">Customer change of mind (2)</span>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Quick Actions --> */}
                        <div className="bg-blue-500 p-6 rounded-xl  shadow-lg shadow-primary/20 flex flex-col justify-between">
                            <h4 className="text-base font-bold text-white mb-6">Quick Actions</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all">
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                    <span className="text-[10px] font-bold uppercase">Add Sale</span>
                                </button>
                                <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all">
                                    <span className="material-symbols-outlined">print</span>
                                    <span className="text-[10px] font-bold uppercase">Report</span>
                                </button>
                                <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all">
                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                    <span className="text-[10px] font-bold uppercase">PDF</span>
                                </button>
                                <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all">
                                    <span className="material-symbols-outlined">mail</span>
                                    <span className="text-[10px] font-bold uppercase">Email</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div>
    )
}
export default Dailysales 