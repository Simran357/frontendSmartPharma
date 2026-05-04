import React from 'react'
import { useState } from 'react';
import Wholesalerfirst from './WholesalerPages/Wholesalerfirst';
import RetailerSpecification from './WholesalerPages/RetailerSpecification';
import { Outlet } from 'react-router-dom';

const OrderWholesaler = () => {
  const [activeTab, setActiveTab] = useState("wholesaler");

  return (   
    <>
      <div className='m-6 pr-4'>
        <section className="relative bg-linear-to-r from-[#0f3d2e] via-[#145c43] to-[#0b2f3a] text-white  rounded-2xl  p-6 mt-2 shadow-lg shadow-blue-900/40 overflow-hidden">
          <span className="bg-white/50 backdrop-blur-md text-sm px-2 py-1 rounded-full">
            Flash Sale — Ends in 4h 20m
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold mt-4 leading-snug">
            Wholesale Bonanza:
            <br />
            Extra 15% Off Generics
          </h1>
          <button className="mt-4 bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
            Order Now
          </button>
        </section>
                          
        <div className="m-4">      
          <section className="bg-white p-4">
            {/* Heading */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recommended Wholesalers
            </h2>
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200">
              <button onClick={() => setActiveTab("wholesaler")}
                className={`pb-3 text-sm font-medium transition-all relative
            ${activeTab === "wholesaler"
                    ? "text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                  }`}
              >    
                Wholesaler-First
                {activeTab === "wholesaler" && (
                  <span className="absolute left-0 bottom-0 h-3px w-full bg-green-500 rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("requirement")}
                className={`pb-3 text-sm font-medium transition-all relative
            ${activeTab === "requirement"
                    ? "text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Requirement-First
                {activeTab === "requirement" && (
                  <span className="absolute left-0 bottom-0 h-[3] w-full bg-green-500 rounded-full"></span>
                )}
              </button>
            </div>

            {/* Page Content */}
            <div className="mt-6">
              {activeTab === "wholesaler" && (
                <Wholesalerfirst />
              )}
              {activeTab === "requirement" && (
                <RetailerSpecification />
              )}
            </div>
          </section>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default OrderWholesaler