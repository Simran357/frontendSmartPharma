import { useEffect, useState, useMemo, useCallback } from "react";
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate("")

  // ================= FETCH =================
  const fetchOrders = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/registerroute/getWholesalerOrders");
      setOrders(res?.data?.orders || []);
    } catch (err) {
      console.log("Error fetching orders", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ================= FILTER =================
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const text = search.toLowerCase();
      return (                                                     
        order?.orderId?.toLowerCase().includes(text) ||         
        order?.customer?.name?.toLowerCase().includes(text)             
      );
    });
  }, [orders, search]);

  // ================= STATS =================
  const stats = useMemo(() => {
  const today = new Date().toDateString();

  return {
    total: orders.filter(o => o.status === "PLACED").length,

    processing: orders.filter(
      (o) =>
        o.status === "PLACED" ||
        o.status === "CONFIRMED"
    ).length,

    packed: orders.filter(
      (o) => o.status === "PACKED"
    ).length,

    today: orders.filter(
      (o) =>
        new Date(o.createdAt).toDateString() === today
    ).length,
  };
}, [orders]);

  return (
    <div className='bg-slate-50 font-sans text-slate-900'>
      <div className='min-h-screen flex flex-col'>

        {/* HEADER */}
        <header className='bg-white border-b border-slate-200 py-4 px-6'>
          <h1 className='font-bold text-3xl'>Pending Orders</h1>
        </header>

        <main className='p-6 space-y-6'>

          {/* SUMMARY */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card title="Total Pending" value={stats.total} />
            <Card title="Processing" value={stats.processing} />
            <Card title="Packed" value={stats.packed} />
            <Card title="Today" value={stats.today} />
          </section>

          {/* SEARCH */}
          <section className="bg-white p-4 rounded-xl shadow-sm">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search OrderID / Retailer"
              className="w-full border p-2 rounded-lg"
            />
          </section>

          {/* TABLE */}
          <section className="bg-white rounded-xl shadow-sm overflow-hidden">

            {loading ? (
              <p className="p-6 text-center">Loading...</p>
            ) : filteredOrders.length === 0 ? (
              <p className="p-6 text-center text-gray-500">No Orders Found</p>
            ) : (

              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Retailer</th>
                    <th className="px-6 py-4">Items</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="border-t hover:bg-gray-50" onClick={() => navigate(`${order._id}`, { state: order })}>

                      <td className="px-6 py-4 text-indigo-600 font-semibold">
                        #{order.orderId}
                      </td>

                      <td className="px-6 py-4">
                        <div>{order?.customer?.name}</div>
                        <div className="text-xs text-gray-500">
                          {order?.customer?.address}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {order?.items?.length || 0}
                      </td>

                      <td className="px-6 py-4 text-right font-bold">
                        ₹ {order?.total || 0}
                      </td>

                      <td className="px-6 py-4">
                        {order?.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-6 py-4">
                        {order?.paymentMethod || "-"}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={order?.status} />
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

            )}
          </section>

        </main>
      </div>
    </div>
  );
};

// ================= REUSABLE =================

const Card = ({ title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-400">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Paid: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Processing: "bg-blue-100 text-blue-600",
    Packed: "bg-purple-100 text-purple-600",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${styles[status] || "bg-gray-100"}`}>
      {status}
    </span>
  );
};

export default PendingOrders;