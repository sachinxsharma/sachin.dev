"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    subject: "",
    body: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.body) return;

    setStatus("loading");
    
    // Simulating API call - In a real scenario, you'd fetch to /api/contact or Formspree
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // console.log("Form submitted:", formData);
      setStatus("success");
      setFormData({ subject: "", body: "" });
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 relative z-10 bg-black/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s <span className="text-neon-purple">Connect</span>
          </h2>
          <p className="text-gray-400">Ready to build the future of infrastructure together?</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Socials & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className="glass p-8 rounded-2xl h-full">
              <h3 className="text-2xl font-bold mb-6">Drop a message</h3>
              <p className="text-gray-400 mb-8">
                Whether you have a question, a project opportunity, or just want to say hi, my inbox is always open!
              </p>

              <div className="flex items-center gap-4 text-neon-blue mb-8">
                <Mail />
                <span>sachin72tech@gmail.com</span>
              </div>

              <div className="flex gap-4">
                <a href="https://github.com/sachinxsharma" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-neon-blue hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all">
                  <Github />
                </a>
                <a href="https://www.linkedin.com/in/sachin-sharma-145546254/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-neon-blue hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all">
                  <Linkedin />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-neon-blue hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all">
                  <Twitter />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-[1.5]"
          >
            <form className="glass p-8 rounded-2xl flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm text-gray-400">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all" 
                  placeholder="Project Opportunity" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="body" className="text-sm text-gray-400">Message</label>
                <textarea 
                  id="body" 
                  name="body" 
                  rows={5} 
                  value={formData.body}
                  onChange={(e) => setFormData({...formData, body: e.target.value})}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all" 
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status !== "idle"}
                className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 mt-2 ${
                  status === "success" ? "bg-green-500/20 text-green-400 border border-green-500/50" : 
                  status === "error" ? "bg-red-500/20 text-red-400 border border-red-500/50" : 
                  "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:opacity-90"
                }`}
              >
                {status === "idle" && <><Send size={18} /> Send Message</>}
                {status === "loading" && <><Loader2 size={18} className="animate-spin" /> Sending...</>}
                {status === "success" && <><CheckCircle2 size={18} /> Message Sent!</>}
                {status === "error" && <><AlertCircle size={18} /> Failed to send</>}
              </button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-sm text-green-400"
                  >
                    Thanks! I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
