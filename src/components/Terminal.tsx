"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, TerminalSquare } from "lucide-react";

interface HistoryItem {
  type: "command" | "output" | "error" | "system";
  content: string;
}

export const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "system", content: "Welcome to Sachin's DevOps Terminal v1.0.0" },
    { type: "system", content: "Type 'help' to see available commands." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleToggleEvent = () => setIsOpen((prev) => !prev);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-terminal", handleToggleEvent);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-terminal", handleToggleEvent);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, () => void> = {
    help: () => {
      addToHistory("output", "Available commands:\n  whoami          - Display professional summary\n  ls skills       - List technical skills\n  ssh sachin@cloud - Connect to cloud resume\n  clear           - Clear terminal history\n  exit            - Close terminal\n  gui             - Scroll to projects");
    },
    whoami: () => {
      addToHistory("output", "Sachin Sharma | DevOps Engineer & Automation Specialist\n\nI build resilient infrastructure, bridge the gap between Dev and Ops, and occasionaly explore the space through code. Currently focused on Kubernetes, CI/CD, and Cloud Native solutions.");
    },
    "ls skills": () => {
      addToHistory("output", "Fetching technical stack...\n\n[CLOUD]    AWS, Azure, GCP\n[TOOLS]    Docker, Kubernetes, Terraform, Ansible\n[CI/CD]    Jenkins, GitHub Actions, GitLab CI\n[LANGS]    Python, Go, Bash, TypeScript\n[SRE]      Prometheus, Grafana, ELK Stack");
    },
    ls: () => {
      addToHistory("output", "Usage: ls <directory>\nDirectories available: skills");
    },
    "ssh sachin@cloud": () => {
      addToHistory("system", "Connecting to sachin@cloud...");
      setTimeout(() => {
        addToHistory("system", "Authentication successful.");
        addToHistory("system", "Establishing secure tunnel...");
        setTimeout(() => {
          addToHistory("output", "Opening cloud resume in a new tab...");
          window.open("/resume.pdf", "_blank"); // Fallback to root resume
        }, 1000);
      }, 1000);
    },
    clear: () => {
      setHistory([]);
    },
    exit: () => {
      setIsOpen(false);
    },
    gui: () => {
      setIsOpen(false);
      window.location.href = "#projects";
    },
  };

  const addToHistory = (type: HistoryItem["type"], content: string) => {
    setHistory((prev) => [...prev, { type, content }]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim().toLowerCase();
    
    if (!cmd) return;

    addToHistory("command", `sachin@portfolio:~$ ${inputValue}`);
    
    if (commands[cmd]) {
      commands[cmd]();
    } else {
      addToHistory("error", `Command not found: ${cmd}. Type 'help' for available commands.`);
    }

    setInputValue("");
  };

  return (
    <>
      {/* Trigger Button for Mobile/Exploration */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-neon-blue rounded-full shadow-[0_0_20px_rgba(0,136,255,0.4)] text-white group"
        >
          <TerminalSquare size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-10 right-0 bg-black/80 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
            Press ` to open
          </span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              height: isMaximized ? "90vh" : "40vh",
              width: isMaximized ? "100%" : "600px",
              bottom: isMaximized ? "0" : "20px",
              left: isMaximized ? "0" : "auto",
              right: isMaximized ? "0" : "20px",
            }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed z-[60] glass rounded-t-2xl md:rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden font-mono max-w-full`}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <TerminalIcon size={14} className="text-neon-blue" />
                <span className="text-xs font-bold text-gray-400">DevOps Terminal — sachin@portfolio</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-2 text-sm md:text-base scrollbar-thin scrollbar-thumb-white/10"
            >
              {history.map((item, index) => (
                <div key={index} className={`whitespace-pre-wrap leading-relaxed ${
                  item.type === "command" ? "text-white" :
                  item.type === "error" ? "text-red-400" :
                  item.type === "system" ? "text-neon-blue/80 italic" :
                  "text-neon-blue"
                }`}>
                  {item.content}
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex items-center gap-2 mt-2">
                <span className="text-green-400 font-bold">sachin@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                  autoFocus
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
