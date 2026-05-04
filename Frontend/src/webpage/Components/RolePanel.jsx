import React from 'react'
import adminImg from '../assets/admin.jpg'
import retailerImg from '../assets/retailer.jpg'
import wholesalerImg from '../assets/wholesaler.jpg'
import { motion } from "framer-motion";
const RolePanel = () => {
  const panels = [
  {
    title: "Admin Dashboard",
    desc: "Analytics, risk scoring, expiry alerts & system-wide reports.",
    img: adminImg,
  },
  {
    title: "Retailer Panel",
    desc: "Smart billing with FEFO auto-selection & real-time stock.",
    img: retailerImg,
  },
  {
    title: "Wholesaler Panel",
    desc: "Stock supply tracking, purchase orders & distribution insights.",
    img: wholesalerImg,
  },
];
  return (
    <>
    <section className='p-8'>
      <div className='container'>
        <div className='text-center max-w-2xl mx-auto mb-14'>
          <h2 className='text-3xl md:text-4xl font-heading font-bold mb-4'>Role-based Access</h2>
          <p className='text-muted-foreground'>Tailored dashboards for Admins, Retailers and Wholesalers.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {panels.map((p,i)=>(
          <motion.div className='smart-card overflow-hidden group'
          key={p.title}
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{delay:i*0.15}}

          >
            <div className='bg-white rounded-xl border borrder-border  overflow-hidden mb-4'>
              <img 
              src={p.img}
              alt={p.title}
              className='object-cover group-hover:scale-105 w-full h-44 transition-transform duration-500'
              />
            </div>
            <h3 className='font-heading font-bold text-lg mb-2'>{p.title}</h3>
            <p className='text-muted-foreground text-sm'>{p.desc}</p>
          </motion.div>
        ))}</div>
         </div>
    </section>
    </>
  )
}

export default RolePanel