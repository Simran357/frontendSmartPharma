import React from 'react'
import {motion} from "framer-motion"
import about from "../assets/about.jpg"
import { CheckCircle2 } from "lucide-react";
const AboutSection = () => {
    const points = [
  "Reduces expiry loss with FEFO-based smart billing",
  "Prevents overstocking with intelligent reorder alerts",
  "OCR automation for paperless, error-free billing",
  "Decision-support system for real Indian pharmacies",
];

  return (
 <>
 <section className='p-20 gradient-card-bg'>
<div className='container'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center '>
        <motion.div className="rounded-3xl overflow-hidden "
        initial={{opacity:0,x:-30}}
        whileInView={{opacity:1,x:0}}
        viewport={{once:true}}
        >
            <img 
            src={about}
            alt="About SmartPharm"
            className='w-full h-full object-cover rounded-3xl'
            />
        </motion.div>
        <motion.div className='space-y-6'
        initial={{opacity:0,x:30}}
        whileInView={{opacity:1,x:0}}
        viewport={{once:true}}
        >
            <h2 className='text-3xl md:text-4xl font-heading font-bold'>
                About <span className='gradient-text'>SmartPharm </span>
            </h2>
            <p className='text-muted-foreground leading-relaxed'>SmartPharm is a decision-support pharmacy system that reduces expiry loss,
            prevents overstocking, and automates billing using FEFO and OCR technology.
            Designed for real Indian pharmacy workflows.</p>
            <ul className="space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
    </div>
</div>

 </section>
 </>
  )
}

export default AboutSection