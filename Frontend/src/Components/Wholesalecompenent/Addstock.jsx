import React, { useState } from "react";
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";
const Addstock = ({ close }) => {
const [formData, setFormData] = useState({
  ProductName: "",
  ProductSku: "",
  ProductCategory: "",
  ProductQuantity: "",
  ProductExpiryDate: "",
  ProductBatchNo: "",      // ✅ NEW
  ProductPrice: "",        // ✅ NEW
  ProductMfgDate: ""       // ✅ OPTIONAL
});
  console.log("auth id in add stock",)
  const handleSubmit = async () => {
    console.log("form data in frontend",formData);
    close();
      try {
      await axiosInstance.post("/registerroute/AddProductList",formData).then((res) => {
        if (res?.data?.success) {
          alert("product is added to db successfully")
        }
        console.log(res?.data?.message)
      }).catch((error) => {
        console.log("error in api res", error)
      })
    } catch (error) {
      console.log("error",error)
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
   return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

      <div className="bg-white w-600px rounded-xl shadow-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            📦 Add Stock
          </h2>
          <button onClick={close}>✕</button>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Add a new product to your inventory. Fields marked with * are required.
        </p>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">Product Name *</label>
            <input className="w-full border rounded-lg p-2 mt-1"
              type="text"
              name="ProductName"
              value={formData.ProductName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">SKU *</label>
            <input className="w-full border rounded-lg p-2 mt-1"
              type="text"
              name="ProductSku"
              value={formData.ProductSku}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category *</label>
            <select className="w-full border rounded-lg p-2 mt-1"
              name="ProductCategory"
              value={formData.ProductCategory}
              onChange={handleChange}
            >
              <option>Select category</option>
              <option>Antibiotics</option>
              <option>Analgesics</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Quantity *</label>
            <input className="w-full border rounded-lg p-2 mt-1"
              type="number"

              name="ProductQuantity"
              value={formData.ProductQuantity}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Expiry Date *</label>
            <input type="date" className="w-full border rounded-lg p-2 mt-1"
              name="ProductExpiryDate"
              value={formData.ProductExpiryDate}
              onChange={handleChange}
            />
          </div>
  {/* Batch Number */}
<div>
  <label className="text-sm font-medium">Batch No *</label>
  <input
    className="w-full border rounded-lg p-2 mt-1"
    type="text"
    name="ProductBatchNo"
    value={formData.ProductBatchNo}
    onChange={handleChange}
  />
</div>

{/* Unit Price */}
<div>
  <label className="text-sm font-medium">Unit Price (₹) *</label>
  <input
    className="w-full border rounded-lg p-2 mt-1"
    type="number"
    name="ProductPrice"
    value={formData.ProductPrice}
    onChange={handleChange}
  />
</div>
{/* Manufacturing Date */}
<div>
  <label className="text-sm font-medium">MFG Date</label>
  <input
    type="date"
    className="w-full border rounded-lg p-2 mt-1"
    name="ProductMfgDate"
    value={formData.ProductMfgDate}
    onChange={handleChange}
  />
</div>
        </div>



        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={close} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleSubmit}

          >
            Save Stock
          </button>
        </div>

      </div>
    </div>
  );
};
export default Addstock;