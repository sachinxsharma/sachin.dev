"use client";
import { useState } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DoraemonIntro from "@/components/DoraemonIntro";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!introFinished && <DoraemonIntro onComplete={() => setIntroFinished(true)} />}

      <div className={!introFinished ? "h-screen overflow-hidden opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        <Hero />
        <Projects />
        <Skills />
        <Education />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
