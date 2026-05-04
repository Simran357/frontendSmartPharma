import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WarningIcon from '@mui/icons-material/Warning';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import avocado from "./Pic/OrganicHassAvocados.jpg";
import BoltIcon from '@mui/icons-material/Bolt';
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { contextProvide } from "../../Components/Dashboard/Form/Utils/Context/CommonContext";
const Lowstock = () => {

  const [activeCategory, setActiveCategory] = useState("All Items");
  const [getStockItems, setGetStockItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(contextProvide);



  useEffect(() => {
    if (!auth) return; // wait until auth comes

    const fetchData = async () => {
      try {
        setLoading(true);

        const [productRes, orderRes] = await Promise.all([
          axiosInstance.get(`/registerroute/getProductList/${auth}`),
          axiosInstance.get("/registerroute/getWholesalerOrders"),
        ]);

        if (productRes?.data?.data) {
          setGetStockItems(productRes.data.data);
        }

        if (orderRes?.data?.success) {
          setOrders(orderRes.data.orders);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth]); // 


  const historyData = orders.flatMap(order =>
    (order?.items || []).map(item => ({
      orderId: order.orderId,
      itemName: item.name,
      category: item.category || "Pharma",
      qty: item.qty || item.quantity || 0,
      date: order.createdAt,
      status: order.status,
    }))
  );
  const enrichedLowStockItems = React.useMemo(() => {
    return getStockItems.map((product) => {

      const matchedOrder = orders.find(order =>
        order.items?.some(item =>
          item?.name?.trim().toLowerCase() ===
          product?.ProductName?.trim().toLowerCase()
        )
      );

      const matchedItem = matchedOrder?.items?.find(item =>
        item?.name?.trim().toLowerCase() ===
        product?.ProductName?.trim().toLowerCase()
      );

      console.log("PRODUCT:", product.ProductName);
      console.log("MATCHED ITEM:", matchedItem);

      return {
        ...product,
        supplierName: matchedOrder?.supplierName || "Unknown",
        invoiceNumber: matchedOrder?.invoiceNumber || "N/A",
        batch: matchedItem?.batch || product?.ProductBatchNo,
        hsn: matchedItem?.hsn || "N/A",
        pack: matchedItem?.pack || "N/A",
        rate: matchedItem?.rate || product?.ProductPrice,
        expiry: matchedItem?.expiry || product?.ProductExpiryDate,
        qty: matchedItem?.qty || product?.ProductQuantity,
      };
    });
  }, [getStockItems, orders]);

  const categories = React.useMemo(() => {
    const cats = enrichedLowStockItems.map(
      item => item.ProductCategory || "Pharma"
    );

    return ["All Items", ...new Set(cats)];
  }, [enrichedLowStockItems]);

  const filteredItems =
    activeCategory === "All Items"
      ? enrichedLowStockItems
      : enrichedLowStockItems.filter(
        item =>
          (item.ProductCategory || "Pharma") === activeCategory
      );
  return (   
    <div className="bg-gray-50 min-h-screen">
      {/* /-- Main Dashboard Container - / */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
        {/* <!-- Dashboard Header: Title and Primary Action --> */}
        <div className='flex flex-col md:flex-row  md:items-center justify-between gap-6 mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-slate-900  mb-2'>Low Stock Inventory Alerts</h1>
            <p className="text-slate-500 ">Manage items that are below your threshold and replenish
              quickly.</p>
          </div>               
          <div>
            <div className='flex items-center text-white gap-4'>
              <button className="inline-flex items-center px-5 py-2.5  text-sm md:px-5 md:py-2.5 md:text-base
                                bg-blue-700 hover:bg-blue-700  font-semibold rounded-lg shadow-sm transition-all active:scale-95">
                <AddCircleIcon className="mr-2 " />
                New Order
              </button>

            </div>
          </div>
        </div>
        <div className='flex flex-wrap gap-2 mb-8'>
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
                 ${activeCategory === cat
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
            >       
              {cat}   
            </button>       
          ))}            
        </div>
        {/* Summary Cards: Low Stock Stats and Toggle Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          {filteredItems?.map((item, i) => {

            const quantity = item.ProductQuantity || 0;

            const MAX_STOCK = 500;

            const stockPercent = Math.min(
              100,
              (quantity / MAX_STOCK) * 100
            );

            const expiryDate =
              item.ProductExpiryDate;

            return (
              <div
                key={item._id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {item.ProductName}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      SKU: {item?.ProductSku || "N/A"}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold
                     ${quantity < 100
                        ? "bg-red-100 text-red-600"
                        : quantity < 300
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                    {quantity < 100
                      ? "LOW STOCK"
                      : quantity < 300
                        ? "MEDIUM"
                        : "GOOD"}
                  </span>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-y-3 text-sm mb-5">

                  <div>
                    <p className="text-slate-400">Category</p>
                    <p className="font-medium">
                      {item.ProductCategory}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">Batch</p>
                    <p className="font-medium">
                      {item.ProductBatchNo || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">Stock</p>
                    <p className="font-bold text-orange-600">
                      {quantity} Units
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">MRP</p>
                    <p className="font-medium">
                      ₹{item.ProductPrice || 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">Supplier</p>
                    <p className="font-medium">
                      {item?.supplierName || "Unknown"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">Invoice</p>
                    <p className="font-medium">
                      {item?.invoiceNumber || "N/A"}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-slate-400">Expiry</p>
                    <p className="font-medium text-red-500">
                      {item.ProductExpiryDate
                        ? new Date(item.ProductExpiryDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Stock Level</span>
                    <span className="font-semibold text-orange-600">
                      {stockPercent.toFixed(0)}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${stockPercent}%` }}
                    />
                  </div>
                </div>           

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="p-5 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-xl text-sm font-semibold">
                    Restock
                  </button>

                  <button className="px-4 border border-slate-200 rounded-xl hover:bg-slate-50">
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>



        <div className='bg-white  border border-slate-200  rounded-xl shadow-sm overflow-hidden '>
          <div className=' flex justify-between items-center px-6 py-5'>
            <h2 className='font-bold text-slate-900 text-lg'>Replenishment History</h2>
            <a className='text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors'>View Hostory</a>
          </div>
          <div className='overflow-x-auto'>
            <table className="w-full text-left">
              <thead className="bg-slate-50 ">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Item
                    Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category
                  </th>      
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Ordered Qty</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Order ID
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyData?.length > 0 ? (
                  historyData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">

                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        {row?.itemName}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {row?.category}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {row?.qty}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        #{row?.orderId}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(row?.date).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
            ${row.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}>
                          {row?.status}
                        </span>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-slate-400">
                      No history available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main >
    </div>
  )
}
export default Lowstock