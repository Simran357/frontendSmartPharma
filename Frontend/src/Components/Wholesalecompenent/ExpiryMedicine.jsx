import React from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DangerousIcon from '@mui/icons-material/Dangerous';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement);
import { useEffect, useState } from "react";
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";
const ExpiryMedicine = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axiosInstance.get("/registerroute/getExpiryProduct");
            setProducts(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };
    const today = new Date();

        const expiryData = products.map((item) => {
        const expDate = new Date(item.ProductExpiryDate);

        const diffTime = expDate - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let status = "Safe";

        if (daysLeft <= 0) status = "Expired";
        else if (daysLeft <= 30) status = "Warning";
        else if (daysLeft <= 60) status = "Critical";

        return {
            ...item,
            daysLeft,
            status,
            stockValue: item.ProductQuantity * item.ProductPrice,
        };
    });

    const expiredCount = expiryData.filter(item => item.status === "Expired").length;

    const nearExpiryCount = expiryData.filter(item => item.status === "Warning").length;

    const safeStockCount = expiryData.filter(item => item.status === "Safe").length;

    const totalLoss = expiryData
        .filter(item => item.status === "Expired")
        .reduce((acc, item) => acc + item.stockValue, 0);

   

    const getStatusStyle = (status) => {
        if (status === "Critical") {
            return "bg-red-100 text-red-600";
        }
        if (status === "Warning") {
            return "bg-yellow-100 text-yellow-600";
        }
        return "bg-red-600 text-white";
    };
    const getBarColor = (status) => {
        if (status === "Critical") return "bg-red-500";
        if (status === "Warning") return "bg-yellow-500";
        return "bg-gray-400";
    };




    return (
        <div className='bg-gray-50 font-display text-slate-900'>
            {/* <!-- Main Content --> */}
            <main className=' min-h-screen'>
                {/* <!-- Dashboard Header: Title and Primary Action --> */}
                <div className="p-5 max-w-1600px mx-auto space-y-8">
                    {/* <!-- Page Header --> */}
                    <div className="flex justify-between items-end pt-5">
                        <div>
                            <h2 className="text-4xl font-extrabold font-headline tracking-tight text-blue-600">Expiry Manager</h2>
                            <p className="text-slate-600 mt-1">Real-time tracking of shelf-life and stock depletion risks.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-800 font-semibold rounded-full border border-slate-200 hover:bg-slate-100 transition-colors shadow-sm">
                                <FileUploadIcon className='text-slate-600' />
                                Export Data
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-800 text-white font-semibold rounded-full  shadow-sm">
                                <PictureAsPdfIcon className='text-white' />
                                Download PDF
                            </button>
                        </div>
                    </div>
                    {/* <!-- Top Summary Cards --> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* <!-- Card 1: Expired --> */}    
                        <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
                            <div className="flex justify-between gap-4">
                                <div className='bg-red-100 p-2 rounded-lg '>
                                    <DangerousIcon className='text-red-700 text-3xl' />
                                </div>                
                                <div className='text-xs  bg-red-100 p-2 rounded-lg'>
                                    <span className='text-sm text-red-700'>+15%</span>
                                    <TrendingUpIcon className='text-red-700' />
                                </div>
                            </div>     
                            <div className='mt-4'>    
                                <p className='text-sm font-medium  text-slate-600'>Total Expired</p>
                                <h3 className='text-2xl font-bold text-slate-900 mt-1'>{expiredCount} Items</h3>
                                <p className='font-semibold mt-2  text-[11px] text-red-700'>Action required immediately</p>
                            </div>
                        </div>     
                        {/* <!-- Card 2: Near Expiry --> */}
                        <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
                            <div className="flex justify-between gap-4">
                                <div className='bg-red-100  p-2 rounded-lg '>
                                    <ReportProblemIcon className='text-amber-950 text-3xl' />
                                </div>
                                <div className='text-xs  bg-red-100 p-2 rounded-lg'>
                                    <span className='text-sm text-amber-950'>-2.1%</span>
                                    <TrendingDownIcon className='text-amber-950' />
                                </div>
                            </div>
                            <div className='mt-4'>
                                <p className='text-sm font-medium  text-slate-600'>Near Expiry (30d)</p>
                                <h3 className='text-2xl font-bold text-slate-900 mt-1'>{nearExpiryCount} Items</h3>
                                <p className='font-semibold mt-2  text-[11px] text-amber-950'>Discount strategies available</p>
                            </div>
                        </div>

                        {/* <!-- Card 3: Safe Stock --> */}
                        <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
                            <div className="flex justify-between gap-4">
                                <div className='bg-blue-100 p-2 rounded-lg '>
                                    <NewReleasesIcon className='text-blue-700 text-3xl' />
                                </div>
                                <div className='text-xs  bg-blue-100 p-2 rounded-lg'>
                                    <span className='text-sm text-blue-700'>-0.0%</span>
                                    <TrendingUpIcon className='text-blue-700' />
                                </div>
                            </div>
                            <div className='mt-4'>
                                <p className='text-sm font-medium  text-slate-600'>Safe Stock</p>
                                <h3 className='text-2xl font-bold text-slate-900 mt-1'>{safeStockCount} Items</h3>
                                <p className='font-semibold mt-2  text-[11px] text-blue-700'>Next 90+ days secured</p>
                            </div>
                        </div>

                        {/* <!-- Card 4: Loss Value --> */}
                        <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
                            <div className="flex justify-between gap-4">
                                <div className='bg-blue-100 p-2 rounded-lg '>
                                    <CurrencyRupeeIcon className='text-blue-700 text-3xl' />
                                </div>
                                <div className='text-xs  bg-blue-100 p-2 rounded-lg'>
                                    <span className='text-sm text-blue-700'>+19%</span>
                                    <TrendingUpIcon className='text-blue-700' />
                                </div>
                            </div>
                            <div className='mt-4'>
                                <p className='text-sm font-medium  text-slate-600'>Total Loss Value</p>
                                <h3 className='text-2xl font-bold text-slate-900 mt-1'>₹  {totalLoss}</h3>
                                <p className='font-semibold mt-2  text-[11px] text-blue-700'>Projected for current month</p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Smart Alert Banner --> */}
                    {/* <div className='bg-slate-100 border-l-4 border-red-700 border-error p-5 rounded-2xl flex items-center justify-between shadow-sm  gap-5'>
                        <div className="flex items-center gap-4">

                            <ReportProblemIcon className='text-error text-red-700 text-3xl' />
                            <div>
                                <h4 className="font-bold text-on-surface">Critical Expiry Alert</h4>
                                <p className="text-sm text-on-surface-variant"><strong>12 medicines</strong> are expiring in the
                                    next 15 days. Immediate action is recommended to minimize losses.</p>

                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="px-4 py-2 bg-white  text-on-surface rounded-xl text-sm font-bold hover:bg-surface-container-low transition-colors">View
                                Details</button>
                            <button
                                className="px-4 py-2 bg-blue-600  text-white rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-opacity">Apply
                                Discount (25%)</button>
                        </div>
                    </div> */}
                    {/* <!-- Dashboard Layout: Full Width Grid --> */}
                    <div className="space-y-8">  
                        {/* <!-- Filters & Search --> */}
                        <div className=" flex p-6 rounded-2xl shadow-sm border border-white/40  flex-wrap gap-4 items-center">
                            <div className="flex-1 min-w-37.5">
                                <label className="text-[10px] uppercase tracking-wider font-bold text-slate-600 mb-1 block">Search Medicine</label>
                                <div className='relative'>
                                    <input
                                        className="w-full bg-slate-100   border-blue-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary"
                                        placeholder="e.g. Paracetamol"
                                        type="text" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-37.5">
                                <label
                                    className="text-[10px] uppercase tracking-wider font-bold text-slate-600 mb-1 block">Expiry
                                    Range</label>
                                <select
                                    className="w-full bg-surface-container-low border-none rounded-xl py-2 text-sm focus:ring-1 focus:ring-primary">
                                    <option>Next 30 Days</option>
                                    <option>Next 60 Days</option>
                                    <option>Next 90 Days</option>
                                </select>
                            </div>
                            <div className="flex-1 min-w-37.5">
                                <label className="text-[10px] uppercase tracking-wider font-bold text-slate-600 mb-1 block">Supplier</label>
                                <select  
                                    className="w-full bg-surface-container-low border-none rounded-xl py-2 text-sm focus:ring-1 focus:ring-primary">
                                    <option>All Suppliers</option>
                                    <option>Cipla Ltd.</option>
                                    <option>Sun Pharma</option>
                                </select>  
                            </div>
                            <div className="flex-1 min-w-37.5">
                                <label className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1 block">Status</label>
                                <select
                                    className="w-full bg-surface-container-low border-none rounded-xl py-2 text-sm focus:ring-1 focus:ring-primary">
                                    <option>All Status</option>
                                    <option>Expired</option>
                                    <option>Near Expiry</option>
                                </select>
                            </div>
                            <button
                                className="p-2 bg-blue-300 text-white rounded-xl hover:bg-blue-600 transition-colors h-10 w-10 flex items-center justify-center self-end">
                                <span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
                            </button>
                        </div>
                        {/* <!-- Main Table --> */}
                        <div className='bg-slate-50  rounded-xl p-3  shadow-sm border border-slate-200 overflow-hidden'>
                            <div className="px-6 py-4 flex justify-between items-center ">
                                <h3 className="font-headline font-semibold text-lg">Inventory Expiry Logs</h3>
                                <div className="flex gap-2">
                                    <div className="bg-primary/5 text-blue-700 text-[10px] px-2 py-1 rounded font-bold uppercase">
                                      {expiryData.length}   items in list</div>
                                    <button className='text-slate-700 hover:text-blue-600'>
                                        <MoreVertIcon className='' />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left ">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-6 py-4 w-10">
                                                <input type="checkbox" />
                                            </th>
                                            <th className="px-4 py-4 text-xs font-bold uppercase">
                                                Medicine Name
                                            </th>
                                            <th className="px-4 py-4 text-xs font-bold uppercase">
                                                Batch No.
                                            </th>
                                            {/* <th className="px-4 py-4 text-xs font-bold uppercase">
                                                Supplier
                                            </th> */}
                                            <th className="px-4 py-4 text-xs font-bold uppercase">
                                                EXP Date
                                            </th>
                                            <th className="px-4 py-4 text-xs font-bold uppercase">
                                                Time Left
                                            </th>
                                            <th className="px-4 py-4 text-xs font-bold uppercase">
                                                Stock Value
                                            </th>
                                            <th className="px-4 py-4 text-xs font-bold uppercase">
                                                Status
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y'>
                                        {expiryData.map((med, index) => ((
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-5">
                                                    <input type="checkbox" />
                                                </td>
                                                <td className="px-4 py-5">
                                                    <div className="font-bold text-sm">{med.ProductName}</div>
                                                    <div className="text-xs text-gray-500">
                                                        SKU: {med.ProductSku}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5 text-sm">{med.ProductBatchNo}</td>

                                                {/* <td className="px-4 py-5 text-sm text-gray-500">
                                                    {med.supplier}
                                                </td> */}

                                                <td className="px-4 py-5 text-sm font-semibold">
                                                   {new Date(med.ProductExpiryDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-5">
                                                    {med.status === "Expired" ? (
                                                        <div className="text-xs text-gray-400 italic">
                                                            Expired
                                                        </div>
                                                    ) : (
                                                        <div className="w-32">
                                                            <div className="text-xs font-bold mb-1">
                                                                {med.daysLeft} Days
                                                            </div>

                                                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`${getBarColor(med.status)} h-full`}
                                                                    style={{ width: `${med.percentage}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-5 font-bold text-sm">
                                                   ₹ {med.stockValue}
                                                </td>

                                                <td className="px-4 py-5">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusStyle(
                                                            med.status
                                                        )}`}
                                                    >
                                                        {med.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <button className="p-1 hover:bg-gray-200 rounded">
                                                        ⋮
                                                    </button>
                                                </td>
                                            </tr>
                                        )))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* <!-- Analytics & Sidebar Components Grid --> */}
                        {/* <div className='grid grid-cols-12 gap-8'>
                           
                            <div className="col-span-12  space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                   
                                </div>
                            </div>    
                        </div> */}
                    </div>
                </div>
            </main>
        </div>)
}
export default ExpiryMedicine