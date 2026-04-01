"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, BarChart3, Code2 } from "lucide-react";

export default function GitHubStats() {
  const username = "sachinxsharma";
  
  // github-profile-summary-cards themes
  const githubTheme = "tokyonight";
  const borderColor = "border-white/10";

  return (
    <section id="github" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <Github size={16} className="text-neon-blue" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-800 dark:text-gray-300">
              Open Source Activity
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
            Code <span className="text-neon-blue">Insights</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 font-medium">Real-time statistics fetched from GitHub API.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Main Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`glass rounded-3xl p-6 border ${borderColor} hover:border-neon-blue/50 transition-colors group h-full`}
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-neon-blue" size={24} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Overall Statistics</h3>
            </div>
            <div className="flex justify-center items-center overflow-hidden rounded-xl bg-white/5 dark:bg-black/20 p-2">
              <img
                src={`https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${username}&theme=${githubTheme}`}
                alt="GitHub Stats"
                className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>

          {/* Top Languages Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`glass rounded-3xl p-6 border ${borderColor} hover:border-neon-purple/50 transition-colors group h-full`}
          >
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="text-neon-purple" size={24} />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Technologies Mastery</h3>
            </div>
            <div className="flex justify-center items-center overflow-hidden rounded-xl bg-white/5 dark:bg-black/20 p-2 h-full min-h-[195px]">
              <img
                src={`https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${username}&theme=${githubTheme}`}
                alt="Top Languages"
                className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        </div>

        {/* Contribution Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`mt-8 glass rounded-3xl p-6 border ${borderColor} hover:border-neon-blue/50 transition-all flex flex-col items-center`}
        >
          <div className="w-full flex items-center gap-3 mb-6 px-2">
            <Github className="text-neon-blue" size={24} />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">GitHub Streak</h3>
          </div>
          <div className="w-full flex justify-center overflow-hidden rounded-xl bg-white/5 dark:bg-black/20 p-4">
             <img
                src={`https://streak-stats.demolab.com/?user=${username}&theme=${githubTheme}&hide_border=true&background=00000000&ring=0088ff&fire=9d00ff&currStreakNum=0088ff`}
                alt="GitHub Streak"
                className="max-w-full h-auto"
              />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
