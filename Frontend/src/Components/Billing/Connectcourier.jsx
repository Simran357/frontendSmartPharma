import React, { useEffect, useState } from "react";
import axiosInstance from "../Dashboard/Form/Utils/AxiosInstance";




const Courier = () => {

  const [partners, setPartners] = useState([]);
  const [connectedIds, setConnectedIds] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axiosInstance.get(
          "/registerroute/getDeliveryPartners"
        );

        setPartners(res.data.data); // important
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, []);

  const handleConnect = async (courierId) => {
    try {
      const wholesalerId = localStorage.getItem("userId");

      await axiosInstance.post("/registerroute/connectCourier", {
        wholesalerId,
        courierId,
      });

      setConnectedIds((prev) => [...prev, courierId]);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        {/* First line */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl  font-bold">Courier Partner Integration</h1>
          {/* <span className="text-green-500 text-md">DEFAULT ROUTING POLICY</span> */}
        </div>
        <div className="flex justify-between items-center ">
          <p className="text-green-500">
            Orchestrate your third-party logistics and carrier APIs in one secure dashboard.
          </p>
          {/* <div className="flex gap-2">
            <span className="bg-gray-200 text-black px-3 py-1 rounded-none text-sm">
              Lowest Cost First
            </span>
            <span className="bg-green-800 text-green-500 px-3 py-1 rounded-none text-sm">
              Global Setting
            </span>
          </div> */}
        </div>
      </div>
      {/* <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Connected Partners</h2>
        <div className="divide-y">
          <div className="bg-white rounded-xl border overflow-hidden">

          
            <div className="grid grid-cols-5 bg-gray-50 px-6 py-3 text-sm font-semibold border-b text-gray-500">
              <div>PARTNER</div>
              <div>STATUS</div>
              <div>UPTIME / HEALTH</div>
              <div>LATENCY</div>
              <div className="text-right text-green-500">ACTIONS</div>
            </div>

           
            <div className="divide-y">

                           <div className="grid grid-cols-5 items-center px-6 py-4">
                <div>
                  <p className="font-medium">BlueDart Express</p>
                  <p className="text-sm text-gray-400">API v2.4 • Production</p>
                </div>

                <div className="text-green-600 font-medium">● Active</div>

                <div className="text-gray-600">99.9% / Healthy</div>

                <div>
                  <div className="w-32 h-2 bg-gray-200 rounded">
                    <div className="w-24 h-2 bg-green-500 rounded"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">120ms</p>
                </div>

                <div className="text-right text-green-500">
                  <button className=" font-medium ">
                    Configure
                  </button>
                </div>
              </div>

              
              <div className="grid grid-cols-5 items-center px-6 py-4">
                <div>
                  <p className="font-medium">Delhivery</p>
                  <p className="text-sm text-gray-400">Webhook Active</p>
                </div>

                <div className="text-green-600 font-medium">● Active</div>

                <div className="text-gray-600">98.4% / Stable</div>

                <div>
                  <div className="w-32 h-2 bg-gray-200 rounded">
                    <div className="w-20 h-2 bg-green-500 rounded"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">150ms</p>
                </div>

                <div className="text-right text-green-500">
                  <button className=" font-medium ">
                    Configure
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div> */}
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4">
        Add New Partner
      </h1>
      {/* Add New Partner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side - Partner Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2  items-start gap-6">


          {/* Card */}
          {partners.map((item, index) => (
            <div key={index} className="bg-white p-10  rounded-xl  w-full shadow">
              <div className="flex justify-between items-center mb-4">
                <div className={`w-10 h-10 rounded flex ${item.background} uppercase items-center justify-center font-bold`}>
                  {item.name.slice(0, item.index)}
                </div>
                <span className="text-xs text-green-500 bg-gray-100 px-3 py-1 rounded">
                  {item.coverage}
                </span>
              </div>

              <h3 className="font-bold">{item.name}</h3>
              {item.description && (
                <p className="text-sm text-green-700 mt-2">
                  {item.description}
                </p>
              )}
              <button
                onClick={() => handleConnect(item._id)}
                className={`mt-4 w-full py-2 rounded ${connectedIds.includes(item._id)
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {connectedIds.includes(item._id) ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default Courier;