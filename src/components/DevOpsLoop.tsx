"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Code2, Box, Cpu, Rocket, 
  Settings, Activity, Database, Layers,
  CheckCircle2, Globe, Server
} from "lucide-react";

interface Stage {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  tools: { name: string; icon: React.ReactNode }[];
  color: string;
  x: number;
  y: number;
}

const stages: Stage[] = [
  {
    id: "plan",
    name: "Plan",
    icon: <FileText size={20} />,
    description: "Architecting scalable systems and defining infrastructure requirements.",
    tools: [
      { name: "JIRA", icon: <Layers size={14} /> },
      { name: "Confluence", icon: <FileText size={14} /> },
      { name: "Trello", icon: <Layers size={14} /> }
    ],
    color: "from-blue-500 to-cyan-400",
    x: 20, y: 50
  },
  {
    id: "code",
    name: "Code",
    icon: <Code2 size={20} />,
    description: "Developing robust features with focus on quality and security.",
    tools: [
      { name: "VS Code", icon: <Code2 size={14} /> },
      { name: "Git", icon: <Database size={14} /> },
      { name: "Python/Go", icon: <Cpu size={14} /> }
    ],
    color: "from-cyan-500 to-blue-600",
    x: 35, y: 20
  },
  {
    id: "build",
    name: "Build",
    icon: <Box size={20} />,
    description: "Automating artifact creation and containerization.",
    tools: [
      { name: "Docker", icon: <Box size={14} /> },
      { name: "Maven/Gradle", icon: <Settings size={14} /> },
      { name: "Packer", icon: <Box size={14} /> }
    ],
    color: "from-indigo-500 to-purple-600",
    x: 65, y: 20
  },
  {
    id: "test",
    name: "Test",
    icon: <CheckCircle2 size={20} />,
    description: "Rigorous automated testing for continuous quality assurance.",
    tools: [
      { name: "Selenium", icon: <CheckCircle2 size={14} /> },
      { name: "JUnit/PyTest", icon: <CheckCircle2 size={14} /> },
      { name: "SonarQube", icon: <Activity size={14} /> }
    ],
    color: "from-purple-500 to-pink-500",
    x: 80, y: 50
  },
  {
    id: "release",
    name: "Release",
    icon: <Rocket size={20} />,
    description: "Managing release candidates and automated staging deployments.",
    tools: [
      { name: "Jenkins", icon: <Settings size={14} /> },
      { name: "GH Actions", icon: <Rocket size={14} /> },
      { name: "ArgoCD", icon: <Layers size={14} /> }
    ],
    color: "from-pink-500 to-rose-500",
    x: 65, y: 80
  },
  {
    id: "deploy",
    name: "Deploy",
    icon: <Server size={20} />,
    description: "Zero-downtime deployment to production clusters.",
    tools: [
      { name: "Kubernetes", icon: <Globe size={14} /> },
      { name: "Terraform", icon: <Layers size={14} /> },
      { name: "Ansible", icon: <Settings size={14} /> }
    ],
    color: "from-rose-500 to-orange-500",
    x: 35, y: 80
  },
  {
    id: "operate",
    name: "Operate",
    icon: <Settings size={20} />,
    description: "Ensuring high availability and system reliability.",
    tools: [
      { name: "Linux Admin", icon: <Server size={14} /> },
      { name: "Nginx", icon: <Globe size={14} /> },
      { name: "AWS/Azure", icon: <Database size={14} /> }
    ],
    color: "from-orange-500 to-amber-500",
    x: 20, y: 50 // Shared with Plan but logically distinct in the loop
  },
  {
    id: "monitor",
    name: "Monitor",
    icon: <Activity size={20} />,
    description: "Observability and proactive incident response.",
    tools: [
      { name: "Prometheus", icon: <Activity size={14} /> },
      { name: "Grafana", icon: <Activity size={14} /> },
      { name: "ELK Stack", icon: <Layers size={14} /> }
    ],
    color: "from-amber-500 to-blue-500",
    x: 50, y: 50 // Center of the loop for cross-cutting observability
  }
];

