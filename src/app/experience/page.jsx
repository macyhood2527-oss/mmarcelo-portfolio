import { BadgeCheck, BriefcaseBusiness, Mountain } from 'lucide-react';
import PageIntro from '../../components/layout/PageIntro.jsx';
import SectionDivider from '../../components/layout/SectionDivider.jsx';
import Container from '../../components/layout/Container.jsx';
import LiveSystemsExperience from '../../sections/LiveSystemsExperience.jsx';
import ClientExperience from '../../sections/ClientExperience.jsx';
import Chip from '../../components/ui/Chip.jsx';

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        kicker="Experience"
        title="Live systems, client work, and practical delivery"
        description="A clearer view of real-world work: systems shipped in live environments, collaborative client-facing work, and outcomes grounded in reliability, support, and execution."
        icon={BriefcaseBusiness}
      />

      <section className="section" style={{ paddingTop: 8, paddingBottom: 20 }}>
        <Container>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Chip>
              <BriefcaseBusiness size={14} strokeWidth={1.9} style={{ marginRight: 6 }} />
              Client-facing delivery
            </Chip>
            <Chip>
              <Mountain size={14} strokeWidth={1.9} style={{ marginRight: 6 }} />
              Live environment problem-solving
            </Chip>
            <Chip>
              <BadgeCheck size={14} strokeWidth={1.9} style={{ marginRight: 6 }} />
              Practical impact
            </Chip>
          </div>
        </Container>
      </section>

      <LiveSystemsExperience />
      <SectionDivider />
      <ClientExperience />
    </>
  );
}
