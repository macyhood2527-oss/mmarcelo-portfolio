'use client';

import { useMemo, useState } from 'react';
import { FolderKanban, Sparkles, Wrench } from 'lucide-react';
import PageIntro from '../../components/layout/PageIntro.jsx';
import SelectedWork from '../../sections/SelectedWork.jsx';
import TechStack from '../../sections/TechStack.jsx';
import SectionDivider from '../../components/layout/SectionDivider.jsx';
import Container from '../../components/layout/Container.jsx';
import Chip from '../../components/ui/Chip.jsx';
import { projects } from '../../data/projects.js';

export default function ProjectsPage() {
  const [activeTech, setActiveTech] = useState(null);

  const filteredProjects = useMemo(() => {
    if (!activeTech) return projects;
    return projects.filter((project) => (project.tags || []).includes(activeTech));
  }, [activeTech]);

  function toggleTech(tagKey) {
    setActiveTech((prev) => (prev === tagKey ? null : tagKey));
  }

  return (
    <>
      <PageIntro
        kicker="Projects"
        title="Project work with more room to breathe"
        description="A dedicated page for the core builds in my portfolio, including case-study details, stack chips, screenshots, and the tools behind each system."
        icon={FolderKanban}
      />

      <section className="section" style={{ paddingTop: 8, paddingBottom: 20 }}>
        <Container>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Chip>
              <FolderKanban size={14} strokeWidth={1.9} style={{ marginRight: 6 }} />
              Main portfolio builds
            </Chip>
            <Chip>
              <Wrench size={14} strokeWidth={1.9} style={{ marginRight: 6 }} />
              Tech stack filtering
            </Chip>
            <Chip>
              <Sparkles size={14} strokeWidth={1.9} style={{ marginRight: 6 }} />
              Screenshots and case studies
            </Chip>
          </div>
        </Container>
      </section>

      <TechStack activeTech={activeTech} onToggleTech={toggleTech} />
      <SectionDivider />
      <SelectedWork
        projects={filteredProjects}
        activeTech={activeTech}
        onClearFilter={() => setActiveTech(null)}
      />
    </>
  );
}
