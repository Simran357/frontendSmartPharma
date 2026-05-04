import { useEffect, useState } from "react";
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MovingIcon from '@mui/icons-material/Moving';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";

const OrdersOverview = () => {
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const statusStyles = {
    PLACED: "bg-gray-100 text-gray-600",
    CONFIRMED: "bg-blue-100 text-blue-600",
    PACKED: "bg-yellow-100 text-yellow-700",
    READY_FOR_DISPATCH: "bg-purple-100 text-purple-600",
    DISPATCHED: "bg-indigo-100 text-indigo-600",
    IN_TRANSIT: "bg-orange-100 text-orange-600",
    OUT_FOR_DELIVERY: "bg-pink-100 text-pink-600",
    DELIVERED: "bg-green-100 text-green-600",
  };

  const steps = [
    "PLACED",
    "CONFIRMED",
    "PACKED",
    "READY_FOR_DISPATCH",
    "DISPATCHED",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];

  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const orderStats = {
    total: orders.length,
    inProgress: orders.filter(
      (o) =>
        o.status === "PLACED" ||
        o.status === "CONFIRMED" ||
        o.status === "PACKED"
    ).length,

    readyForDispatch: orders.filter(
      (o) => o.status === "READY_FOR_DISPATCH"
    ).length,

    inTransit: orders.filter(
      (o) =>
        o.status === "DISPATCHED" ||
        o.status === "IN_TRANSIT" ||
        o.status === "OUT_FOR_DELIVERY"
    ).length,

    delayed: orders.filter((o) => o.status === "DELAYED").length,

    pending: orders.filter((o) => o.status === "PLACED").length,
  };

  const [searchTerm, setSearchTerm] = useState("");
  // ================= FETCH =================
  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/registerroute/getWholesalerOrders");
      setOrders(res?.data?.orders || []);
    } catch (err) {
      console.log("Error fetching orders", err);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchOrders();
  }, []);
  const navigate = useNavigate()
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      console.log("Sending Status:", newStatus);

      const res = await axiosInstance.put(
        `/registerroute/updateOrderStatus/${orderId}`,
        {
          status: newStatus,
        }
      );

      console.log("API Success:", res.data);

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, status: newStatus }
              : order
          )
        );
      }
    } catch (error) {
      console.log("Status update failed");

      console.log("Backend Error:", error.response?.data);
      console.log("Full Error:", error);
    }
  };
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "ALL" ||
      order.status === selectedStatus;

    const matchesSearch =
      order?.orderId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order?.customer?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* ================= HEADER ================= */}
      <h1 className="text-2xl font-bold mb-6">Orders Overview</h1>

      {/* ================= TOP CARDS ================= */}
      {/* </div> <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6"> */}
      <div className="flex gap-6">

        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col border border-gray-300 w-64">

          <div className="flex   space-y-6 items-center justify-between">
            <p className="text-gray-400 text-sm font-semibold">
              TOTAL ORDERS TODAY
            </p>
            <ShoppingCartIcon className="text-red-500 " />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-black">
              {orderStats.total}
            </span>
            <span className="text-green-600 font-semibold"><MovingIcon className="text-green-500" />12%</span>
          </div>
        </div>


        {/* Card 2 */}
        <div className="bg-white  space-y-14 rounded-xl shadow-md p-6 flex flex-col border border-gray-300 w-64">
          <p className="text-gray-400 text-sm font-semibold">
            IN PROGRESS
          </p>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-4xl font-bold text-black">
              {orderStats.inProgress}
            </span>
            <span className="text-green-600 font-semibold"><MovingIcon className="text-green-500" />5%</span>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col border border-gray-300 w-64">
          <div className="flex  space-y-8 items-center justify-between">

            <p className="text-gray-400 text-sm font-semibold">
              READY FOR DISPATCH
            </p>
            <Inventory2Icon className="text-blue-500" />

          </div>


          <div className="flex items-center gap-3 mt-2">
            <span className="text-4xl font-bold text-black">
              {orderStats.readyForDispatch}
            </span>
            <span className="text-red-600 font-semibold"><MovingIcon className="text-red-500" />2%</span>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col border border-gray-300 w-64">
          <div className="flex  space-y-13 items-center justify-between">
            <p className="text-gray-400 text-sm font-semibold">
              IN TRANSIT
            </p>
            <LocalShippingIcon className="text-blue-500" />

          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-4xl font-bold text-black">
              {orderStats.inTransit}
            </span>
            <span className="text-green-600 font-semibold"><MovingIcon className="text-green-500" />8%</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col border border-gray-300 w-64">
          <div className="flex  space-y-15 items-center justify-between">
            <p className="text-gray-400 text-sm font-semibold">
              DELAYED
            </p>

            <WarningAmberIcon className="text-red-500" />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-4xl font-bold text-black">
              {orderStats.delayed}
            </span>
            <span className="text-yellow-500 font-semibold"><ArrowForwardIcon sx={{ color: "yellow" }} />1%</span>
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col border border-gray-600 w-64">
          <div className="flex gap-2 items-center justify-between">
            <p className="text-gray-400 text-sm font-semibold">
              PENDING ORDERS
            </p>

            <AccessTimeFilledIcon className="text-yellow-500" />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-4xl font-bold text-black">
              {orderStats.pending}
            </span>
            <span className="text-green-600 font-semibold"><MovingIcon className="text-green-500" />4%</span>
          </div>
          <div className='p-1 mt-4 border border-gray-300 cursor-pointer hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-md  text-center text-black'
            onClick={() => navigate("/Dashboard/Wholesaler/PendingOrders")}>VIEW DETAILS</div>
        </div>
      </div>

      {/* ================= MAIN SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-4 space-y-6">


          {/* search + filter */}
          <div className="flex flex-col md:flex-row items-start md:items-center bg-white justify-between border mt-8 border-gray-300 p-4 w-full gap-4">

            {/* Search */}
            <input
              type="text"
              placeholder="Search OrderID or Retailer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-400 p-2 rounded-md w-full md:w-80"
            />

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-400 p-2 rounded-md"
            >
              <option value="ALL">All Orders</option>
              <option value="PLACED">Placed</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PACKED">Packed</option>
              <option value="READY_FOR_DISPATCH">Ready For Dispatch</option>
              <option value="DISPATCHED">Dispatched</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="OUT_FOR_DELIVERY">Out For Delivery</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>
          {/* Order Card */}
          <div className="bg-white p-6 rounded-xl shadow">

            {loading ? (
              <p>Loading...</p>
            ) : filteredOrders?.length === 0 ? (
              <p>No Orders Found</p>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white  p-6 rounded-xl shadow-2xl cursor-pointer  m-4"
                  onClick={() => setOpen(open === order._id ? null : order._id)}
                >
                  <div className="flex justify-between items-center mb-4">

                    <div>
                      {/* Order ID + Status */}
                      <div className="flex items-center gap-6">

                      </div>

                      <div className="flex gap-8 mt-2">

                        {/* Retailer */}
                        <div className="flex flex-col">
                          <p className="text-black whitespace-nowrap">
                            #{order?.orderId}
                          </p>
                          <p className="text-black whitespace-nowrap">   {order?.customer?.name} </p>
                          <div className="flex gap-2 mt-1 text-xs whitespace-nowrap">
                            <span className="text-gray-600">
                              {new Date(order?.createdAt).toDateString()}
                            </span>
                            <span className="text-gray-600">
                              . {order?.items?.length} Items
                            </span>
                            <span className="text-black">
                              . ₹{order?.total}
                            </span>
                          </div>
                        </div>

                        {/* Courier */}
                        <div className="text-sm text-gray-600">
                          {order?.courier?.name} ({order?.courier?.time})
                        </div>

                      </div>

                      {/* ✅ STATUS BAR START */}
                      {/* ✅ RESPONSIVE STATUS BAR */}
                      <div className="w-full mt-4">

                        <div className="flex flex-row justify-between items-center">
                          <h1 className="text-orange-500 font-bold text-lg mb-3">
                            Process Status
                          </h1>

                          <button className="bg-orange-500 text-white px-5 py-2 rounded-lg   right-0" onClick={() => navigate(`${order._id}`, { state: order })}>
                            View Order
                          </button>
                        </div>


                        <div className="overflow-x-auto scrollbar-hide">
                          <div className="relative min-w-850px md:min-w-full flex items-center py-4">

                            {/* Background line */}
                            <div className="absolute top-6 left-0 w-full h-1 bg-gray-300"></div>

                            {(() => {
                              const currentIndex = steps.indexOf(order?.status);
                              const progressWidth =
                                ((currentIndex + 1) / steps.length) * 100;

                              return (
                                <>
                                  {/* Progress line */}
                                  <div
                                    className="absolute top-6 left-0 h-1 bg-orange-500 transition-all duration-500"
                                    style={{ width: `${progressWidth}%` }}
                                  ></div>

                                  <div className="flex justify-between w-full relative z-10">
                                    {steps.map((step, i) => {
                                      const isActive = currentIndex >= i;
                                      const isClickable = i <= currentIndex + 1;

                                      return (
                                        <div
                                          key={i}
                                          className="flex flex-col items-center flex-1 min-w-100px"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (!isClickable) return;
                                            handleStatusChange(order._id, step);
                                          }}
                                        >
                                          <div
                                            className={`w-5 h-5 rounded-full ${isActive
                                              ? "bg-orange-500"
                                              : "bg-gray-400"
                                              }`}
                                          ></div>

                                          <p
                                            className={`text-[10px] md:text-sm mt-2 text-center ${isActive
                                              ? "text-orange-500"
                                              : "text-gray-400"
                                              }`}
                                          >
                                            {step.replaceAll("_", " ")}
                                          </p>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>



                  </div>

                  {/* ITEMS TABLE */}
                  {open === order._id && (
                    <table className="w-full text-left mt-4">
                      <thead className="text-gray-500 text-sm border-b">
                        <tr>
                          <th className="py-2">MEDICINE</th>
                          <th>QTY</th>
                          <th>PRICE</th>
                          <th>BATCH</th>
                          <th>EXPIRY</th>
                        </tr>
                      </thead>

                      <tbody className="text-sm">
                        {order.items.map((item) => (
                          <tr key={item._id} className="border-b">
                            <td className="py-3 font-semibold">{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price}</td>
                            <td>{item.batch}</td>
                            <td>
                              {new Date(item.expiryDate).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))
            )}

            {/* Medicine Table */}

          </div>
        </div>






      </div>

    </div>
  );
}
export default OrdersOverview