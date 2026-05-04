import React, { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart, Headset } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";

function OneMedicine() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  //  EXPIRY STYLE
  const getExpiryStyle = (expiry) => {
    if (!expiry) return "";

    const today = new Date();
    const expDate = new Date(expiry);
    const diff = (expDate - today) / (1000 * 60 * 60 * 24);

    if (diff < 0) return "text-red-600 bg-red-50";
    if (diff < 30) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  //  STATUS LOGIC
  const getStatus = (qty) => {
    if (qty === 0) return "DEPLETED";
    if (qty < 10) return "CRITICAL";
    return "ACTIVE";
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "CRITICAL":
        return "bg-red-100 text-red-600";
      case "DEPLETED":
        return "text-slate-300";
      default:
        return "";
    }
  };

  //  FETCH DATA
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/registerroute/batches/${state?.name}`
        );
        setBatches(res?.data?.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (state?.name) fetchBatches();
  }, [state?.name]);
console.log("batches",batches)

  //  STATS
  const totalStock = batches.reduce((sum, b) => sum + (b.qty || 0), 0);

  const nearExpiry = batches.filter((b) => {
    if (!b.expiry) return false;
    const diff =                                                           
      (new Date(b.expiry) - new Date()) / (1000 * 60 * 60 * 24);
    return diff < 30 && diff > 0;
  }).length;

  //  ALT PRODUCTS (TEMP)
  const alternatives = [
    {
      name: "Calpol 650mg",
      price: state?.mrp ? state.mrp - 5 : 0,
      type: "HIGH MARGIN",
    },
    {
      name: "P-650 Tablet",
      price: state?.mrp ? state.mrp - 10 : 0,
      type: "GENERIC",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col">
      <main className="flex-1 p-6 flex flex-col gap-6">

        {/*  HEADER */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white border rounded-full flex items-center justify-center hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-2xl font-bold">
                {state?.name || "Medicine"}
              </h1>
              <p className="text-sm text-slate-500">
                Batch: {state?.batch} • Pack: {state?.pack} • MRP: ₹{state?.mrp}
              </p>
              <p className="text-xs text-slate-400">
                Supplier: {state?.supplier} • Invoice: {state?.invoiceNumber}
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg">
            <ShoppingCart size={16} /> Order Stock
          </button>
        </div>

        {/*  STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Total Stock" value={`${totalStock} Units`} />
          <Card title="Near Expiry" value={nearExpiry} />
          <Card title="Purchase Price" value={`₹${state?.rate}`} />
        </div>

        {/*  MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* SALES PLACEHOLDER */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border">
            <h2 className="font-bold mb-2">Sales Trend</h2>
            <div className="h-160px flex items-center justify-center text-slate-400">
              Chart coming soon...
            </div>
          </div>

          {/* ALTERNATIVES */}
          <div className="flex flex-col gap-3">
            {alternatives.map((alt, i) => (
              <div key={i} className="bg-white p-4 border rounded-xl">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{alt.name}</h3>
                  <span className="text-xs bg-slate-200 px-2 rounded">
                    {alt.type}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>₹{alt.price}</span>
                  <button className="text-blue-600 text-xs">
                    Switch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*  TABLE */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="p-4 border-b font-semibold">
            Batch History
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="p-3">Batch</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Expiry</th>
                  <th>Stock</th>
                  <th>Supplier</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center p-6 text-slate-400">
                      Loading...
                    </td>
                  </tr>
                ) : batches.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-6 text-slate-400">
                      No batches found
                    </td>
                  </tr>
                ) : (
                  batches.map((b, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3 font-semibold">
                        {b.id || b.batch}
                      </td>
                      <td>
                        {b.date
                          ? new Date(b.date).toLocaleDateString("en-IN")
                          : "-"}
                      </td>
                      <td>₹{b.price || b.rate}</td>
                      <td>
                        <span className={`px-2 py-1 rounded ${getExpiryStyle(b.expiry)}`}>
                          {b.expiry
                            ? new Date(b.expiry).toLocaleDateString("en-IN")
                            : "-"}
                        </span>
                      </td>
                      <td>{b.qty}</td>
                      <td>{b.supplier}</td>
                      <td>
                        <span
                          className={`px-2 py-1 text-xs rounded ${getStatusStyle(
                            getStatus(b.qty)
                          )}`}
                        >
                          {getStatus(b.qty)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/*  FOOTER */}
      <footer className="border-t p-3 flex justify-between text-xs text-slate-500">
        <div className="flex gap-4 items-center">
          <Headset size={14} /> Support
          <span>Last Updated: {new Date().toLocaleTimeString()}</span>
        </div>
        <div>System: Optimal</div>
      </footer>
    </div>
  );
}

//  REUSABLE CARD
const Card = ({ title, value }) => (
  <div className="bg-white p-4 border rounded-xl">
    <p className="text-xs text-slate-500">{title}</p>
    <h2 className="text-lg font-bold">{value}</h2>
  </div>
);

export default OneMedicine;  