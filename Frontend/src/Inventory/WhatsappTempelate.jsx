import React, { useState } from 'react'
import { FaVideo } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { FaStethoscope } from "react-icons/fa";
import { FaRegClipboard } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
// import { MdVerified } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import {  FaPlus,FaShoppingCart } from "react-icons/fa";
import { AiOutlineAppstore } from "react-icons/ai";



function WhatsappTempelate() {
    const [text, settext] = useState("");
    const [autoSend, setAutoSend] = useState(true);
    const [primaryRetail, setPrimaryRetail] = useState(false);
    const [interestedRetail, setInterestedRetail] = useState(false);
    return (
        <div className="flex flex-col min-h-screen">
            <div className="grid grid-cols-[1.3fr_2fr_1.3fr] flex-1">
                {/* leftbar */}
                <div className='flex flex-col gap-4 border px-6 py-4'>
                    <h1 className='text-xl font-bold'>Message Tempelate</h1>

                    <div className='flex flex-col gap-1.5'>
                        <span className='font-semibold text-gray-500'>Template Category</span>
                        <div className='px-2 py-1 border rounded-sm bg-gray-300'>
                            <p className='text-sm'>Stock Back in Inventory</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1.5'>
                        <div className='flex items-end justify-between'>
                            <span className='font-semibold text-gray-500'>Content Editor</span>
                            <div className='flex items-center gap-1'>
                                <FaPlus className="text-xl p-1 bg-green-500 rounded-full text-white" />
                                 <span className='text-green-500 font-base'>Add Variable</span>
                            </div>
                        </div>
                        <div className='rounded-sm bg-gray-300'>
                            <textarea value={text} onChange={(e) => {
                                settext(e.target.value)
                            }}
                                className="w-full border border-gray-300 p-2 rounded-md resize-y block"
                                placeholder="Enter Details Here"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='font-semibold text-gray-700'>Interactive Buttons</span>
                        <div className='px-2 py-2.5 border-dashed border border-green-500 rounded-sm  bg-gray-300'>
                        <div className='flex items-center gap-1.5'>
                            <FaShoppingCart className="text-lg text-gray-500 " />
                            <p className='text-md'>Add to Order</p>
                        </div>
                        </div>
                        <div className='px-2 py-2.5 mt-1 border-dashed border-green-500 border rounded-sm bg-gray-300'>
                        <div className='flex items-center gap-1.5'>
                            <AiOutlineAppstore className="text-2xl" />
                            <p className='text-sm'>View Catalog</p>
                        </div>
                        </div>
                        <div className='flex items-center justify-center px-2 py-2.5 mt-1 border-dashed border-2 border-green-500 rounded-sm bg-gray-300'>
                            <p className='text-sm'>Add Button</p>
                        </div>
                    </div>
                </div>
                {/* leftbar ends here */}

                {/* middlebar starts here */}
                <div className='flex flex-col pt-25 pb-15 items-center gap-5 justify-center border-t border border-b'>
                    <div className='flex gap-2 px-3 items-center  border bg-green-500 rounded-full'>
                        <FaCheckCircle className="text-base text-green-600 bg-white rounded-full" />
                        <span className='text-white-500 font-medium'>Verified tempelate Preview</span>
                    </div>

                    {/* phone tablet */}
                    <div className="w-full max-w-sm md:max-w-sm bg-white rounded-4xl  border-8 border-black-8 shadow-2xl overflow-hidden flex flex-col h-[80vh]">

                        {/* ================= HEADER ================= */}
                        <div className="flex items-center justify-between bg-green-600 text-white px-4 py-3">
                            <div className="flex items-center gap-3">
                                <IoArrowBack className="text-xl cursor-pointer" />

                                <div className="w-9 h-9 flex items-center justify-center bg-white rounded-full">
                                    <FaStethoscope className="text-green-600 text-lg" />
                                </div>

                                <div>
                                    <h1 className="text-sm font-semibold">
                                        SmartPharma Wholesaler
                                    </h1>
                                    <p className="text-xs text-green-100">Online</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <FaVideo className="text-lg cursor-pointer" />
                                <FaPhoneAlt className="text-lg cursor-pointer" />
                            </div>
                        </div>

                        {/* ================= CHAT AREA ================= */}
                        <div className="flex-1 bg-[#DFD3C5] p-4 flex-col flex justify-end overflow-y-auto">

                            {/* Receiving Message Bubble */}
                            <div className="bg-[#DCF8C6] p-4 rounded-2xl rounded-tl-none shadow-md max-w-xs">

                                <div className="flex items-center gap-2 mb-2">
                                    <FaRegClipboard className="text-green-600" />
                                    <p className="text-sm font-semibold">Stock Update</p>
                                </div>

                                <p className="text-sm">
                                    Great News <b>Pharma Retail!</b>
                                </p>

                                <p className="text-sm mt-1">
                                    The medicine <b>Amoxicillin 500mg</b> is now back in stock.
                                </p>

                                <p className="text-sm mt-1">
                                    Your previous request for 50 units can now be fulfilled.
                                </p>

                                <p className="text-sm mt-2 flex items-center">
                                    Click below to add it to your order
                                    <FaBoxOpen className="ml-2 text-yellow-600" />
                                </p>

                                {/* Button */}
                                <button className="mt-3 bg-white hover:bg-green-600 text-blue-500 w-full py-2 rounded-lg text-sm transition">
                                    Add To Order
                                </button>
                                <button className="mt-3 bg-white hover:bg-green-600 text-blue-500 w-full py-2 rounded-lg text-sm transition">
                                    View Catalog
                                </button>

                                {/* Time */}
                                <div className="text-right text-xs text-gray-400 mt-2">
                                    10:45 AM
                                </div>
                            </div>

                        </div>

                        {/* ================= FOOTER ================= */}
                        <div className="flex items-center gap-3 bg-white px-3 py-2 border-t">

                            <input
                                type="text"
                                placeholder="Type a message"
                                className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none text-sm"
                            />

                            <div className="w-10 h-10 flex items-center justify-center bg-green-500 rounded-full cursor-pointer">
                                <FaMicrophone className="text-white text-lg" />
                            </div>

                        </div>

                    </div>
                    {/* phone tablet ends here */}
                </div>
                {/* middlebar ends here */}

                {/* rightbar starts here */}
                <div className=' border px-8 pr-12 py-6'>
                    <h1 className='text-xl font-semibold' >
                        Trigger Settings
                    </h1>
                    <div className='py-8 mt-1 flex flex-col gap-3  border-b-gray-500 border-b'>
                        <div className='flex items-center justify-between'>
                            <p className='capitalize md:uppercase'>Auto-send rule </p>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={autoSend}
                                    onChange={() => setAutoSend(!autoSend)}
                                    className="peer sr-only"

                                />

                                <div className="w-4 h-4 flex items-center justify-center border-2 border-green-600 bg-white rounded-sm peer-checked:bg-white peer-checked:border-green-600">
                                    <svg
                                        className="w-3 h-3 text-green-600 hidden peer-checked:block"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </label>
                        </div>
                        <p>Send this tempelate automatically when stock becomes available </p>
                        <div className=' flex flex-col gap-2.5 px-3.5 py-5 bg-gray-300 rounded-xl '>
                            <p>Trigger Condition</p>
                            <p ><b className='tracking-wider' >Auto-send when stock 0</b> </p>
                        </div>
                    </div>
                    <div className='py-6 flex flex-col gap-3.5 border-b-gray-500 border-b'>
                        <p className='capitalize md:uppercase'>Recipients</p>

                        <div className='flex gap-2'>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={primaryRetail}
                                    onChange={() => setPrimaryRetail(!primaryRetail)}
                                    className="peer sr-only"
                                />

                                <div className="w-5 h-5 flex items-center justify-center border-2 border-green-600 rounded-sm">
                                    {primaryRetail && (
                                        <svg
                                            className="w-3 h-3 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </div>

                                <span>Primary Retail Contact</span>
                            </label>
                        </div>
                        <div className='flex gap-2 -mt-1'>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={interestedRetail}
                                    onChange={() => setInterestedRetail(!interestedRetail)}
                                    className="peer sr-only"
                                />

                                <div className="w-5 h-5 flex items-center justify-center border-2 border-green-600 rounded-sm">
                                    {interestedRetail && (
                                        <svg
                                            className="w-3 h-3 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </div>

                                <span>Intersted Retail Contact</span>
                            </label>
                        </div>
                    </div>
                    <div className='py-5 flex flex-col gap-3'>
                        <p className='capitalize md:uppercase text-sm'>approval workflow</p>
                        <div className='px4 py-3 flex items-center gap-3 border rounded-xl'>
                            {/* <MdVerified className="text-3xl text-green-600" /> */}
                            <FaShieldAlt className="text-2xl text-green-600 w-10 h-10 ml-5" />
                            <p>This Tempelate requires <b>Inventory Manager</b> approval before going out</p>
                        </div>
                    </div>
                </div>
                {/* rightbar ends here */}
            </div>
            <div className="w-full bg-gray-900 text-white py-1.5 px-10 flex justify-between items-center">
                <div className='flex gap-4'>
                    <p className='text-xs'>© 2026 SmartPharma Inventory System</p>
                    <p className='text-xs'>Monthly Tempelate Usage: 158/500</p>
                </div>
                <p className='text-xs' >Last Sync: Just now</p>

                
            </div>
        </div>


    )
}

export default WhatsappTempelate
