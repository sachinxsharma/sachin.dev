"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { title } from "process";

const projects = [
  {
    title: "Kubernetes Cluster Manager",
    description: "A centralized dashboard to monitor, scale, and manage K8s clusters effortlessly.",
    tech: ["React", "Go", "Kubernetes API"],
    github: "#",
    live: "#"
  },
  {
    title: "CI/CD Pipeline Builder",
    description: "Visual builder for Jenkins and GitHub Actions workflows with real-time feedback.",
    tech: ["Next.js", "Docker", "Node.js"],
    github: "#",
    live: "#"
  },
  {
    title: "Infra as Code visualizer",
    description: "Convert Terraform scripts into interactive architecture diagrams automatically.",
    tech: ["Terraform", "AWS", "Python"],
    github: "#",
    live: "#"
  }, {
    title: "Feast-Flare | Nov 2023 - Dec 2023",
    description: "Built CRUD-based web app using Firebase with real-time data sync",
    tech: ["React.js", "Redux", "Firebase", "Docker", "Git"],
    github: "#",
    live: "https://feast-flare.vercel.app/"
  },
  {
    title: "Insight Flare",
    description: "MERN Stack Blog PlatformCreated a full-stack blog application using React, Node.js, Express, MongoDB. Integrated JWT authentication and Context API for  global state. Designed responsive UI with TailwindCSS",
    tech: ["React", "MongoDB", "Redux", "css"],
    github: "https://github.com/sachinxsharma/BloggingWeb.git",
    live: "https://insightflareblog.vercel.app/"
  }

];

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Featured <span className="text-neon-blue">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="glass p-8 rounded-2xl hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-gray-400 mb-6 min-h-[80px]">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-semibold rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                <a href={project.github} className="flex items-center gap-2 text-sm hover:text-neon-blue transition-colors" target="_blank" rel="noopener noreferrer">
                  <Github size={18} /> Code
                </a>
                <a href={project.live} className="flex items-center gap-2 text-sm hover:text-neon-purple transition-colors" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} /> Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
