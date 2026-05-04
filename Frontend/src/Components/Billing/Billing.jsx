import { CurrencyRupee } from "@mui/icons-material";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import axiosInstance from '../Dashboard/Form/Utils/AxiosInstance';

const Billing = () => {
  const location = useLocation();
  const { id } = useParams()
  const cart = location.state?.cart || [];
  const courier = location.state?.courier || null;
  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
const [customerEmail,setCustomerEmail] = useState("")
  // calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + item.qty * (item.ProductPrice || 0),
    0
  );


  const shipping = subtotal > 1000 ? 0 : 150;
  const cgst = subtotal * 0.025;
  const sgst = subtotal * 0.025;
  const discount = subtotal > 2000 ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + cgst + sgst - discount;
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      if (!customerName || !phone || !address) {
        alert("Please fill customer details");
        return;
      }

      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      if (!paymentMethod) {
        alert("Please select payment method");
        return;
      }
      //  Stripe only for card
      if (paymentMethod !== "Card") {
        alert("Only Card payment supported for now");
        return;
      }
      // api calling for stripe

      const orderId = Date.now();
      const formattedItems = cart.map((item) => ({
        productId: item._id,
        name: item.ProductName,
        price: Number(item.ProductPrice) || 0,
        quantity: Number(item.qty) || 1,
        image: item.image || "",

        //  ADD THESE (important)
        batch: item.ProductSku || null,
        expiryDate: item.ProductExpiryDate
          ? new Date(item.ProductExpiryDate)
          : null,

        category: item.ProductCategory || null,
      }));
      const orderData = {
        id: orderId,
        items: formattedItems,
        subtotal: Number(subtotal) || 0,
        shipping: Number(shipping) || 0,
        cgst: Number(cgst) || 0,
        sgst: Number(sgst) || 0,
        discount: Number(discount) || 0,
        total: Number(total) || 0,
        paymentMethod,
        wholesalerId: id,
        //  NEW
        customer: {
          name: customerName,
          phone: phone,
          email:customerEmail,
          address: address,

        },

        courier: {
          id: courier?._id,
          name: courier?.name,
          time: courier?.time,
        },
        date: new Date().toLocaleString()
      };

      console.log("Sending Data:", orderData);

      //api calling 
      const res = await axiosInstance.post("/registerroute/billController", {
        amount: total,
        orderData,
      });

      console.log("Stripe response:", res?.data);

      //  SAVE IN LOCALSTORAGE
      localStorage.setItem("orderData", JSON.stringify(orderData));

      window.location.href = res?.data?.url;
      return; // IMPORTANT
    } catch (error) {
      console.log("Payment error:", error);
      alert("Payment failed");
    }

  };

 
return (
  <>
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6">

        {/* LEFT PANEL */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border  border-gray-400 p-5 sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-100 p-2 rounded-xl">
                <CurrencyRupee className="text-green-600" />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">SmartPharm</h2>
                <p className="text-xs text-slate-500">POS Billing</p>
              </div>
            </div>

          </div>
        </div>

        {/* ORDER TABLE */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-400 overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="font-bold text-lg text-slate-800">
                  Current Order
                </h2>
                <p className="text-sm text-slate-500">
                  {totalItems} items selected
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              {cart.length === 0 ? (
                <div className="p-10 text-center text-slate-400">
                  No items added in cart
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600 border-b">
                    <tr>
                      <th className="text-left px-6 py-4">Product</th>
                      <th className="text-center py-4">Qty</th>
                      <th className="text-right py-4">Price</th>
                      <th className="text-right px-6 py-4">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cart.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-slate-50 transition">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-slate-800">
                              {item.ProductName}
                            </p>
                            <p className="text-xs text-slate-400">
                              {item.ProductCategory}
                            </p>
                          </div>
                        </td>

                        <td className="text-center">{item.qty}</td>

                        <td className="text-right">
                          ₹{item.ProductPrice}
                        </td>

                        <td className="text-right px-6 font-semibold text-slate-800">
                          ₹{(item.qty * item.ProductPrice).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* CUSTOMER DETAILS */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-400 p-6">
            <h2 className="font-bold text-lg mb-5 text-slate-800">
              Customer Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <input
                type="email"
                placeholder="Customer Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <input
                type="text"
                placeholder="Customer Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
        </div>

        {/* SUMMARY PANEL */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-400 p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-5 text-slate-800">
              Order Summary
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600" : ""}>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>CGST</span>
                <span>₹{cgst.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>SGST</span>
                <span>₹{sgst.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t pt-4 flex justify-between font-bold text-lg text-slate-800">
                <span>Total</span>
                <span className="text-green-600">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="mt-8">
              <h3 className="font-semibold text-sm text-slate-700 mb-3">
                Payment Method
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {["UPI", "Card", "Cash"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-xl py-3 border text-sm font-medium transition
                      ${
                        paymentMethod === method
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Complete Checkout
              </button>

              <button className="w-full text-sm text-slate-500 mt-4 hover:text-slate-700 transition">
                Print Quotation Only
              </button>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  </>
);

};

export default Billing;