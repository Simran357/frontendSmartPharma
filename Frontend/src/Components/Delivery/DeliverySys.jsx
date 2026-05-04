import React, { useState,useEffect } from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";
const DeliverySys = () => {
    const [showModal, setShowModal] = useState(false);

    //  NOW companies is state
    const [companies, setCompanies] = useState([]);
  
    const [form, setForm] = useState({
        name: "",
        type: "",
        coverage: "",
        time: "",
        email: "",
        mobileNumber: "",
        description:"",
    });
    // input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
                   
    useEffect(() => {
        console.log("fetchPartners")
    const fetchPartners = async () => {
        try {
            const res = await axiosInstance.get(
                "/registerroute/getDeliveryPartners"
            );

            console.log("Fetched from DB ", res.data);

            setCompanies(res.data?.data || []); // IMPORTANT
        } catch (error) {
            console.error("Error fetching data ", error.message);
        }
    };

    fetchPartners();
}, []); 
    
    // add company
    const handleAdd = async () => {
        try {
            const payload = {
                ...form,
                active: true,
            };
console.log("Sending Payload:", payload);
            // API CALL
            const res = await axiosInstance.post("/registerroute/addDeliveryPartner", payload);

            console.log("Saved in DB ", res.data);

            // UI update after backend success
            setCompanies((prev) => [...prev, res.data.data]);

            setShowModal(false);

            setForm({
                name: "",
                type: "",
                coverage: "",
                time: "",
                email: "",
                mobileNumber: "",
                description:"",
            });

        } catch (error) {
            console.error("Error saving partner ", error.response?.data || error.message);
        }

    }


    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <LocalShippingOutlinedIcon />
                    Delivery Partner Management
                </h1>   
                <p className="text-gray-500">
                    Manage logistics companies for pharmacy orders
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow">
                    Total Partners: {companies.length}
                </div>

                <div className="bg-white p-4 rounded-xl shadow text-green-600">
                    Active: {companies.filter((c) => c.active).length}
                </div>

                <div className="bg-white p-4 rounded-xl shadow text-red-600">
                    Inactive: {companies.filter((c) => !c.active).length}
                </div>
            </div>

            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
                    <AddIcon />
                    Add Delivery Partner
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {companies.map((company) => (
                    <div                                     
                        key={company._id}
                        className="bg-white p-6 rounded-xl shadow"
                    >

                        {/* Name */}
                        <h2 className="text-xl font-semibold mb-1">
                            {company.name}
                        </h2>

                        <p className="text-gray-500 mb-3">{company.type}</p>

                        {/* Info */}
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>📍 Coverage: {company.coverage}</p>
                            <p>⏱  Delivery Time: {company.time}</p>
                            <p>📧 Email: {company.email}</p>
                            <p>📱 Mobile: {company.mobileNumber}</p>
                            <p>📱 Description : {company.description}</p>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2 mt-5">
                            {company.active ? (
                                <CheckCircleIcon className="text-green-500" />
                            ) : (
                                <CancelIcon className="text-red-500" />
                            )}

                            <span
                                className={
                                    company.active ? "text-green-600" : "text-red-600"
                                }
                            >
                                {company.active ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>
                ))}

                {/* MODAL */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

                        <div className="bg-white p-6 rounded-xl w-400px relative">

                            {/* close */}
                            <button
                                className="absolute top-2 right-2"
                                onClick={() => setShowModal(false)}
                            >
                                <CloseIcon />
                            </button>

                            <h2 className="text-xl font-semibold mb-4">
                                Add Delivery Partner
                            </h2>

                            {/* form */}
                            <div className="space-y-2">

                                <input
                                    name="name"
                                    placeholder="Company Name"
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                                <input
                                    name="type"
                                    placeholder="Type"
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                                <input
                                    name="coverage"
                                    placeholder="Coverage"
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                                <input
                                    name="time"
                                    placeholder="Delivery Time"
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                                <input
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                                <input
                                    name="mobileNumber"
                                    placeholder="Mobile Number"
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                                <input
                                    name="description"
                                    placeholder="description"
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />

                                {/* submit */}
                                <button
                                    onClick={handleAdd}
                                    className="w-full bg-green-600 text-white py-2 rounded"
                                >
                                    Save Partner
                                </button>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>);
};
export default DeliverySys;