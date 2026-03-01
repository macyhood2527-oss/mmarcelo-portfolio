import Container from '../components/layout/Container.jsx';

export default function InteractiveSystems() {
  return (
    <section id="systems" className="section">
      <Container>
        <div className="kicker">Real-time & interactive systems</div>
        <h2 className="h2" style={{ marginTop: 6 }}>
          Live Systems Experience
        </h2>

        <div className="card" style={{ padding: 22, marginTop: 14 }}>
          <p className="p">
            Multiplayer systems work framed as engineering: data persistence, live scaling, economy logic,
            performance optimization, compliance integration (TextChatService), and live debugging under load.
          </p>
        </div>
      </Container>
    </section>
  );
}