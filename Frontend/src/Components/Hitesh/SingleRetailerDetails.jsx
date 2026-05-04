
import { useState, useEffect } from "react"
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";
import React from "react"
import { Table } from "antd";
import { Tag } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { CheckCircle, AlertTriangle, Info, FileText, Upload, Banknote, ShoppingBag, BarChart, Building2 } from "lucide-react";
import { useParams } from "react-router-dom";
const SingleRetailerDetails = () => {
  const { id } = useParams()
  console.log(id)
  const [singleRetailer, setSingleRetailer] = useState({})
  console.log("singleRetailer", singleRetailer)
  const getUser = async () => {
    console.log("getUser called ");
    try {
      const res = await axiosInstance.get(`/registerroute/getSingleRetailor/${id}`)
      if (res?.data) {
        setSingleRetailer(res?.data?.data)
        console.log("singleretailerid", res?.data)
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }
  const [retailerOrders, setRetailerOrders] = useState([]);

 const getRetailerOrders = async () => {
  try {
    const res = await axiosInstance.get(
      `/registerroute/getRetailerOrder/${singleRetailer._id}`
    );

    console.log("API Success:", res?.data);

    if (res?.data?.success) {
      setRetailerOrders(res?.data?.orders || []);
    }
  } catch (error) {
    console.log("Backend Error:", error);
  }
};
  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);
  //  TABLE COLUMNS (OUTSIDE JSX)


  useEffect(() => {
    if (singleRetailer?._id) {
      getRetailerOrders();
    }
  }, [singleRetailer]);
  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "ITEMS",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="font-bold text-black">
          {amount}
        </span>),
    },
 {
  title: "STATUS",
  dataIndex: "status",
  key: "status",
  render: (status) => {
    const colorMap = {
      PLACED: "default",
      CONFIRMED: "blue",
      PACKED: "orange",
      READY_FOR_DISPATCH: "cyan",
      DISPATCHED: "geekblue",
      IN_TRANSIT: "purple",
      OUT_FOR_DELIVERY: "gold",
      DELIVERED: "green",
    };

    return (
      <Tag color={colorMap[status] || "default"}>
        {status}
      </Tag>
    );
  },
}
  ];

  //  TABLE DATA
  const tableData = retailerOrders.map((order, index) => ({
    key: order._id,
    orderId: order.orderId,
    date: new Date(order.createdAt).toLocaleDateString(),
    items: order.items?.length,
    amount: `₹${order.total}`,
    status: order.status,
  }));
const trendData = React.useMemo(() => {
  const monthlyData = {};

  retailerOrders.forEach((order) => {
    const date = new Date(order.createdAt);

    const month = date.toLocaleString("default", {
      month: "short",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        revenue: 0,
        orders: 0,
      };
    }

    monthlyData[month].revenue += order.total || 0;
    monthlyData[month].orders += 1;
  });

  return Object.values(monthlyData);
}, [retailerOrders]);

  // ================= DYNAMIC STATS =================

const totalOrders = retailerOrders.length;

const totalRevenue = retailerOrders.reduce(
  (sum, order) => sum + (order.total || 0),
  0
);

const deliveredOrders = retailerOrders.filter(
  (order) => order.status === "DELIVERED"
).length;

const deliveredPercentage =
  totalOrders > 0
    ? ((deliveredOrders / totalOrders) * 100).toFixed(1)
    : 0;

const averageOrderValue =
  totalOrders > 0
    ? (totalRevenue / totalOrders).toFixed(0)
    : 0;

