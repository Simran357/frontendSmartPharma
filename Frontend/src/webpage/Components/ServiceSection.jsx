import React from 'react'
import { Pill, Truck, FileText, BarChart } from "lucide-react"
import { motion } from "framer-motion"
const ServiceSection = () => {

  const services = [
    { icon: Pill, title: "Medicine Availability", desc: "Check real-time stock across pharmacies near you." },
    { icon: Truck, title: "Fast Delivery", desc: "Get your medications delivered to your doorstep in no time." },
    { icon: FileText, title: "Digital Billing", desc: "OCR-powered digital bills-papperless and error-free." },
    { icon: BarChart, title: "Inventory Management", desc: "Full stock tracking with expiry and reorder insights." },
  ]
  return (
    <>
      <section className='py-20'>
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground">Everything a smart pharmacy needs, in one platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  p-5 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="smart-card text-center group cursor-pointer"
              >
                <div className='bg-white border border-slate-200 shadow-sm p-4 rounded-2xl  '>
                  <div className="inline-flex bg-linear-to-br from-emerald-400 to-teal-500    shadow-sm    rounded-2xl p-4 mb-4 group-hover:scale-110 transition-transform">
                    <s.icon className="h-10 w-10   text-white " />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </div>


              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
export default ServiceSection