import { ScanLine, Timer, BellRing, PackageSearch, Workflow } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    { icon: ScanLine, title: "OCR-Based Bill Upload", desc: "No manual entry — just scan and upload bills instantly." },
    { icon: Timer, title: "FEFO Smart Billing", desc: "Auto-selects the nearest expiry batch for every sale." },
    { icon: BellRing, title: "Expiry Risk Alerts", desc: "Get notified before medicines expire — prevent loss." },
    { icon: PackageSearch, title: "Overstock Detection", desc: "Smart reorder decisions to avoid dead inventory." },
    { icon: Workflow, title: "Real Pharmacy Workflow", desc: "Works without complex setup — built for real shops." },
];

const WhySmartPharm = () => (
    <section className="py-20 gradient-card-bg">
        <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                    Why <span className="text-teal-500">SmartPharm</span> Is Different
                </h2>
                <p className="text-slate-600 text-lg">
                    Not just a medicine store — a decision-support system for pharmacies.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5 gap-6">
                {features.map((f, i) => (
                    <motion.div
                        key={f.title}   
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="smart-card flex flex-col items-start gap-4 group"
                    >
                        <div className=  'w-full   bg-white border border-slate-200 shadow-sm p-8 rounded-2xl mx-auto '>
                            <div className=" inline-flex  mb-5  bg-linear-to-br from-emerald-400 to-teal-500 rounded-xl p-3 group-hover:scale-110 transition-transform">
                                <f.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-heading font-bold mb-2 text-lg">{f.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                        </div>

                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default WhySmartPharm;
