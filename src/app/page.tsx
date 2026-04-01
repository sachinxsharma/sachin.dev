"use client";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import GitHubStats from "@/components/GitHubStats";
import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative w-full h-full">
      <div className="opacity-100 transition-opacity duration-1000">
        <Hero />
        <Projects />
        <Skills />
        <GitHubStats />
        <Certificates />
        <Education />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
