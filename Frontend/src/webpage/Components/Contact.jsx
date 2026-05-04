import React from 'react'
import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import axiosInstance from "../../Components/Dashboard/Form/Utils/AxiosInstance"
const Contact = () => {

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: ""
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
  // console.log("  data form da ",formData)
};

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("SUBMIT WORKING ");
  try {
    const res = await axiosInstance.post("/registerroute/contactUs", formData);

    if (res.data.success) {
      alert("Message sent ");
      setFormData({ name: "", email: "", message: "" });
    }
  } catch (err) {
    console.log(err);
    alert("Error sending message ");
  }
};

  return (
    <>
      <section id="contact" className='py-20'>
        
        <div className='container mx-auto px-6'>
          
          {/* Heading */}
          <div className='text-center max-w-2xl mx-auto mb-14'>
            <h2 className='text-3xl md:text-4xl font-heading font-bold mb-4'>
              Contact Us
            </h2>
            <p className='text-muted-foreground'>
              Have questions? We'd love to hear from you.
            </p>
          </div>

          {/* Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              
              {/* Address */}
              <div className='flex items-center gap-4'>
                <div className='bg-emerald-600 rounded-xl p-3 shrink-0'>
                  <MapPin className='h-5 w-5 text-white' />
                </div>
                <div>
                  <h2 className='font-heading font-bold'>Address</h2>
                  <p className='text-sm text-muted-foreground'>
                    123 Pharmacy Lane, Mumbai, India 400001
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className='flex items-start gap-4'>
                <div className='bg-emerald-600 rounded-xl p-3 shrink-0'>
                  <Phone className='h-5 w-5 text-white' />
                </div>
                <div>
                  <h4 className='font-heading font-bold'>Phone</h4>
                  <p className='text-sm text-muted-foreground'>
                    +91 98765 43210
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className='flex items-start gap-4'>
                <div className='bg-emerald-600 rounded-xl p-3 shrink-0'>
                  <Mail className='h-5 w-5 text-white' />
                </div>
                <div>
                  <h4 className='font-heading font-bold'>Email</h4>
                  <p className='text-sm text-muted-foreground'>
                    contact@smartpharma.in
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className='rounded-2xl overflow-hidden border h-48'>
                <iframe
                  title="SmartPharma Location"
                  loading='lazy'
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995!3d19.08219865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai!5e0!3m2!1sen!2sin!4v1700000000000"
              className="w-full h-full border-0"                />
              </div>

            </motion.div>

            {/* RIGHT FORM */}
            <motion.form  
               onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              // onSubmit={(e) => e.preventDefault()}
              className='smart-card space-y-5 p-6 rounded-2xl shadow-sm'
            >
              
              <div>
                <label className='text-sm font-medium mb-1 block'>Name</label>
                <input
                name="name"
                    value={formData.name}
                  onChange={handleChange}
                  className='w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30'
                  placeholder='your name'
                />
              </div>

              <div>
                <label className='text-sm font-medium mb-1 block'>Email</label>
                <input
                   name="email"
                   value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className='w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30'
                  placeholder='your email'
                />
              </div>

              <div>
                <label className='text-sm font-medium mb-1 block'>Message</label>
                <textarea
                 name="message"
                value={formData.message}
                 onChange={handleChange}
                  rows={4}
                  className='w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30'
                  placeholder='How can we help?'
                />
              </div>

              {/* removed extra textarea (bug) */}

              <button
                type="submit"
                className='w-full bg-emerald-600 text- py-3 rounded-xl font-medium hover:opacity-90 transition'
              >
                Send Message
              </button>

            </motion.form>

          </div>
        </div>

      </section>
    </>
  )
}

export default Contact