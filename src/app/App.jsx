import { useMemo, useState } from 'react';
import { useEffect } from "react";
function useMarqueeTitle(text, speed = 150, pause = 1500) {
  useEffect(() => {
    let i = 0;
    let direction = 1;
    const original = text + "   •   ";
    let interval;

    function startScroll() {
      interval = setInterval(() => {
        document.title =
          original.slice(i) + original.slice(0, i);

        i += direction;

        if (i >= original.length) {
          clearInterval(interval);
          setTimeout(() => {
            i = 0;
            startScroll();
          }, pause);
        }
      }, speed);
    }

    startScroll();

    return () => clearInterval(interval);
  }, [text, speed, pause]);
}


import SectionDivider from '../components/layout/SectionDivider.jsx';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';

import Hero from '../sections/Hero.jsx';
import SelectedWork from '../sections/SelectedWork.jsx';
import TechStack from '../sections/TechStack.jsx';


import InteractiveSystems from '../sections/InteractiveSystems.jsx';
import Sandbox from '../sections/Sandbox.jsx';
import Creative from '../sections/Creative.jsx';
import LiveSystemsExperience from '../sections/LiveSystemsExperience.jsx';
import ClientExperience from '../sections/ClientExperience.jsx';
import Contact from '../sections/Contact.jsx';

import { projects } from '../data/projects.js';

export default function App() {
  const [activeTech, setActiveTech] = useState(null);

  const filteredProjects = useMemo(() => {
    if (!activeTech) return projects;
    return projects.filter((p) => (p.tags || []).includes(activeTech));
  }, [activeTech]);

  function toggleTech(tagKey) {
    setActiveTech((prev) => (prev === tagKey ? null : tagKey));
  }

  useMarqueeTitle("🌸 Melissa Marcelo — Backend Developer");
  return (
    <>
    
      <Header activeTech={activeTech} onClearTech={() => setActiveTech(null)} />
      <main>
        <Hero />
        <SectionDivider />
        <SelectedWork
          projects={filteredProjects}
          activeTech={activeTech}
          onClearFilter={() => setActiveTech(null)}
        />
        <SectionDivider />
        <TechStack activeTech={activeTech} onToggleTech={toggleTech} />
        <SectionDivider />
      <LiveSystemsExperience />
      <SectionDivider />       
        <Sandbox />
        <SectionDivider />
        <ClientExperience />
        <SectionDivider />        
        <Contact />
      </main>
      <Footer />
    </>
  );
}