const pendingOrders = retailerOrders.filter(
  (order) =>
    order.status !== "DELIVERED" &&
    order.status !== "CANCELLED"
).length;
  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6">

        {/* LEFT SIDE */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Logo */}
          <div className="w-16 h-16 rounded-xl bg-linear-to-br from-green-200 to-green-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">
              {singleRetailer?.pharmacyName?.slice(0, 1).toUpperCase()}
            </span>          </div>

          {  /* Details */}
          <div className="w-full">

            {/* Top Row */}
            <div className="">

              {/* Details */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">


                  <h1 className="text-xl font-bold">
                    {singleRetailer && singleRetailer.pharmacyName ? singleRetailer.pharmacyName : "Pharmacy"}
                  </h1>
                  <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-semibold">
                    ACTIVE
                  </span>
                </div>

                {/* RIGHT SIDE BUTTONS */}
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                    Adjust Credit
                  </button>
                  <button className="px-4 py-2 border border-red-400 text-red-500 rounded-lg text-sm hover:bg-red-50">
                    Block
                  </button>

                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              License No: {singleRetailer?.license} | {singleRetailer?.location} | Contact: {singleRetailer?.contact}
            </p>

            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span>👤 {singleRetailer?.username || "Loading..."}</span>
              <span>📧 {singleRetailer?.email || "Loading..."}</span>
              <span>📞 {singleRetailer?.contact || "Loading..."}</span>
              <span>⭐ 4.8 (124 reviews)</span>
              <span>✔ Partner for 5 years</span>
            </div>
          </div>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          { /* CARD 1 */}
          <div className="bg-white rounded-2xl shadow p-5">
            <div className="flex flex-row justify-between gap-2">
              <p className="text-gray-500 text-lg">Order Consistency</p>
              <BarChart className="text-green-600 w-10 h-10" />
            </div>
<h2 className="text-2xl font-bold mt-1">
  {deliveredPercentage}%
</h2>

<p className="text-green-500 text-sm mt-1">
  {deliveredOrders} Delivered Orders
</p>            <p className="text-green-500 text-sm mt-1">+2.4% from last month</p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-2xl shadow p-5">
            <div className="flex flex-row justify-between gap-2">
              <p className="text-gray-500 text-lg">Financial Overview</p>
              <Building2 className="text-blue-500 w-10 h-10" />
            </div>
<h2 className="text-sm font-bold mt-1">
  Avg Order Value: ₹{averageOrderValue}
</h2>

<p className="text-gray-500 text-sm mt-1">
  Pending Orders: {pendingOrders}
</p>            <p className="text-gray-500 text-sm mt-1">Next Due: Oct 24, 2023</p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-2xl shadow p-5">
            <div className="flex flex-row justify-between gap-2">

              <p className="text-gray-500 text-lg">Order Metrics</p>
              <ShoppingBag className="text-purple-600 w-10 h-10" />
            </div>
<h2 className="text-2xl font-bold mt-1">
  ₹{totalRevenue.toLocaleString()}
</h2>

<p className="text-gray-500 text-sm">
  Total Revenue
</p>

<p className="text-gray-500 rounded-2xl shadow p-5 w-fit text-sm mt-1">
  {totalOrders} Orders Total
</p>           
         </div>
          {/* CARD 4 */}
          <div className="bg-white rounded-2xl shadow p-5">
            <div className="flex flex-row justify-between gap-2">

              <p className="text-gray-500 text-lg">Profitability</p>
              <Banknote className="text-green-600 text-lg w-10 h-10" /></div>
<h2 className="text-2xl font-bold mt-1">
  ₹{averageOrderValue}
</h2>

<p className="text-gray-500 text-sm mt-1">
  Avg Order Value
</p>

<p className="text-green-500">
  {totalOrders > 20 ? "A-Class Retailer" : "Growing Retailer"}
</p>            <p className="text-gray-500 text-sm mt-1">Average gross margin</p>
            <p className="text-green-500">A-Class Retailer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={{ pageSize: 5 }}
              />

            </div>

            {/* Trend Analysis */}
            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center justify-between">

                {/* LEFT SIDE */}
                <div>
                  <h2 className="text-lg font-semibold">Trend Analysis</h2>
                  <span className="text-gray-500 text-sm">
                    Order Volume & Revenue (Last 6 Months)
                  </span>
                </div>

                {/* RIGHT SIDE (SELECT) */}
                <select className="border rounded-lg px-3 py-1 text-sm bg-white shadow-sm">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
                </select>


              </div>
              {/* <div className="flex flex-row gap-2"> */}

              <div className=" w-full h-72 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#22c55e"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#3b82f6"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>


          </div>       {/* left */}


          {/* RIGHT SIDE */}
          <div className="lg:col-span-1 space-y-6">

            {/* Risk Assessment */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold mb-2">Risk Assessment</h2>

              <div className="bg-green-100 rounded-2xl p-4 mt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600 w-5 h-5 " />
                  <p className="text-green-600 font-medium leading-tight">
                    Payment Health
                  </p>
                </div>
                <p className="text-green-500 text-sm leading-tight mt-1">
                  Excellent credit behaviour, no late payments in 12 months.
                </p>

              </div>
              <div className="bg-yellow-100 rounded-2xl p-4 mt-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="text-yellow-600 w-5 h-5 mt-1 shrink-0" />
                  <p className="text-yellow-600 font-medium leading-tight">
                    Return Rate
                  </p>
                </div>
                <p className="text-yellow-500 text-sm leading-tight mt-1">
                  Slight increase in returns of perishable items (+3%).
                </p>
              </div>
              <div className="bg-blue-100 rounded-2xl p-4 mt-2">
                <div className="flex items-center gap-2">
                  <Info className="text-blue-600 w-5 h-5 mt-1" />
                  <p className="text-blue-600 font-medium leading-tight">
                    New Category Reach
                  </p></div>
                <p className="text-blue-500 text-sm leading-tight mt-1">
                  Started ordering from Premium Wellness Line recently.
                </p>
              </div>
            </div>
            {/* Documents */}
            <div className="bg-white rounded-2xl shadow p-6">

              <h2 className="text-2xl font-extrabold mb-4">Documents</h2>
              <div className="-mx-6 border-t border-gray-300">
              </div>
              <div className="flex items-start mt-4 gap-3">

                {/* Icon */}
                <FileText className="text-blue-600 w-5 h-5 mt-1 bg-blue-100 rounded-xl shadow-sm p-1" />

                {/* Text */}
                <div className="flex flex-col">
                  <span className="text-black font-medium">
                    Partnership Agreement
                  </span>
                  <span className="text-gray-400 text-sm">
                    Expires: Jan 2019
                  </span>
                </div>
              </div>

              <div className="flex items-start mt-4 gap-3">

                {/* Icon */}
                <FileText className="text-red-600 w-5 h-5 mt-1 bg-red-100 rounded-xl shadow-sm p-1" />

                {/* Text */}
                <div className="flex flex-col">
                  <span className="text-black font-medium">
                    Trade License
                  </span>
                  <span className="text-gray-400 text-sm">
                    Expires: Dec 2024
                  </span>
                </div>
              </div>


              <div className="flex items-start mt-4 gap-3">

                {/* Icon */}
                < CheckCircle className="text-green-600 w-5 h-5 mt-1  bg-green-100 rounded-xl shadow-sm p-1" />

                {/* Text */}
                <div className="flex flex-col">
                  <span className="text-black font-medium">
                    GST Certification
                  </span>
                  <span className="text-gray-400 text-sm">
                    Verified: Aug 2023
                  </span>
                </div>
              </div>
              <div className="mt-6 -mx-6 border-t border-gray-200 pt-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">

                <Upload className="w-5 h-5 text-gray-600" />

                <span className="text-gray-600 text-sm font-medium">
                  Upload New Document
                </span>

              </div>





            </div>



          </div>

        </div>

      </div>

    </div>
  )
}

export default SingleRetailerDetails