export default function DevOpsLoop() {
  const [activeStage, setActiveStage] = useState<Stage | null>(null);

  // Re-adjust points for 8 segments on an infinity loop
  const points = [
    { id: "plan", x: "15%", y: "50%", color: "text-blue-400" },
    { id: "code", x: "25%", y: "20%", color: "text-cyan-400" },
    { id: "build", x: "40%", y: "20%", color: "text-indigo-400" },
    { id: "monitor", x: "50%", y: "50%", color: "text-amber-400" }, // Center
    { id: "test", x: "60%", y: "80%", color: "text-purple-400" },
    { id: "release", x: "75%", y: "80%", color: "text-pink-400" },
    { id: "deploy", x: "85%", y: "50%", color: "text-rose-400" },
    { id: "operate", x: "75%", y: "20%", color: "text-orange-400" },
  ];

  return (
    <section id="lifecycle" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            DevOps <span className="text-neon-blue">Lifecycle</span> Loop
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Continuity is key. Hover over each stage to see the tools used to power the modern software delivery pipeline.
          </p>
        </motion.div>

        <div className="relative w-full aspect-[2/1] max-w-5xl mx-auto flex items-center justify-center">
          {/* Animated Infinity SVG Path */}
          <svg className="absolute w-full h-full opacity-20 pointer-events-none" viewBox="0 0 1000 500">
            <motion.path
               d="M 250 250 C 250 100 450 100 500 250 C 550 400 750 400 750 250 C 750 100 550 100 500 250 C 450 400 250 400 250 250 Z"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="text-neon-blue"
            />
          </svg>

          {/* Lifecycle Nodes */}
          <div className="relative w-full h-full">
            {stages.map((stage, idx) => {
              // Calculate rough positions on an infinity curve
              // 0 to 100 on an infinity-like path
              const angle = (idx / stages.length) * Math.PI * 2;
              const xPos = 50 + 35 * Math.cos(angle) * Math.cos(angle / 2);
              const yPos = 50 + 35 * Math.sin(angle) * Math.cos(angle / 2);

              return (
                <div 
                  key={stage.id}
                  className="absolute"
                  style={{ left: `${xPos}%`, top: `${yPos}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <motion.div
                    onMouseEnter={() => setActiveStage(stage)}
                    onMouseLeave={() => setActiveStage(null)}
                    whileHover={{ scale: 1.2, zIndex: 50 }}
                    className={`relative p-4 rounded-full glass border border-white/10 cursor-pointer transition-all ${
                      activeStage?.id === stage.id ? 'border-neon-blue ring-4 ring-neon-blue/20' : ''
                    }`}
                  >
                    <div className={`bg-gradient-to-br ${stage.color} p-2 rounded-full text-white shadow-lg`}>
                      {stage.icon}
                    </div>
                    
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono font-bold tracking-widest text-gray-400 uppercase whitespace-nowrap">
                      {stage.name}
                    </span>

                    {/* Tooltip Card */}
                    <AnimatePresence>
                      {activeStage?.id === stage.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-64 glass p-6 rounded-2xl border border-white/10 shadow-2xl z-[100]"
                        >
                          <h3 className={`text-lg font-bold mb-2 bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}>
                            {stage.name} Phase
                          </h3>
                          <p className="text-xs text-gray-300 mb-4 leading-relaxed line-clamp-2">
                            {stage.description}
                          </p>
                          <div className="space-y-2">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Standard Tooling</p>
                            <div className="flex flex-wrap gap-2">
                              {stage.tools.map((tool) => (
                                <div 
                                  key={tool.name}
                                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-gray-300"
                                >
                                  {tool.icon}
                                  <span>{tool.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Triangle indicator */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/10" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Connection Stats (Floating) */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { label: "Deployment Success", value: "99.9%" },
            { label: "Mean Time to Recover", value: "< 15m" },
            { label: "Automation Coverage", value: "85%+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-neon-blue font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
