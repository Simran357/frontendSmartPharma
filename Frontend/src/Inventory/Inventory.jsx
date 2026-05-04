import { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axiosInstance from "../Components/Dashboard/Form/Utils/AxiosInstance";

import StatCard from "./StatCard";
import InventoryTable from "./InventoryTable";
import StockEntry from "./StockEntry";
import InventoryOrder from "./InventoryOrder";
export default function Inventory() {
  const [open, setOpen] = useState(false);
  const [inventoryStock, setInventoryStock] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axiosInstance.get("/registerroute/getInventoryStock");

        const formattedData =
          res?.data?.data?.flatMap((invoice) =>
            invoice.items.map((item) => ({
              name: item.name || item.ProductName,
              qty: item.qty || item.ProductQuantity,
              batch: item.batch || item.ProductBatchNo,
              expiry: item.expiry || item.ProductExpiryDate,
              supplier: invoice.supplierName,
              invoiceNumber: invoice.invoiceNumber,
            }))
          ) || [];

        setInventoryStock(formattedData);
      } catch (error) {
        console.log("Inventory fetch error", error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        <main className="p-8">

          <div className="mb-6">
            <h2 className="text-4xl font-bold text-gray-800">
              Inventory Overview
            </h2>
          </div>

          <div className="flex justify-end mb-4">
            <Button type="primary" size="large" onClick={() => setOpen(true)}>
              + Add New Stock
            </Button>
          </div>

          {/* PASS DATA */}
          <InventoryOrder inventoryStock={inventoryStock} />

          <InventoryTable inventoryStock={inventoryStock} />

          <Modal
            title="Add New Stock"
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
            width={1000}
          >
            <StockEntry onClose={() => setOpen(false)} />
          </Modal>

        </main>
      </div>
    </div>
  );
}
