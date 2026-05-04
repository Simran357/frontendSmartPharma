import { useEffect, useState } from "react"
import axiosInstance from "../Components/Dashboard/Form/Utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
export default function InventoryTable({ inventoryStock }) {


  const navigate = useNavigate()


  
  return (
    
    <div className="bg-white rounded-xl p-6 shadow-sm">

      {/* Tabs */}
      <div className="flex gap-8 border-b mb-6 text-sm font-medium">
        <button className="pb-3 border-b-2 border-green-500 text-green-600">
          All Inventory
        </button>
        <button className="pb-3 text-gray-500">Expiring Soon</button>
        <button className="pb-3 text-gray-500">Overstocked</button>
        <button className="pb-3 text-gray-500">Dead Stock</button>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[2fr_1fr_1.2fr_1.6fr_1fr_40px] text-xs uppercase text-gray-400 mb-4">
        <span>Product & SKU</span>
        <span>Category</span>
        <span>Stock Level</span>
        <span>Expiry Timeline</span>
        <span>Status</span>
        <span></span>
      </div>

      {inventoryStock.map((item, index) => {
        const today = new Date();
        const expDate = item.expiry ? new Date(item.expiry) : null;

        let status = "Stable";
        let statusColor = "text-green-600";
        let badge = "bg-green-100 text-green-700";
        let progress = "bg-green-500 w-full";

        if (expDate) {
          const diffDays = (expDate - today) / (1000 * 60 * 60 * 24);

          if (diffDays < 30) {
            status = "High Risk";
            statusColor = "text-red-600";
            badge = "bg-red-100 text-red-600";
            progress = "bg-red-500 w-1/4";
          } else if (diffDays < 90) {
            status = "Monitor";
            statusColor = "text-orange-500";
            badge = "bg-orange-100 text-orange-600";
            progress = "bg-orange-400 w-2/3";
          }
        }

        return (
          <div key={index} className="border-t py-4">

            {/* MAIN ROW */}
            <div className="grid grid-cols-[2fr_1fr_1.2fr_1.6fr_1fr_40px] items-center"
              onClick={() => navigate(`${item.name}`, { state: item })}

            >
              {/* PRODUCT */}
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Batch: {item.batch || "N/A"}
                </p>
              </div>

              {/* CATEGORY */}
              <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 w-fit">
                General
              </span>

              {/* STOCK */}
              <div>
                <p className="font-semibold">{item.qty} Units</p>
                <span className={`text-xs px-2 py-1 rounded ${badge}`}>
                  {item.qty > 1000 ? "Overstock" : item.qty < 20 ? "Low Stock" : "Optimal"}
                </span>
              </div>

              {/* EXPIRY PROGRESS */}
              <div>
                <div className="h-2 bg-gray-200 rounded-full w-44 mb-1">
                  <div className={`h-full rounded-full ${progress}`}></div>
                </div>

                <p className={`text-xs ${statusColor}`}>
                  {item.expiry
                    ? `Exp: ${new Date(item.expiry).toLocaleDateString()}`
                    : "No Expiry"}
                </p>
              </div>

              {/* STATUS */}
              <div className={`flex items-center gap-2 font-medium ${statusColor}`}>
                <span className={`w-2 h-2 rounded-full ${progress.replace("w-full", "bg-green-500")}`}></span>
                {status}
              </div>

              {/* ACTION */}
              <button className="text-xl text-gray-400">⋮</button>
            </div>

            {/*  OPTIONAL: BATCH DETAILS (like your UI) */}
            <div className="bg-gray-50 mt-3 p-3 rounded-lg text-sm text-gray-600">
              Supplier: <span className="font-medium">{item.supplier}</span> | Invoice:{" "}
              <span className="font-medium">{item.invoiceNumber}</span>
            </div>

          </div>
        );
      })}

    
    </div>
  )
}
