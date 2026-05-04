import React from "react";

const InventoryOrder = ({ inventoryStock }) => {
  const totalProducts = inventoryStock.length;

const totalUnits = inventoryStock.reduce(
  (acc, item) => acc + Number(item.qty || 0),
  0
);

const lowStockCount = inventoryStock.filter(
  (item) => item.qty < 20
).length;

const expiringSoonCount = inventoryStock.filter((item) => {
  if (!item.expiry) return false;

  const diffDays =
    (new Date(item.expiry) - new Date()) /
    (1000 * 60 * 60 * 24);

  return diffDays <= 90;
}).length;
  return (
  <>{/* INVENTORY OVERVIEW */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">

  {/* TOTAL PRODUCTS */}
  <div className="bg-white rounded-2xl shadow-sm p-5 border">
    <p className="text-gray-500 text-sm">Total Products</p>
    <h2 className="text-3xl font-bold mt-2">{totalProducts}</h2>
    <p className="text-green-600 text-sm mt-1">
      Active Inventory
    </p>
  </div>

  {/* TOTAL UNITS */}
  <div className="bg-white rounded-2xl shadow-sm p-5 border">
    <p className="text-gray-500 text-sm">Total Units</p>
    <h2 className="text-3xl font-bold mt-2">{totalUnits}</h2>
    <p className="text-blue-600 text-sm mt-1">
      Available Stock
    </p>
  </div>

  {/* LOW STOCK */}
  <div className="bg-white rounded-2xl shadow-sm p-5 border">
    <p className="text-gray-500 text-sm">Low Stock Alerts</p>
    <h2 className="text-3xl font-bold mt-2">{lowStockCount}</h2>
    <p className="text-orange-500 text-sm mt-1">
      Need Restocking
    </p>
  </div>

  {/* EXPIRING */}
  <div className="bg-white rounded-2xl shadow-sm p-5 border">
    <p className="text-gray-500 text-sm">Expiring Soon</p>
    <h2 className="text-3xl font-bold mt-2">{expiringSoonCount}</h2>
    <p className="text-red-500 text-sm mt-1">
      Within 90 Days
    </p>
  </div>

</div></>
  );
};

export default InventoryOrder;





/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, subtitle, subtitleColor }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
    <p className="text-xs text-gray-400 font-semibold">{title}</p>
    <div className="flex items-center justify-between mt-2">
      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      <span className={`text-sm font-medium ${subtitleColor}`}>
        {subtitle}
      </span>
    </div>
  </div>
);

const OrderColumn = ({ title, count, dotColor, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      <h3 className="font-semibold text-gray-700">
        {title} <span className="text-gray-400 text-sm">{count}</span>
      </h3>
    </div>

    <div className="space-y-4">{children}</div>
  </div>
);

const OrderCard = ({
  id,
  name,
  items,
  time,
  tag,
  tagColor,
  footer,
  progress,
  progressColor,
  complete,
}) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-semibold text-gray-600">{id}</span>
      {tag && (
        <span className={`text-xs px-2 py-1 rounded-md ${tagColor}`}>
          {tag}
        </span>
      )}
    </div>

    <h4 className="font-semibold text-gray-800 mb-3">{name}</h4>

    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
      <span>{items}</span>
      {time && <span>{time}</span>}
    </div>

    {progress && (
      <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
        <div
          className={`${progressColor} h-2 rounded-full`}
          style={{ width: progress }}
        ></div>
      </div>
    )}

    <div className="flex justify-between items-center text-sm text-gray-400">
      <span>{footer}</span>
      {complete && (
        <span className="text-green-600 font-semibold">COMPLETE</span>
      )}
    </div>
  </div>
);                                          
