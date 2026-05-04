
import { useEffect, useState } from "react";
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("orderData");

    if (stored) {
      const parsed = JSON.parse(stored);
      setOrder(parsed);

      axiosInstance
        .post("/registerroute/orderController", parsed)
        .then(() => {
          console.log("Order saved in DB");
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // Auto Redirect Timer
  useEffect(() => {
    if (!order) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);

          // Navigate to wholesaler / retailer order history page
          navigate("/Dashboard/Retailer/RetailerOrderHistory");
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [order, navigate]);

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white shadow-lg rounded-3xl p-10 text-center">
          <p className="text-gray-500 text-lg">No order found</p>
        </div>
      </div>
    );

  return (
<div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-100 flex m-8 items-center justify-center px-4 py-10">
  <div className="w-full max-w-xl bg-white rounded-[28px] shadow-xl overflow-hidden border border-slate-200">
        {/* Success Header */}
        <div className="bg-linear-to-r from-green-600 to-emerald-500 p-4 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-420 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white text-green-600 rounded-full p-4 shadow-lg mb-4">
              <CheckCircleIcon style={{ fontSize: 50 }} />
            </div>

            <h1 className="text-2xl font-bold mb-2">
              Payment Successful
            </h1>

            <p className="text-green-100 text-lg">
              Your order has been placed successfully
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <ReceiptLongIcon className="text-blue-600" />
                <p className="text-sm text-slate-500">Order ID</p>
              </div>

              <p className="font-bold text-slate-800 text-lg break-all">
                {order.id || order.orderId}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircleIcon className="text-green-600" />
                <p className="text-sm text-slate-500">Payment Status</p>
              </div>

              <p className="font-bold text-green-600 text-lg">
                Successful
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <LocalShippingIcon className="text-orange-500" />
                <p className="text-sm text-slate-500">Total Amount</p>
              </div>

              <p className="font-bold text-slate-800 text-lg">
                ₹{order.total}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">
                Ordered Items
              </h2>

              <span className="bg-slate-100 px-2 py-1 rounded-full text-sm text-slate-600 font-medium">
                {order.items.length} Items
              </span>
            </div>

            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex justify-between items-center hover:shadow-sm transition"
                >
                  <div>
                    <p className="font-semibold text-slate-800 text-lg">
                      {item.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      Price: ₹{item.price || 0}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500">Quantity</p>
                    <p className="font-bold text-slate-800">
                      {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auto Redirect */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <p className="text-green-700 font-medium text-lg">
              Redirecting to Order History in
            </p>

            <div className="text-2xl font-bold text-green-600 mt-2">
              {countdown}s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
