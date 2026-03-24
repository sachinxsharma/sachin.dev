"use client";
import { motion } from "framer-motion";
import { Terminal, Server, Cloud, Boxes, Cpu } from "lucide-react";

export default function Skills() {
  const categories = [
    {
      title: "Languages",
      icon: <Terminal className="text-neon-blue mb-4" size={32} />,
      items: ["JavaScript / TypeScript", "Python", "Go", "Bash"]
    },
    {
      title: "Core Infrastructure",
      icon: <Server className="text-neon-purple mb-4" size={32} />,
      items: ["Linux", "Docker", "Kubernetes", "Terraform"]
    },
    {
      title: "Cloud Services",
      icon: <Cloud className="text-neon-blue mb-4" size={32} />,
      items: ["AWS (EC2, S3, IAM)", "GCP", "Azure Basics"]
    },
    {
      title: "CI/CD & Automation",
      icon: <Boxes className="text-neon-purple mb-4" size={32} />,
      items: ["Jenkins", "GitHub Actions", "GitLab CI", "Ansible"]
    }
  ];

  const currentlyLearning = [
    "Advanced Service Mesh (Istio)",
    "GitOps with ArgoCD",
    "Prometheus & Grafana Observability"
  ];

  return (
    <section id="skills" className="py-20 relative z-10 bg-black/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="text-neon-blue">Arsenal</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My proficiency in various technologies and what I am currently focusing on.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass p-6 rounded-2xl hover:border-neon-blue/50 transition-colors"
            >
              {cat.icon}
              <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item, i) => (
                  <li key={i} className="text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Current Learning */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden"
          id="learning"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
          
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
            <Cpu className="text-neon-purple" size={36} />
            Currently Learning
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentlyLearning.map((topic, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl border-l-4 border-l-neon-purple hover:bg-white/10 transition-colors">
                <p className="font-semibold text-lg">{topic}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
