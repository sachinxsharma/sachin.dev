"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  color: string;
  link: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Database for Developers: Foundations",
    issuer: "Oracle",
    date: "Aug 2025",
    description: "Gained practical skills in SQL programming, database table design, data manipulation, and use of Oracle Database through a comprehensive 12-part boot camp.",
    color: "from-red-500 to-orange-600",
    link: "https://www.linkedin.com/in/sachin-sharma-145546254/overlay/Certifications/1282961848/treasury/?profileId=ACoAAD66aUUBQz1Fc6VHnVCnYE8Zvjxv2AMCYEY"
  },
  {
    id: 2,
    title: "Data Analytics",
    issuer: "Deloitte",
    date: "Apr 2025",
    description: "Mastered data cleaning, visualization, and statistical analysis to drive business insights.",
    color: "from-green-500 to-teal-600",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_QsedCzJaR7CJpHbcg_1743868655135_completion_certificate.pdf"
  },
  {
    id: 3,
    title: "Git and Github",
    issuer: "Coursera",
    date: "Sep 2023",
    description: "Version control mastery, focusing on collaborative development workflows and repository management.",
    color: "from-slate-700 to-slate-900",
    link: "https://www.coursera.org/account/accomplishments/certificate/XTXHV9PHQWF4"
  },
  {
    id: 4,
    title: "Introduction to Java",
    issuer: "Coursera",
    date: "Jul 2023",
    description: "Foundational Java programming, covering OOP principles, data structures, and basic algorithms.",
    color: "from-orange-600 to-red-700",
    link: "https://www.coursera.org/account/accomplishments/certificate/PW7RTHTBWTU6"
  },
  {
    id: 5,
    title: "python",
    issuer: "Cisco",
    date: "Jun 2023",
    description: "Comprehensive Python programming covering syntax, libraries, and automation scripts.",
    color: "from-blue-500 to-yellow-500",
    link: "#"
  },
  {
    id: 6,
    title: "Introduction to Front-End Development",
    issuer: "Coursera",
    date: "Apr 2023",
    description: "Core web technologies including HTML, CSS, and basic JavaScript for modern web interfaces.",
    color: "from-cyan-500 to-blue-600",
    link: "https://www.coursera.org/account/accomplishments/certificate/DDDWELJHRL2A"
  },
  {
    id: 8,
    title: "Javascript Practical crash Course",
    issuer: "Udemy",
    date: "May 2023",
    description: "Hands-on JavaScript development focusing on DOM manipulation, ES6+, and practical web apps.",
    color: "from-yellow-400 to-orange-500",
    link: "https://www.udemy.com/certificate/UC-98a791a2-483f-49ef-947d-b41160b56293/"
  },
  {
    id: 9,
    title: "Frontend web devlopment",
    issuer: "Udemy",
    date: "May 2023",
    description: "Building responsive and interactive user interfaces using modern CSS and best practices.",
    color: "from-indigo-500 to-purple-600",
    link: "https://www.linkedin.com/:%20ude.my/UC-f021751e-438f-4db6-993f-7242b8886d1c/?_l=en_US"
  },
  {
    id: 10,
    title: "Bootstrap javascript html",
    issuer: "Udemy",
    date: "May 2023",
    description: "Rapid prototyping and responsive design using the Bootstrap framework and standard web tech.",
    color: "from-purple-600 to-blue-700",
    link: "https://www.linkedin.com/safety/go/?_l=en_US"
  },
  {
    id: 11,
    title: "Advanced React & Next.js",
    issuer: "Meta / Coursera",
    date: "Jan 2024",
    description: "Deep dive into performance optimization, server-side rendering, and complex state management.",
    color: "from-violet-500 to-fuchsia-500",
    link: ""
  },
  {
    id: 12,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Feb 2024",
    description: "Foundational knowledge of AWS cloud platform, security, and architectural principles.",
    color: "from-orange-400 to-amber-600",
    link: ""
  }
];

export default function Certificates() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <section id="certificates" className="py-20 relative z-10 overflow-hidden bg-black/10">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Professional <span className="text-neon-purple">Certificates</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 font-medium">Global certifications validating technical excellence.</p>
        </motion.div>
      </div>

      <div className="relative h-[500px] flex items-center justify-center">
        <div className="relative w-full max-w-[1200px] flex items-center justify-center h-full">
          <AnimatePresence mode="popLayout">
            {certificates.map((cert, index) => {
              // Calculate relative position (-1, 0, 1)
              let position = index - activeIndex;

              // Handle wrap-around for infinite feel
              if (position < -Math.floor(certificates.length / 2)) {
                position += certificates.length;
              } else if (position > Math.floor(certificates.length / 2)) {
                position -= certificates.length;
              }

              const isActive = position === 0;
              const isVisible = Math.abs(position) <= 1;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={cert.id}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    x: position * 400,
                    filter: "blur(10px)"
                  }}
                  animate={{
                    opacity: isActive ? 1 : 0.4,
                    scale: isActive ? 1 : 0.8,
                    x: position * (typeof window !== 'undefined' && window.innerWidth < 768 ? 280 : 350),
                    zIndex: isActive ? 30 : 10,
                    filter: isActive ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                  }}
                  className={`absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] glass rounded-3xl p-8 flex flex-col justify-between border border-white/10 shadow-2xl ${isActive ? 'border-neon-purple/50 ring-1 ring-neon-purple/20' : ''}`}
                >
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <Award className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-neon-blue font-semibold mb-1">{cert.issuer}</p>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mb-4">{cert.date}</p>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-600 dark:text-gray-300 text-sm line-clamp-3"
                      >
                        {cert.description}
                      </motion.p>
                    )}
                  </div>

                  <div className="mt-auto flex justify-between items-center relative z-10">
                    <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-400">
                      Verified
                    </div>
                    <button
                      onClick={() => cert.link && window.open(cert.link, "_blank")}
                      className={`p-2 rounded-full transition-colors ${isActive ? 'bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-900 dark:text-white' : 'bg-transparent text-slate-400 dark:text-gray-500'} ${!cert.link && isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!isActive || !cert.link}
                      title={cert.link ? "View Credential" : "Link placeholder - additive soon"}
                    >
                      <ExternalLink size={18} />
                    </button>
                  </div>

                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} ${isActive ? 'opacity-10' : 'opacity-0'} rounded-3xl blur-2xl -z-10 transition-opacity duration-500`} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-8 py-4 z-40">
          <button
            onClick={handlePrev}
            className="p-4 rounded-full glass border border-white/10 hover:border-neon-blue transition-all group active:scale-90"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="text-white group-hover:text-neon-blue transition-colors" />
          </button>
          <button
            onClick={handleNext}
            className="p-4 rounded-full glass border border-white/10 hover:border-neon-purple transition-all group active:scale-90"
            aria-label="Next certificate"
          >
            <ChevronRight className="text-white group-hover:text-neon-purple transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
}
