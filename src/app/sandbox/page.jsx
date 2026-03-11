import { Boxes, FlaskConical, PencilRuler } from 'lucide-react';
import PageIntro from '../../components/layout/PageIntro.jsx';
import Container from '../../components/layout/Container.jsx';
import Chip from '../../components/ui/Chip.jsx';
import Sandbox from '../../sections/Sandbox.jsx';

export default function SandboxPage() {
  return (
    <>
      <PageIntro
        kicker="Sandbox"
        title="Experiments, API demos, and room for future prototypes"
        description="A flexible page for technical exploration, backend demos, and small builds that show how I think through request states, system behavior, and implementation details."
        icon={FlaskConical}
      />

      <section className="section" style={{ paddingTop: 8, paddingBottom: 20 }}>
        <Container>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Chip>
              <FlaskConical size={14} strokeWidth={1.9} style={{ marginRight: 6 }} />
              API experiments
            </Chip>
            <Chip>
              <PencilRuler size={14} strokeWidth={1.9} style={{ marginRight: 6 }} />
              Prototype thinking
            </Chip>
            <Chip>
              <Boxes size={14} strokeWidth={1.9} style={{ marginRight: 6 }} />
              Space for future mini builds
            </Chip>
          </div>
        </Container>
      </section>

      <Sandbox />
    </>
  );
}
