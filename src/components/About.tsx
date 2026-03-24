"use client";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            About <span className="text-neon-blue">Me</span>
          </h2>
          
          <div className="glass p-8 md:p-12 rounded-3xl text-left">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Hello! I&apos;m <strong className="text-white">Sachin Sharma</strong>, a passionate DevOps enthusiast 
              dedicated to building robust, scalable, and automated infrastructure. My journey started 
              with a fascination for how code is deployed and scaled to serve millions of users.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              I specialize in bridging the gap between development and operations through Continuous Integration, 
              Continuous Deployment, and Cloud-Native technologies. My career goal is to architect resilient 
              systems that are 5 years ahead of their time, utilizing the best of open-source and cloud platforms.
            </p>
            
            <div className="flex justify-center flex-wrap gap-4">
              <a 
                href="/sachin_28_02_2026.pdf" 
                download="sachin_28_02_2026.pdf"
                className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-neon-blue hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all group"
              >
                <Download className="group-hover:-translate-y-1 transition-transform" />
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
