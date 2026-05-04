import React, { useState, useEffect } from "react";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import EditCalendarRounded from "@mui/icons-material/EditCalendarRounded";
import Download from "@mui/icons-material/Download";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartProduct || [];
  const [cart, setCart] = useState(cartItems);
  const [loading, setLoading] = useState(false);
  const { id } = useParams()
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const res = await axiosInstance.get("/registerroute/getDeliveryPartners");

        if (res.data.success) {
          setCouriers(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCouriers();
  }, []);

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const totalWeight = cart.reduce(
    (acc, item) => acc + item.qty * (item.weight || 1),
    0
  );

  // Pricing
  const subtotal = cart.reduce(
    (acc, item) => acc + item.qty * (item.ProductPrice || 0),
    0
  );

  // const shipping = selectedCourier?.freight_charge || 0;
  const tax = subtotal * 0.05;
  const discount = subtotal > 2000 ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discount;

 return (
  <>
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-15">

        {/* Header */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Review Your Order
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                GSTIN: 29AABCC1234F1Z5 • Verified Retailer
              </p>
            </div>

            <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-xl hover:bg-slate-100 text-sm font-medium">
              <Download fontSize="small" />
              Download Quote
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 items-start">

          {/* Left Section */}
          <div className="space-y-6">

            {/* Cart */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800">
                  <AddShoppingCart style={{ color: '#16a34a' }} />
                  Items in Cart
                </h2>

                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {cart.length} Items
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  Cart is empty
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="grid md:grid-cols-6 gap-4 items-center bg-slate-50 rounded-2xl p-4 border border-slate-100"
                    >

                      {/* Product */}
                      <div className="md:col-span-2">
                        <p className="font-semibold text-slate-800">
                          {item.ProductName}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {item.ProductCategory}
                        </p>
                      </div>

                      {/* Batch */}
                      <div className="text-sm text-slate-600">
                        <p>{item.ProductSku}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Exp:
                          {item.ProductExpiryDate
                            ? new Date(item.ProductExpiryDate).toLocaleDateString()
                            : 'N/A'}
                        </p>
                      </div>

                      {/* Qty */}
                      <div className="flex items-center gap-2">
                        <button
                          className="w-8 h-8 rounded-lg border border-slate-300 hover:bg-slate-100 font-bold"
                          onClick={() => decreaseQty(item._id)}
                        >
                          -
                        </button>

                        <span className="font-semibold min-w-30px text-center">
                          {item.qty}
                        </span>

                        <button
                          className="w-8 h-8 rounded-lg border border-slate-300 hover:bg-slate-100 font-bold"
                          onClick={() => increaseQty(item._id)}
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-slate-700 font-medium">
                        ₹{item.ProductPrice}
                      </div>

                      {/* Total */}
                      <div className="text-right font-bold text-slate-800">
                        ₹{(item.qty * (item.ProductPrice || 0)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Courier Selection */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <LocalShippingOutlined style={{ color: '#16a34a' }} />

                <h3 className="font-bold text-lg text-slate-800">
                  Select Courier
                </h3>
              </div>

              {couriers.length === 0 ? (
                <p className="text-slate-400 text-sm">
                  No courier available
                </p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {couriers.map((c) => (
                    <div
                      key={c._id}
                      onClick={() => setSelectedCourier(c)}
                      className={`
                        border rounded-2xl p-4 cursor-pointer transition-all
                        ${
                          selectedCourier?._id === c._id
                            ? 'border-green-500 bg-green-50'
                            : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                        }
                      `}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {c.name}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            Delivery: {c.time}
                          </p>
                        </div>

                        {selectedCourier?._id === c._id && (
                          <div className="w-5 h-5 rounded-full bg-green-600"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-6 h-fit">
            <h2 className="font-bold text-xl text-slate-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>GST (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <hr className="border-slate-200" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-800">
                  Total
                </span>

                <span className="text-2xl font-bold text-green-600">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              disabled={!selectedCourier}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold transition-all disabled:bg-slate-300"
              onClick={() =>
                navigate(`/Dashboard/Retailer/Order/${id}/Billing`, {
                  state: { cart, total, courier: selectedCourier },
                })
              }
            >
              Continue to Billing
            </button>

            {!selectedCourier && (
              <p className="text-xs text-center text-slate-400 mt-3">
                Select a courier to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>

    <Outlet />
  </>
);;
};

export default Cart;  