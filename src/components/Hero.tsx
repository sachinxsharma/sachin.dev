"use client";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import dynamic from "next/dynamic";

const ThreeDScene = dynamic(() => import("./ThreeDScene"), { ssr: false });

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <ThreeDScene />
      
      <div className="z-10 text-center px-4 max-w-4xl mx-auto mt-20 md:mt-0">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple pb-2">
            Sachin Sharma
          </span>
        </motion.h1>
        
        <motion.div 
          className="text-2xl md:text-4xl font-semibold mb-8 h-[60px] md:h-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span>Hey there 👋 I&apos;m a </span>
          <span className="text-neon-blue inline-block">
            <Typewriter
              words={['DevOps Enthusiast', 'Cloud Architect', 'Tech Explorer']}
              loop={true}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </motion.div>

        <motion.p 
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Building scalable, futuristic infrastructure and bridging the gap between development and operations.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <a href="#projects" className="px-8 py-4 bg-neon-blue text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all">
            View Projects
          </a>
          <a href="#contact" className="px-8 py-4 border border-white/20 hover:border-neon-purple rounded-full hover:bg-neon-purple/10 transition-all glass">
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
