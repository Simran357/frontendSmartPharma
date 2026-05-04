import React from 'react'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ReportIcon from '@mui/icons-material/Report';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
const AiAgent = () => {
  return (
    <div className="bg-gray-50  text-800">
      {/* <!-- BEGIN: MainHeader --> */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-2xl font-bold">AI Agent</h1>
      </header>

      <main className="max-w-5xl mx-auto  flex flex-col pt-8 pb-32 px-4 space-y-8 overflow-y-auto">
        {/* <!-- BEGIN: AI Welcome Message --> */}
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 p-5 rounded bg-blue-100  flex items-center justify-center ">
            <TipsAndUpdatesIcon className="h-4 w-4 text-blue-600" />
          </div>

          <div className='max-w-3xl  bg-white p-4 border border-slate-200 rounded-lg shadow-sm '>
            Hello. I've processed the latest sales velocity and pending retailer requests. Your current inventory is
            92% optimized, but I've identified 3 urgent actions.
          </div>
        </div>
        {/* <!-- BEGIN: Stock Predictor Alert --> */}
        <div className="flex items-start gap-4">
          <div className='w-8 h-8 p-5 rounded bg-orange-100  flex items-center justify-center '>
            <ReportIcon className="h-4 w-4 text-orange-600" />
          </div>
          <div className=' p-6 overflow-hidden w-full max-w-3xl  bg-white border border-slate-200 rounded shadow-sm '>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">AI Stock Predictor Alert</h3>
                <p className="text-slate-500 text-sm">Based on 48 pending retailer orders</p>
              </div>
              <span
                className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Action
                Required</span>
            </div>
            {/* <!-- Alert Table --> */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm" >
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100">
                    <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Medicine Name</th>
                    <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Salt</th>
                    <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Stock</th>
                    <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Required</th>
                    <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Shortfall</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-50 last:border-0">
                    <td className="py-4 font-semibold">Amoxicillin 500mg</td>
                    <td className="py-4">Amoxicillin</td>
                    <td className="py-4">1,200</td>
                    <td className="py-4">4,500</td>
                    <td className="py-4 font-bold text-slate-900">-3,300</td>
                  </tr>
                  <tr className="border-b border-slate-50 last:border-0">
                    <td className="py-4 font-semibold">Amoxicillin 500mg</td>
                    <td className="py-4">Amoxicillin</td>
                    <td className="py-4">1,200</td>
                    <td className="py-4">4,500</td>
                    <td className="py-4 font-bold text-slate-900">-3,300</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='mt-6 flex gap-3'>
              <button className='flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm'>
                Generate PO for Shortfalls
              </button>
              <button
                className="px-6 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                Adjust Forecast
              </button>
            </div>
          </div>
        </div>
        {/* <!-- BEGIN: User Response --> */}
        <div className="flex items-start gap-4 justify-end">
          <div className="bg-blue-600 rounded-2xl p-4 text-white max-w-2xl shadow-md">
            What's the status of the Apollo Pharmacy shipment? Also, scan this invoice.
          </div>
        </div>
        {/* <!-- BEGIN: AI Status Update --> */}
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 p-5 rounded bg-blue-100  flex items-center justify-center ">
            <TipsAndUpdatesIcon className="h-4 w-4 text-blue-600" />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 max-w-3xl space-y-3">
            <p className="text-slate-700">
              Shipment <span className="font-bold">#SHIP-9921</span> for Apollo Pharmacy is currently in the "Quality
              Check" phase. Estimated dispatch is tomorrow at 10:00 AM.
            </p>
            <p className="text-slate-500 italic">
              I'm ready for the invoice. You can drag and drop it here for OCR processing.
            </p>
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-3xl border-2 border-dashed border-blue-200 p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
            <MenuBookIcon className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">OCR Bill Upload</h4>
            <p className="text-sm text-slate-500">Supported formats: PDF, JPG, PNG up to 10MB</p>
          </div>
          <button
            className="bg-white text-blue-600 border border-blue-200 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors text-sm shadow-sm">
            Select Invoice
          </button>
          {/* <!-- Quick Action Pills --> */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all">
              <InventoryIcon />
              Full Inventory Report
            </button>
            <button
              className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all">
              <AccessTimeIcon />
              Recent Invoices
            </button>
            <button
              className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:border-red-400 hover:text-red-600 transition-all">
              <WarningAmberIcon />
              Expiry Alert (Next 30 Days)
            </button>
          </div>
        </div>
      </main>
      {/* <!-- BEGIN: ChatInput --> */}
      <footer className="fixed bg-cyan-50 bottom-0 left-0 right-0 p-6 glass-effect border-t border-slate-200">
        <div className="max-w-4xl mx-auto relative group">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors">
              <WhatsAppIcon className="h-5 w-5" />
            </button>
            <input className='flex-1  border-0 outline-none focus:ring-0 text-slate-700 placeholder:text-slate-400'
              placeholder="Ask about inventory, stock predictions, or upload bills..." type="text" />
             <div className="flex items-center gap-1 border-l border-slate-100 pl-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors">
                          <AttachFileIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors">
                         <MicIcon className="h-5 w-5" />
                    </button>
                    <button className="ml-2 bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 shadow-md transition-all active:scale-95">
                        <ArrowUpwardIcon className="h-5 w-5" />
                    </button>
             </div>
          </div> 
        </div>
      </footer>
    </div>
  )
}
export default AiAgent 