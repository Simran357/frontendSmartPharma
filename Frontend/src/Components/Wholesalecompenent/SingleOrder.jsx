import React from "react";
import { Calendar } from "lucide-react";
import { CreditCard } from "lucide-react";
import { User } from "lucide-react";
import { MapPin } from "lucide-react";
import { Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";
import { useLocation, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SingleOrder = () => {

  const { id } = useParams();
  const location = useLocation();
  console.log(id)
  //  get instant data
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

  const [order, setOrder] = useState(location.state || null);
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "");

  useEffect(() => {
    const fetchSingleOrder = async () => {
      try {
        const res = await axiosInstance.get(`/registerroute/getOrderById/${id}`);
        setOrder(res?.data?.order);
        console.log(res?.data?.order)
      } catch (err) {
        console.log(err);
      }
    };

    fetchSingleOrder();
  }, [id]);

  const updateOrderStatus = async (newStatus) => {
    try {
      const res = await axiosInstance.put(
        `/registerroute/updateOrderStatus/${id}`,
        {
          status: newStatus,
        }
      );

      if (res.data.success) {
        setOrder((prev) => ({
          ...prev,
          status: newStatus,
        }));

        toast.dismiss(); // close popup
        toast.success("Status Updated Successfully", {
          position: "top-right",
          autoClose: 2000, // 2 sec me close

        })
      }
    } catch (err) {
      toast.error("Status Update Failed");
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">

            {/* Order Header */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">#{order?.orderId}</h1>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                  {order?.status}
                </span>
              </div>   
              <div className="flex justify-between items-center">
                <div >

                  <div className="space-y-2 mt-2">
                    {/* Date with icon */}
                    <div className="flex items-center gap-2 mt-2 text-gray-500">
                      <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="leading-none">{new Date(order?.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="leading-none">{order?.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="flex  gap-4">
                  <button className="px-4 py-2 bg-gray-200 rounded-lg">
                    Download PDF
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={() => {
                      toast.info(
                        <div className="space-y-3">
                          <p className="font-semibold">Update Order Status</p>

                          <select
                            className="border p-2 rounded w-full text-black"
                            defaultValue={order?.status}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                          >
                            {steps.map((step) => (
                              <option key={step} value={step}>
                                {step.replaceAll("_", " ")}
                              </option>
                            ))}
                          </select>

                          <button
                            className="bg-blue-600 text-white px-3 py-2 rounded w-full"
                            onClick={() => updateOrderStatus(selectedStatus)}
                          >
                            Update
                          </button>
                        </div>,
                        {
                          autoClose: false,
                          closeOnClick: false,
                        }
                      );
                    }}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>


            <div className="bg-white p-6 rounded-2xl shadow">

              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-2xl">Order Items</h2>
                <span className="font-medium text-2xl text-gray-500">
                  {order?.items?.length} items ordered
                </span>
              </div>
              {/* Heading */}
              <div className="grid grid-cols-5 font-semibold text-gray-600 border-b pb-2 mb-3">
                <div className="col-span-2">Product Name</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Subtotal</div>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {order?.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 items-center  border-b pb-3"
                  >
                    <div className="col-span-2 font-medium">
                      {item?.name}
                    </div>
                    <div>{item?.quantity}</div>
                    <div>₹{item?.price}</div>
                    <div>₹{item?.price * item?.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* RIGHT SECTION */}
          <div className="space-y-6">

            {/* Customer */}

            <div className="bg-white p-6 rounded-2xl shadow">

              <div className="flex items-center gap-2 mb-4">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="font-semibold text-2xl">Customer</h2>
              </div>



              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">FULL NAME</p>
                  <p className="font-medium text-lg">{order?.customer?.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">EMAIL ADDRESS </p>
                  <p className="text-gray-800 text-lg">{order?.customer?.email}</p>
                </div>

                {/* Phone + Account same row */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">PHONE</p>
                    <p className="text-gray-800 text-lg">{order?.customer?.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-blue-600">{order?.customer?.address}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Shipping */}
            <div className="bg-white p-6 rounded-2xl shadow">

              <div className="flex items-center gap-2 mb-3">
                <MapPin className="text-blue-600 h-[1.3em] w-[1.3em]" />
                <h2 className="font-semibold text-3xl">Shipping details</h2>
              </div>

              <p className="text-gray-400 mt-2 text-sm">
                Courier name:  {order?.courier?.name}
              </p>
              <p className="text-gray-400 mt-2 text-sm">
               Delivery time: {order?.courier?.time}
              </p>

            </div>

            {/* Summary */}
            <div className="bg-blue-900 text-white p-6 rounded-2xl shadow">
              <h2 className="font-semibold text-3xl mb-4">Order Summary</h2>

             

              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>₹{order?.sgst}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>{order?.shipping}</span>
              </div>

              <hr className="border-gray-500 mb-4" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{order?.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default SingleOrder;