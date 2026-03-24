"use client";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

const educationData = [
  {
    year: "2024 - 2026",
    degree: "Postgraduation",
    institution: "SIES College of Arts, Science and Commerce, Sion",
    description: "Specialized in advanced computing, cloud infrastructure, and enterprise deployment strategies.",
  },
  {
    year: "2022 - 2024",
    degree: "Undergraduation",
    institution: "Somaiya Vidyavihar University",
    description: "Bachelor's degree in Information Technology. Built a strong foundation in software engineering and CI/CD pipelines.",
  },
  {
    year: "2020 - 2021",
    degree: "12th Grade / Higher Secondary",
    institution: "SIES College of Arts, Science and Commerce, Sion",
    description: "Focused on Mathematics, Physics, and Computer Science.",
  },
  {
    year: "2018 -2019",
    degree: "10th Grade / Secondary School",
    institution: "CVN High School, Chembur",
    description: "General Science and foundational studies.",
  }
];

export default function Education() {
  return (
    <section id="education" className="py-20 relative z-10 bg-black/20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-neon-purple">Education</span>
          </h2>
          <p className="text-gray-400">The academic journey that shaped my expertise.</p>
        </motion.div>

        <div className="relative border-l-2 border-neon-purple ml-4 md:ml-0">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="mb-10 ml-8 relative"
            >
              <span className="absolute -left-11 flex items-center justify-center w-6 h-6 rounded-full bg-black border-2 border-neon-purple mt-1 shadow-[0_0_10px_rgba(255,0,255,0.6)]">
                <div className="w-2 h-2 rounded-full bg-neon-purple" />
              </span>

              <div className="glass p-6 rounded-2xl hover:border-neon-purple transition-colors relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:text-neon-purple transition-all scale-150 -translate-y-4 translate-x-4">
                  <GraduationCap size={48} />
                </div>
                <div className="flex items-center gap-2 text-neon-blue font-semibold mb-2">
                  <Calendar size={16} />
                  <span>{item.year}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{item.degree}</h3>
                <h4 className="text-lg text-gray-300 mb-3">{item.institution}</h4>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
