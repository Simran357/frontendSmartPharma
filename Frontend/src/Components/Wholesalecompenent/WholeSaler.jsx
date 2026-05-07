import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import CurrencyRupeeIcon from '@mui/icons-material/AttachMoney';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DoneIcon from '@mui/icons-material/Done';
import PrintIcon from '@mui/icons-material/Print';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ScienceIcon from '@mui/icons-material/Science';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Outlet, useNavigate } from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import DetailsIcon from '@mui/icons-material/Details';
// import PendingOrders from './PendingOrders';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Addstock from './Addstock';
import { useState, useEffect } from "react";
import axiosInstance from '../Dashboard/Form/Utils/AxiosInstance';
const WholeSaler = () => {
  const navigate = useNavigate()
  const [model, setModel] = useState(false);

  const [courierList, setCourierList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]); // ✅ ADD THIS

  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingLowStock, setLoadingLowStock] = useState(false);
  const [health, setHealth] = useState({
    inStockPercent: 0,
    lowStockPercent: 0,
    outStockPercent: 0
  });
  const { inStockPercent, lowStockPercent, outStockPercent } = health;
  const [products, setProducts] = useState([]);
  const [exProducts, setexProducts] = useState([]);
  const [expiryData, setExpiryData] = useState(null);

  useEffect(() => {
    console.log("chl pya hh ")
    const fetchTopProducts = async () => {
      try {
        const res = await axiosInstance.get("/registerroute/getTopSellingProducts");
        setProducts(res?.data?.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTopProducts();
  }, []);
  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await axiosInstance.get("/registerroute/getInventoryHealth");
        setHealth(res?.data?.data);
      } catch (err) {
        console.error("Error fetching inventory health:", err);
      }
    };

    fetchHealth();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);

        const res = await axiosInstance.get("/registerroute/getWholesalerOrders");

        if (res?.data?.success) {
          setOrders(res?.data?.orders);
        }
      } catch (err) {
        console.error("Order fetch error:", err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axiosInstance.get("/registerroute/getDeliveryPartners");
        setCourierList(res?.data?.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        setLoadingLowStock(true);

        const res = await axiosInstance.get("/registerroute/getLowStockItems");

        if (res?.data?.success) {
          setLowStockItems(res?.data?.lowStockItems);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingLowStock(false);
      }
    };

    fetchLowStock();
  }, []);
  const totalOrders = orders?.length || 0;

  const pending = orders?.filter(o => o.status !== "Shipped")?.length || 0;

  const revenue = orders?.reduce((sum, o) => sum + (o.total || 0), 0) || 0;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(
          "/registerroute/getExpiryProduct"
        );

        if (res?.data?.success) {
          setexProducts(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!exProducts.length) return;

    const today = new Date();

    const expiryItems = exProducts.filter((item) => {
      if (!item.ProductExpiryDate) return false;

      const expiryDate = new Date(item.ProductExpiryDate);

      const diffDays =
        (expiryDate - today) / (1000 * 60 * 60 * 24);

      return diffDays <= 30 && diffDays >= 0;
    });

    // Risk logic
    let risk = "Low";
    if (expiryItems.length > 20) risk = "Critical";
    else if (expiryItems.length > 10) risk = "Moderate";

    setExpiryData({
      days: 30,
      totalBatches: expiryItems.length,
      risk,
    });
  }, [exProducts]);


  return (

    <div className=" bg-gray-50 p-6 md:p-10 ">
      {/* <!-- BEGIN: Main Dashboard Layout --> */}
      <main className='max-w-7xl mx-auto space-y-10 '>
        {/* <!-- Dashboard Header: Contains greeting and search/notification bar | --> */}
        <header className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-slate-800 tracking-tight'>Dashboard Overview</h1>
            <p className=' text-slate-500 mt-1'>Welcome back,  Here is what's happening today.</p>
          </div>
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <input
                type="text"
                className="w-64 pl-10 pr-4 py-2 border border-slate-200 rounded-xl 
                         focus:ring-2 focus:ring-blue-500 text-sm outline-none"
                placeholder="Search medicines , orders..." />

              <button className="bg-white border border-slate-200 rounded-xl p-2 hover:bg-slate-50 transition-colors relative ml-2" >
                <NotificationsNoneSharpIcon className="  " />
              </button>
            </div>
          </div>
        </header>
        {/* <!-- BEGIN: Top Stats Row --> */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 cursor-pointer  gap-6">
          {/* <!-- Daily Sales --> */}
          <div
            onClick={() => navigate("Dailysales")}
            className=' bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:scale-100 justify-between hover:shadow-md transition-shadow'>
            <div className="flex justify-between items-start">
              <div >
                <p className='font-medium text-slate-500'>Daily Sales</p>
              </div>
              <div className='bg-blue-50 rounded-lg p-2 text-lg  text-blue-600'>
                ₹
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-bold text-slate-800">
                Rs {revenue.toLocaleString()}
              </h2>              <span className="text-green-500 text-sm font-semibold flex items-center gap-1 mt-1">
                +12.5% vs yesterday
              </span>
              <div className='mt-4'>
              </div>
            </div>
          </div>
          {/* <!-- Pending Orders --> */}
          <div
            onClick={() => navigate("PendingOrders")}
            className='bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow'>
            <div className="flex justify-between items-start">
              <span className="text-slate-500 font-medium">Pending Orders</span>
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                <CardTravelIcon />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-bold text-slate-800">
                {pending}
              </h2>              <span className="text-red-500 text-sm font-semibold flex items-center gap-1 mt-1">
                -5% fulfillment rate
              </span>
            </div>
          </div>
          {/* <!-- Low Stock Alerts --> */}
          <div
            onClick={() =>
              navigate("Lowstock")
            } className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <span className="text-slate-500 font-medium">Low Stock Alerts</span>
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <WarningAmberIcon />
              </div>
            </div>
            <div className="mt-4">
              <p className='text-2xl font-bold text-orange-900'>
                {loadingLowStock ? "..." : lowStockItems.length}</p>
              <span className="text-slate-500 text-sm font-medium mt-1">High Priority Restock</span>
            </div>
          </div>
          {/* <!-- Expiry Alerts --> */}
          <div
            onClick={() => navigate("ExpiryMedicine")}
            className="bg-white p-6 rounded-3xl shadow-sm border-none flex flex-col justify-between hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <span className="text-slate-500 font-medium">
                Expiry ({expiryData?.days || 0} Days)
              </span>

              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <DateRangeIcon />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-3xl font-bold text-slate-800">
                {expiryData?.totalBatches || 0} Batches
              </h2>

              <span
                className={`text-sm font-bold mt-1 uppercase tracking-wider ${expiryData?.risk === "Critical"
                    ? "text-red-600"
                    : expiryData?.risk === "Moderate"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
              >
                {expiryData?.risk || "Low"} Risk
              </span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* <!-- BEGIN: Left Column (Main Content) --> */}
          <div className='lg:col-span-2 space-y-10'>
            <section >
              <h3 className='text-xl mb-6 font-bold text-slate-800 flex items-center gap-2'>
                <ElectricBoltIcon className='w-5 h-5  text-blue-400 ' />
                Quick Actions</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 " >
                <button
                  onClick={() => setModel(true)}
                  className=' p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-400 hover:shadow-lg transition-all text-center group '>
                  <div className='w-12 h-12 bg-blue-50  text-blue-500 rounded-xl m-auto  mb-3 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors'>
                    <AddIcon
                      className='w-6 h-6'
                    />
                  </div>
                  <span className="block text-sm font-bold text-slate-700">New Stock</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Purchase Entry</span>
                </button>
                {model && <Addstock close={() => setModel(false)} />}

                <button
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-400 hover:shadow-lg transition-all text-center group">
                  <div
                  onClick={()=>navigate("OrdersOverview")}
                    className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <CheckCircleOutlineOutlinedIcon />
                  </div>
                  <span className="block text-sm font-bold text-slate-700">Approve Orders</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Orders Portal</span>
                </button>

                <button
                onClick={()=>navigate("Connectcourier")}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-400 hover:shadow-lg transition-all text-center group">
                  <div
                    className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <CheckCircleOutlineOutlinedIcon />

                  </div>
                  <span className="block text-sm font-bold text-slate-700">Dispatch</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Ship Orders</span>
                </button>

                <button
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-400 hover:shadow-lg transition-all text-center group">
                  <div
                    className="w-12   h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <DeleteForeverOutlinedIcon />
                  </div>
                  <span className="block text-sm font-bold text-slate-700">Record Waste</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Damaged Goods</span>
                </button>

              </div>
            </section>
            {/* <!-- BEGIN: Recent Online Orders --> */}
            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className='flex justify-between  items-center p-6 border-b border-slate-50'>
                <h3 className='text-xl font-bold text-slate-600 '>Recent Online Orders</h3>
                <a className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  href="#">View All Orders</a>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full text-left  border-collapse'>
                  <thead>
                    <tr className='bg-slate-50'>
                      <th className='px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest '>
                        Order ID</th>
                      <th
                        className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Pharmacy / Customer</th>
                      <th
                        className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Value</th>
                      <th
                        className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Status</th>
                      <th
                        className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                        Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {loadingOrders ? (
                      <tr>
                        <td colSpan="5" className="text-center py-6 text-slate-400">
                          Loading orders...
                        </td>
                      </tr>
                    ) : orders?.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order._id} className="hover:bg-slate-50 transition-colors">

                          {/* ORDER ID */}
                          <td className="px-6 py-4">
                            <span
                              onClick={() => navigate(`PendingOrders/${order._id}`)}
                              className="text-sm font-semibold text-blue-600 cursor-pointer hover:underline"
                            >
                              #{order.orderId}
                            </span>
                          </td>

                          {/* CUSTOMER */}
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-800">
                              {order?.customer?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-slate-400">
                              {order?.customer?.city || order?.customer?.address || "N/A"}
                            </p>
                          </td>

                          {/* TOTAL */}
                          <td className="px-6 py-4 text-sm font-bold text-slate-800">
                            ₹{order.total}
                          </td>

                          {/* STATUS */}
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase
              ${order.status === "Paid"
                                  ? "bg-green-50 text-green-600"
                                  : order.status === "Processing"
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-orange-50 text-orange-600"
                                }`}
                            >
                              {order.status}
                            </span>
                          </td>

                          {/* ACTIONS */}
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => navigate(`PendingOrders/${order._id}`)}
                              className="bg-blue-600 text-white text-[10px] font-bold px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                              View
                            </button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-6 text-slate-400">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>



          </div>

          {/* <!-- BEGIN: Right Column (Widgets) --> */}
          <aside className='space-y-8'>
            {/* <!-- Financial Overview: Credit limits and outstanding payment status | --> */}
            <section className='bg-slate-900 rounded-3xl text-white  p-6 shadow-xl relative overflow-hidden'>


              <div className="flex items-center ml-23 gap-2 mb-3">
                <LocalShippingIcon style={{ fontSize: 16, color: "#4ade80" }} />
                <h4 className="text-xs font-bold text-slate-300 tracking-wide uppercase">
                  Deliveries
                </h4>
              </div>

              {/* Courier Names */}
              <div className="space-y-2">
                {courierList.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-slate-800 px-3 py-2 rounded-md hover:bg-slate-700 transition cursor-pointer"
                  >
                    {/* Left side */}
                    <div className="flex items-center gap-2">
                      <FiberManualRecordIcon
                        style={{ fontSize: 10, color: "#4ade80" }}
                      />
                      <span className="text-sm text-slate-200">
                        {item.name}
                      </span>
                    </div>

                    {/* Right icon */}
                    <ChevronRightIcon
                      style={{ fontSize: 16, color: "#94a3b8" }}
                    />
                  </div>
                ))}
              </div>

            </section>
            {/* <!-- Batch & Expiry Alerts --> */}
            <section className='bg-white rounded-3xl border border-slate-100 shadow-sm p-6'>
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round"
                      strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                  Batch &amp; Expiry
                </h4>
                <span
                  className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded tracking-wider uppercase">24
                  Alerts</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-rose-500">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <ScienceIcon className="w-5 h-5 text-rose-500 cursor-pointer hover:text-rose-600 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">Amoxicillin 500mg</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-slate-400 font-medium">Batch: AMX-2201</span>
                        <span className="text-[10px] text-rose-600 font-bold uppercase">Expires: 12
                          Oct</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-amber-400">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <ScienceIcon className="w-5 h-5 text-amber-500 cursor-pointer hover:text-amber-600 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">Cough Syrup (Z-Type)</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-slate-400 font-medium">Batch: CS-789</span>
                        <span className="text-[10px] text-amber-600 font-bold uppercase">Expires: 28
                          Oct</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-colors">Manage
                Expiry List</button>
            </section>


            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Inventory Health</h3>
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#f1f5f9" strokeWidth="4">
                    </circle>
                    {/* In Stock */}
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#22c55e"
                      strokeDasharray={`${inStockPercent}, 100`} strokeLinecap="round" strokeWidth="4"></circle>
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#f59e0b"
                      strokeDasharray={`${lowStockPercent}, 100`} strokeDashoffset={`-${inStockPercent}`} strokeLinecap="round"
                      strokeWidth="4"></circle>
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#ef4444"
                      strokeDasharray={`${outStockPercent}, 100`} strokeDashoffset={`-${inStockPercent + lowStockPercent}`} strokeLinecap="round"
                      strokeWidth="4"></circle>
                  </svg>
                </div>
                {/* Legend */}
                <div className="space-y-2 text-sm">
                  <div className="flex flex-row items-center gap-2"><span
                    className="w-2 h-2 rounded-full bg-green-500"></span> <span
                      className="text-slate-500">In Stock ({inStockPercent}%)</span></div>
                  <div className="flex items-center gap-2"><span
                    className="w-2 h-2 rounded-full bg-amber-500"></span> <span
                      className="text-slate-500">Low Stock ({lowStockPercent}%)</span></div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-slate-500">
                      Out of Stock ({outStockPercent}%)</span></div>
                </div>
              </div>
            </section>

            <section className='bg-white p-6 rounded-3xl border border-slate-100 shadow-sm'>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Top Selling Products</h3>
              <ul className="space-y-3">
                {products.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">
                      {item.name}
                    </span>

                    <span className="text-xs font-bold bg-slate-50 px-2 py-1 rounded">
                      {item.totalSold} units
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </main>
      <Outlet />
    </div>
  )
}
export default WholeSaler 