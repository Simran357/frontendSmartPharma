import React from 'react';
import {
  SquarePlus,
  Search,
  Bell,
  Settings,
  User, 
  Download,
  Zap,
  AlertCircle,
  AlertTriangle,
  Info,
  Banknote,
  Filter,
  CalendarX2,
  TrendingDown,
  ClipboardX,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Menu
} from 'lucide-react';

function ActionablePrevention() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 flex flex-col items-center">
      {/* Top Navigation */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white shadow-sm">
              <SquarePlus size={20} />
            </div>
            <span className="font-extrabold text-slate-900 text-xl tracking-tight">SmartPharm</span>
          </div>

          <div className="relative group lg:ml-8 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-9 pr-4 py-2 bg-slate-100 border border-transparent rounded-lg text-sm focus:outline-none focus:bg-white focus:border-green-300 focus:ring-4 focus:ring-green-500/10 w-64 lg:w-80 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-2">
            <a href="#" className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
              Dashboard
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
              Inventory
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
              Billing
            </a>
            <a href="#" className="px-4 py-2 text-sm font-bold text-green-500 border-b-2 border-green-500 -mb-14px pb-14px">
              Loss Prevention
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors bg-slate-100">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-slate-800 border-2 border-slate-100 rounded-full"></span>
            </button>
            <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors bg-slate-100">
              <Settings size={18} />
            </button>
            <button className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-400 border border-orange-200 ml-1">
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-6xl px-6 py-8 flex-1 flex flex-col gap-6">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Actionable Loss Prevention
            </h1>
            <p className="text-slate-500 font-medium">
              Identify and mitigate inventory risks across all departments.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-bold transition-all shadow-sm">
              <Download size={16} /> Export Report
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold transition-all shadow-sm shadow-green-500/20 active:scale-95">
              <Zap size={16} className="fill-current" /> Bulk Resolve
            </button>
          </div>
        </div>

        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Critical Issues */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-sm font-medium">Critical Issues</span>
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                <AlertCircle size={14} className="fill-current text-white" />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-1">12</h2>
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-500">
                <TrendingDown size={14} className="rotate-180" />
                <span>+2 from yesterday</span>
              </div>
            </div>
          </div>

          {/* Warning Issues */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-sm font-medium">Warning Issues</span>
              <div className="text-amber-500">
                <AlertTriangle size={20} className="fill-current text-white" />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-1">28</h2>
              <div className="text-xs font-medium text-slate-400">
                Within normal range
              </div>
            </div>
          </div>

          {/* Optimization Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-500 text-sm font-medium">Optimization Info</span>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <Info size={14} className="fill-current text-white font-bold" />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-1">45</h2>
              <div className="flex items-center gap-1.5 text-xs font-bold text-green-500">
                <TrendingDown size={14} />
                <span>-8 resolved</span>
              </div>
            </div>
          </div>

          {/* Projected Savings */}
          <div className="bg-green-100 rounded-xl border border-green-200 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-800 text-sm font-bold">Projected Savings</span>
              <div className="text-green-500">
                <Banknote size={20} className="fill-current text-green-100" />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="text-3xl font-extrabold text-green-500 mb-1">$4,280</h2>
              <div className="text-xs font-bold text-slate-600">
                Estimated ROI
              </div>
            </div>
          </div>

        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by medicine name, SKU, or department..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-green-300 focus:ring-4 focus:ring-green-500/10 transition-all font-medium placeholder:text-slate-400 shadow-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-bold transition-all shadow-sm">
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* List Section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          
          {/* Tabs */}
          <div className="flex gap-8 px-6 pt-4 border-b border-slate-200 bg-white">
            <button className="flex items-center gap-2 pb-3 border-b-2 border-red-500 text-red-600 font-bold text-sm">
              Critical
              <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-md text-[10px]">&nbsp;12&nbsp;</span>
            </button>
            <button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors">
              Warning
              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px]">28</span>
            </button>
            <button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors">
              Info
              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px]">45</span>
            </button>
          </div>

          {/* List Items */}
          <div className="flex flex-col divide-y divide-slate-100">
            
            {/* Item 1 */}
            <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-4 flex-1">
                <div className="pt-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-green-500 focus:ring-green-500 cursor-pointer" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink mt-0.5">
                  <CalendarX2 size={20} />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-bold text-slate-900">Amoxicillin 500mg Capsules</h3>
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-extrabold uppercase tracking-wider rounded">EXPIRING SOON</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-slate-500"><span className="font-bold text-slate-700">SKU:</span> AMX-500-102</span>
                    <span className="text-slate-500"><span className="font-bold text-slate-700">Stock:</span> 42 units</span>
                    <span className="text-slate-500"><span className="font-bold text-slate-700">Value:</span> $1,240.00</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mt-1">
                    Batch #B204 expires in 4 days. High risk of total loss if not dispensed or returned to supplier immediately.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-row lg:flex-col gap-3 min-w-200px pl-12 lg:pl-0">
                <button className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-all shadow-sm">
                  Apply 20% Discount
                </button>
                <button className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-all border border-slate-200">
                  Initiate Return
                </button>
              </div>
            </div>

            {/* Item 2 */}
            <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-4 flex-1">
                <div className="pt-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-green-500 focus:ring-green-500 cursor-pointer" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink mt-0.5">
                  <TrendingDown size={20} />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-bold text-slate-900">Atorvastatin 20mg Tabs</h3>
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-extrabold uppercase tracking-wider rounded">NEGATIVE MARGIN</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-slate-500"><span className="font-bold text-slate-700">SKU:</span> ATR-020-998</span>
                    <span className="text-slate-500"><span className="font-bold text-slate-700">Stock:</span> 500 units</span>
                    <span className="text-slate-500"><span className="font-bold text-slate-700">Margin:</span> <span className="text-red-500 font-bold">-4.2%</span></span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mt-1">
                    Current selling price is lower than the updated replacement cost from primary supplier.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-row lg:flex-col gap-3 min-w-200px pl-12 lg:pl-0">
                <button className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold transition-all shadow-sm">
                  Adjust Selling Price
                </button>
                <button className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-all border border-slate-200">
                  View Alternatives
                </button>
              </div>
            </div>

            {/* Item 3 */}
            <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-4 flex-1">
                <div className="pt-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-green-500 focus:ring-green-500 cursor-pointer" />
                </div>
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink mt-0.5">
                  <ClipboardX size={20} />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-bold text-slate-900">Lisinopril 10mg Tablets</h3>
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-extrabold uppercase tracking-wider rounded">OVERSTOCK RISK</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-slate-500"><span className="font-bold text-slate-700">SKU:</span> LSN-010-442</span>
                    <span className="text-slate-500"><span className="font-bold text-slate-700">Stock:</span> 1,200 units</span>
                    <span className="text-slate-500"><span className="font-bold text-slate-700">Days Supply:</span> 180+ Days</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mt-1">
                    Inventory levels significantly exceed forecasted demand for the next 6 months. High capital tie-up.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-row lg:flex-col gap-3 min-w-200px pl-12 lg:pl-0">
                <button className="flex-1 py-2 px-4 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-sm font-bold transition-all shadow-sm">
                  Mark as Do Not Reorder
                </button>
                <button className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-all border border-slate-200">
                  Internal Transfer
                </button>
              </div>
            </div>

            {/* Item 4 - Resolved */}
            <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-6 bg-slate-50/30 opacity-70 transition-colors">
              <div className="flex items-start gap-4 flex-1">
                <div className="pt-2">
                  <CheckCircle2 size={18} className="text-green-500 fill-green-100" />
                </div>
                <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 shrink mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="14" x="3" y="5" rx="2"/><path d="M7 15h4M15 15h2M7 11h2M15 11h2"/></svg>
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-bold text-slate-400 line-through decoration-slate-300">Metformin 850mg</h3>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider rounded">RESOLVED</span>
                  </div>
                  <p className="text-sm font-medium text-slate-400 mt-1">
                    Discount applied and inventory adjusted by Admin 2 hours ago.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-start lg:justify-end min-w-200px pl-12 lg:pl-0">
                <a href="#" className="text-sm font-medium text-slate-400 hover:text-slate-600 underline decoration-1 underline-offset-4">
                  View History
                </a>
              </div>
            </div>

          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Showing 1 to 12 of 12 critical alerts</span>
            <div className="flex items-center gap-1.5">
              <button className="p-1 text-slate-400 hover:text-slate-800 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold bg-green-500 text-white cursor-pointer">
                1
              </button>
              <button className="p-1 text-slate-400 hover:text-slate-800 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full mt-auto py-8 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <ShieldCheck size={16} className="text-green-500" /> Data updated real-time: Today, 10:42 AM
        </div>
        <div className="text-[11px] font-medium text-slate-400">
          © 2024 SmartPharm Inventory Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default ActionablePrevention;
