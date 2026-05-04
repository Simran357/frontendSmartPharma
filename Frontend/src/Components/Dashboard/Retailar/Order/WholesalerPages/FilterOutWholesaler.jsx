import React from 'react'
import { useState } from 'react';
import MixedWholesaler from './MixedWholesaler';
import OneWholesaler from './FindWholesaler';

const FilterOutWholesaler = () => {
  const [activeTab, setActiveTab] = useState("wholesaler");

  return (
    <>

      <div className='p-4'>
        <div className="flex gap-6 border-b border-gray-200">
          <button onClick={() => setActiveTab("wholesaler")}
            className={`pb-3 text-sm font-medium transition-all relative
            ${activeTab === "wholesaler"
                ? "text-green-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            One-Wholesaler

            {activeTab === "wholesaler" && (
              <span className="absolute left-0 bottom-0 h-3px w-full bg-green-500 rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("MixedWholesaler")}
            className={`pb-3 text-sm font-medium transition-all relative
            ${activeTab === "MixedWholesaler"
                ? "text-green-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            Mixed-Wholesaler
            {activeTab === "MixedWholesaler" && (
              <span className="absolute left-0 bottom-0 h-[3] w-full bg-green-500 rounded-full"></span>
            )}
          </button>
        </div>
        <div className="">
          {activeTab === "wholesaler" && (
            <OneWholesaler />
          )}
          {activeTab === "MixedWholesaler" && (
            <MixedWholesaler />
          )}
        </div>

      </div>


    </>
  )
}

export default FilterOutWholesaler