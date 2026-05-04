
import React, { useContext, useEffect, useMemo, useState } from "react";
import axiosInstance from "../../Form/Utils/AxiosInstance";
import { contextProvide } from "../../Form/Utils/Context/CommonContext";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const RetailerOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { auth } = useContext(contextProvide);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get(
        `/registerroute/getRetailerOrder/${auth}`
      );

      setOrders(res?.data?.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const ordersToday = orders.filter((order) => {
      const orderDate = new Date(order.createdAt).toDateString();
      const today = new Date().toDateString();
      return orderDate === today;
    }).length;

    const pendingPacking = orders.filter(
      (o) => o.status === "PROCESSING"
    ).length;

    const readyPickup = orders.filter(
      (o) => o.status === "READY_FOR_DISPATCH"
    ).length;

    const nextCourier =
      orders.find((o) => o.courier?.name)?.courier?.name || "No Courier";

    return {
      ordersToday,
      pendingPacking,
      readyPickup,
      nextCourier,
    };
  }, [orders]);

  const groupedOrders = {
    NEW: orders.filter((o) => o.status === "PLACED"),
    PROCESSING: orders.filter((o) => o.status === "PROCESSING"),
    PACKING: orders.filter((o) => o.status === "PACKING"),
    READY: orders.filter((o) => o.status === "READY_FOR_DISPATCH"),
  };

  const statusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "IN_TRANSIT":
        return "bg-yellow-100 text-yellow-700";
      case "READY_FOR_DISPATCH":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Retailer Order Dashboard
          </h1>
          <p className="text-slate-500 mt-2">
            Track all wholesaler orders and live fulfillment updates.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl p-6 border border-gray-400 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Orders Today</p>
                <h2 className="text-3xl font-bold mt-2">
                  {stats.ordersToday}
                </h2>
              </div>
              <div className="bg-blue-100 p-3 rounded-2xl">
                <ShoppingBagIcon className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border  border-gray-400 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Pending Packing</p>
                <h2 className="text-3xl font-bold mt-2">
                  {stats.pendingPacking}
                </h2>
              </div>
              <div className="bg-orange-100 p-3 rounded-2xl">
                <Inventory2Icon className="text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border  border-gray-400 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm">Ready for Pickup</p>
                <h2 className="text-3xl font-bold mt-2">
                  {stats.readyPickup}
                </h2>
              </div>
              <div className="bg-green-100 p-3 rounded-2xl">
                <AccessTimeIcon className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-r from-green-900 to-green-700 text-white rounded-3xl p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-green-100">Next Courier</p>
                <h2 className="text-2xl font-bold mt-2">
                  {stats.nextCourier}
                </h2>
              </div>
              <LocalShippingIcon fontSize="large" />
            </div>
          </div>
        </div>

        {/* Live Order Board */}         
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-400">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Live Order Board
            </h2>
            <p className="text-slate-500 mt-1">
              Real-time order tracking based on wholesaler updates.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">

            {Object.entries(groupedOrders).map(([column, list]) => (
              <div
                key={column}
                className="bg-slate-50 rounded-3xl p-4 min-h-400px"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-700">
                    {column}
                  </h3>
                  <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {list.length}
                  </span>
                </div>

                <div className="space-y-4">
                  {list.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white rounded-2xl border p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-xs text-slate-400">
                            #{order.orderId}
                          </p>
                          <h4 className="font-bold text-slate-800 mt-1">
                            {order.customer?.name}
                          </h4>
                        </div>

                        <span
                          className={`text-[10px] px-2 py-1 rounded-full font-bold ${statusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="text-sm text-slate-500 space-y-1">
                        <p>
                          {order.items?.length} Items
                        </p>
                        <p>
                          ₹{order.total}
                        </p>
                        <p>
                          {order.courier?.name || "No Courier"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order History Cards */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-20 text-slate-500">
              Loading Orders...
            </div>
          ) : (
            orders.map((order) => (
              <div   
                key={order._id}
                className="bg-white rounded-3xl shadow-sm border border-gray-400 p-6"
              >
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h2 className="font-bold text-lg text-slate-800">
                      Order #{order.orderId}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-xs font-bold ${statusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mt-6">
                  <div>
                    <p className="text-slate-400 text-sm">Wholesaler</p>
                    <p className="font-semibold">
                      {order.wholesalerId?.shopName || "Wholesaler"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">Payment</p>
                    <p className="font-semibold">
                      {order.paymentStatus}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">Total</p>
                    <p className="font-semibold">₹{order.total}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">Courier</p>
                    <p className="font-semibold">
                      {order.courier?.name || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Ordered Items</h3>

                  <div className="space-y-2">
                    {order.items?.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between bg-slate-100 rounded-xl px-4 py-3"
                      >
                        <span>
                          {item.name}
                        </span>

                        <span>
                          Qty: {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default RetailerOrderHistory;