import React, { useState } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RetailerSpecification = () => {
  const navigate = useNavigate();

  // Medicine state
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      salt: "Acetaminophen",
      qty: 24,
      price: 3550,
    },
    {
      id: 2,
      name: "Amoxicillin CV 625",
      salt: "Amoxicillin + Clavulanic Acid",
      qty: 24,
      price: 3550,
    },
  ]);

  // Handle quantity change
  const handleQtyChange = (id, newQty) => {
    if (newQty > 0) {
      setMedicines(medicines.map(med => 
        med.id === id ? { ...med, qty: newQty } : med
      ));
    }
  };

  // Handle medicine deletion
  const handleDelete = (id) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  // Handle add new medicine
  const handleAddMedicine = () => {
    const newId = Math.max(...medicines.map(m => m.id), 0) + 1;
    setMedicines([...medicines, {
      id: newId,
      name: "New Medicine",
      salt: "Generic",
      qty: 1,
      price: 0,
    }]);
  };

  return (
    <>
      <div className='m-2 w-full'>
        {/* Header Section */}
        <div className="bg-white border shadow border-slate-200 p-4 md:p-6 rounded-xl m-2">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between flex-wrap">
            
            {/* Title */}
            <div className="min-w-200px">
              <h1 className="text-lg md:text-xl font-semibold text-slate-700">
                Requirement Builder
              </h1>
              <p className="text-xs md:text-sm text-gray-500">
                Add medicines to find the best wholesaler deals
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <button className="bg-slate-100 hover:bg-slate-200 transition rounded-lg text-xs md:text-sm flex items-center gap-2 font-medium px-3 py-2 text-black">
                <HistoryIcon fontSize="small" />
                Repeat Last Order
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 transition rounded-lg flex items-center gap-2 font-medium px-3 py-2 text-xs md:text-sm text-black">
                <HistoryIcon fontSize="small" />
                Upload Past Bill
              </button>
            </div>

            {/* Search */}
            <div className="w-full xl:max-w-md">
              <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                <SearchIcon className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search medicines (e.g. Paracetamol, Amoxicillin)..."
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="bg-green-50 rounded-full px-3 py-1 border border-green-300 font-medium text-xs text-green-600 md:text-sm">
                Generic vs Branded
              </div>
              <div className="bg-gray-50 px-3 py-1 border rounded-full border-gray-300 text-xs font-medium text-gray-600 md:text-sm">
                High-Margin
              </div>
              <div className="bg-gray-50 px-3 py-1 border rounded-full border-gray-300 text-xs font-medium text-gray-600 md:text-sm">
                Form : Tablet
              </div>
              <div className="bg-gray-50 px-3 py-1 border rounded-full border-gray-300 text-xs font-medium text-gray-600 md:text-sm">
                Form : Syrup
              </div>
            </div>
          </div>
        </div>

        {/* Currently Added Section */}
        <div className='flex items-center justify-between px-2 m-4'>
          <h1 className='text-sm font-bold uppercase tracking-wider text-slate-500'>
            CURRENTLY ADDED ({medicines.length} ITEMS)
          </h1>
          <button 
            onClick={() => setMedicines([])}
            className='text-sm font-bold text-red-500 hover:underline'
          >
            Clear All
          </button>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          
          {/* Left Section - Medicines */}
          <div className='p-2'>
            <div className='p-2 m-2 bg-white border shadow border-slate-200 rounded-lg'>
              
              {/* Medicine Cards */}
              {medicines.map((med) => (
                <div key={med.id} className="p-4 m-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                  
                  <div className='flex justify-between'>
                    <div>
                      <h4 className="font-extrabold text-lg">{med.name}</h4>
                      <p className="text-xs text-slate-500">{med.salt}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(med.id)}
                      className='text-slate-300 hover:text-red-500 transition-colors'
                    >
                      ✕
                    </button>
                  </div>

                  <div className='mt-2'>
                    <p className="text-sm font-semibold">Qty: {med.qty}</p>
                    <p className="text-sm font-semibold">Est: ₹{med.price}</p>
                  </div>

                  {/* Quantity + Dosage */}
                  <div className='flex gap-4 mt-3'>
                    <div className='flex-1'>
                      <p className='text-[10px] font-bold text-slate-400 uppercase'>Quantity</p>
                      <div className='flex items-center justify-center bg-slate-50 rounded-lg px-2 py-1 border border-slate-100'>
                        <button 
                          onClick={() => handleQtyChange(med.id, med.qty - 1)}
                          className='size-6 flex items-center justify-center hover:bg-slate-200 rounded transition-colors'
                        >
                          −
                        </button>
                        <input 
                          value={med.qty} 
                          readOnly 
                          className='w-10 text-center bg-transparent border-none font-bold text-sm'
                        />
                        <button 
                          onClick={() => handleQtyChange(med.id, med.qty + 1)}
                          className='size-6 flex items-center justify-center hover:bg-slate-200 rounded transition-colors'
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className='flex-1'>
                      <p className='text-[10px] font-bold text-slate-400 uppercase mb-1'>Dosage</p>
                      <select className='w-full bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold px-2 py-1 focus:ring-0'>
                        <option>500mg</option>
                        <option>650mg</option>
                      </select>
                    </div>
                  </div>

                  <div className='flex justify-between mt-3'>
                    <span className='text-green-600 px-2 py-0.5 text-[10px] bg-green-100 font-bold rounded'>
                      40% Margin
                    </span>
                    <span className='text-[10px] font-bold text-slate-700'>
                      Est. ₹{med.price}
                    </span>
                  </div>
                </div>
              ))}

              {/* Add New Medicine Button */}
              <button 
                onClick={handleAddMedicine}
                className='w-full border border-dashed bg-white border-slate-300 text-sm flex flex-col align-center items-center justify-center font-semibold text-slate-400 text-center h-32 p-4 rounded-lg hover:border-slate-400 transition-colors'
              >
                <PlusCircle className='mb-2' size={24} />
                <p>Add Another Medicine</p>
              </button>
            </div>

            {/* Frequently Ordered */}
            <div className='m-2 p-4 bg-white border border-slate-200 rounded-lg'>
              <p className='uppercase text-slate-400 mb-4 text-xs font-semibold'>
                Frequently Ordered
              </p>
              <div className='flex gap-2 whitespace-nowrap flex-wrap'>
                
                {['Telmisartan 40mg', 'Metformin 500mg', 'Cetrizine 10mg'].map((medicine, idx) => (
                  <div key={idx} className='bg-white border p-4 flex flex-col gap-2 border-slate-100 rounded-xl flex-1'>
                    <span className='bg-slate-50 rounded-lg px-2 text-center py-2 w-12'>
                      {medicine.substring(0, 2).toUpperCase()}
                    </span>
                    <p className='text-sm font-bold tracking-wider text-slate-700'>{medicine}</p>
                    <p className='text-[10px] text-slate-400'>
                      {idx === 0 ? 'Cardiology' : idx === 1 ? 'Diabetes' : 'Antihistamine'}
                    </p>
                    <button className='bg-slate-200 rounded-lg px-2 py-2 font-bold text-xs text-slate-600 hover:bg-slate-300 transition-colors'>
                      Add
                    </button>
                  </div>
                ))}
                
              </div>
            </div>
          </div>

          {/* Right Section - Margin Impact */}
          <div className='p-2 flex-1'>
            
            {/* Margin Impact Card */}
            <div className='rounded-xl bg-white border border-slate-200 shadow-xl p-4 mt-4'>
              <div className='flex gap-2 items-center mb-4'>
                <span className='bg-green-400 rounded px-2 py-1 text-white font-bold'>📊</span>
                <h2 className='font-bold text-black text-lg tracking-wide'>Margin Impact</h2>
              </div>

              <div className='mt-4'>
                <p className='text-slate-600 font-bold tracking-wider uppercase text-sm'>
                  Potential Net Profit
                </p>
                <div className='flex gap-2 items-end mt-2'>
                  <h1 className='text-3xl font-semibold font-mono text-green-500'>₹3,420</h1>
                  <p className='text-xs font-semibold text-green-600'>+12% vs last order</p>
                </div>

                <div className='mt-4 space-y-2'>
                  <div className='flex justify-between'>
                    <p className='text-slate-600 text-sm'>Total Est. Cost</p>
                    <p className='text-slate-600 text-sm'>₹8,490</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-slate-600 text-sm'>Est. Retail Value</p>
                    <p className='text-slate-600 text-sm'>₹11,910</p>
                  </div>
                  
                  <div className='border-t border-slate-200 w-full mt-2 pt-2'></div>
                  
                  <div className='flex justify-between'>
                    <p className='text-slate-600 text-sm'>Net Profit</p>
                    <p className='text-sm text-green-600 font-bold'>₹3,420</p>
                  </div>

                  <div className='mt-4'>
                    <div className='flex justify-between mt-2'>
                      <p className='text-slate-600 text-sm font-bold'>Profit Margin %</p>
                      <p className='text-sm text-green-600 font-bold'>28.7%</p>
                    </div>
                    <div className='w-full bg-slate-300 rounded-full h-2 mt-2'>
                      <div className='bg-green-500 w-3/5 h-2 rounded-full'></div>
                    </div>
                    <p className='text-slate-400 text-xs text-center mt-2'>
                      Optimized for maximum retailer margin
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimization Tips */}
            <div className='bg-white mt-4 border border-slate-200 shadow rounded-lg p-6'>
              <h2 className='font-semibold text-sm tracking-wide mb-3'>Optimization Tips</h2>
              
              <div className='flex gap-2 mb-3'>
                <span className='w-2 h-2 bg-green-400 rounded-full shrink mt-1'></span>
                <p className='text-sm text-slate-600'>
                  Switch <b>Paracetamol</b> to generic can increase margin by <b>15%</b>
                </p>
              </div>

              <div className='flex gap-2'>
                <span className='w-2 h-2 bg-green-400 rounded-full shrink mt-1'></span>
                <p className='text-sm text-slate-600'>
                  Add 5 more packs of <b>Amoxicillin</b> to trigger wholesale bulk discount
                </p>
              </div>
            </div>

            {/* Find Wholesalers Button */}
            <button 
              onClick={() => navigate("/FilterOutWholesaler")}
              className='bg-green-500 hover:bg-green-600 rounded-lg px-4 w-full py-4 mt-4 font-bold text-md text-white transition-colors'
            >
              Find Best Wholesalers
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RetailerSpecification;