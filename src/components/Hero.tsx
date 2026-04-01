"use client";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ThreeDScene = dynamic(() => import("./ThreeDScene"), { ssr: false });

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-transparent">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-blue/10 rounded-full blur-[120px] dark:bg-neon-blue/20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px] dark:bg-neon-purple/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-neon-blue font-mono mb-4 text-lg">Hey there 👋 I&apos;m a DevOp_</h2>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter text-slate-900 dark:text-white">
            Sachin <span className="text-neon-purple drop-shadow-[0_0_15px_rgba(255,0,255,0.3)]">Sharma</span>
          </h1>
          
          <div className="text-xl md:text-3xl text-slate-600 dark:text-gray-400 mb-10 h-12 flex justify-center items-center font-medium">
            <span className="mr-2">Expert in</span>
            <span className="text-neon-blue">
              <Typewriter
                words={['Cloud Architecture', 'SRE Practices', 'CI/CD Pipelines', 'Kubernetes Mastery', 'Automation Tools']}
                loop={0}
                cursor
                cursorStyle='_'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link 
              href="#projects"
              className="px-8 py-4 bg-neon-blue text-white dark:text-black font-bold rounded-full hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all flex items-center gap-2 group"
            >
              View Projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#contact"
              className="px-8 py-4 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-medium rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-slate-400 dark:text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-slate-300 dark:border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-neon-blue rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
