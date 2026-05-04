import React from 'react'
import heroImg from '../assets/hero-pharmacy.jpg';
import { ScanLine, Timer, BellRing } from "lucide-react";
const HeroSection = () => {

    const badges = [
        { icon: ScanLine, label: "OCR Billing" },
        { icon: Timer, label: "FEFO System" },
        { icon: BellRing, label: "Expiry Alerts" },
    ];

    return (
        <>
            <section className='relative min-h-[90vh] flex items-center overflow-hidden'>
                <img src={heroImg} alt="Smart Pharmacy" className=' absolute inset-0 w-full h-full object-cover' />
                <div className="absolute inset-0   bg-linear-to-br from-emerald-800/80 to-teal-900/80 " />
                <div className='container  ml-5 relative z-10 py-20'>
                    <div className="max-w-2xl space-y-6 animate-fade-up">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white/90 leading-tight">
                            Your Trusted Smart Pharmacy System
                        </h1>
                        <p className="text-lg md:text-xl text-white/90">
                            Smart Billing, Inventory Control & Expiry Loss Prevention
                        </p>
                    </div>

                    <div className='flex mt-3 flex-wrap gap-3'>
                        <button className="bg-white text-emerald-600 font-bold px-6 py-3 rounded-xl hover:bg-white/90">
                            Order Medicines
                        </button>
                        <button className="border-2 border-white text-white px-6 py-3 rounded-xl hover:bg-white/20">
                            Contact Us
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {badges.map((b) => (
                            <span
                                key={b.label}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/25 backdrop-blur text-white text-sm font-medium"
                            >
                                <b.icon className="h-4 w-4" /> {b.label}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
export default HeroSection 