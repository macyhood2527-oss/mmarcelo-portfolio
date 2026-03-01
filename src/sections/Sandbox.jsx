import { useMemo, useState } from 'react';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';

export default function Sandbox() {
  // STATUS API STATE
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [latencyMs, setLatencyMs] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [simulateFailure, setSimulateFailure] = useState(false);

  // AUDIT API STATE
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState(null);
  const [auditItems, setAuditItems] = useState([]);
  const [auditStatusCode, setAuditStatusCode] = useState(null);
  const [auditLatencyMs, setAuditLatencyMs] = useState(null);
  const [auditRequestId, setAuditRequestId] = useState(null);

  const statusBadge = useMemo(() => {
    if (loading) return { label: 'Requesting…', tone: 'muted' };
    if (statusCode === 200) return { label: '200 OK', tone: 'ok' };
    if (statusCode) return { label: `${statusCode} Error`, tone: 'err' };
    return { label: 'Idle', tone: 'muted' };
  }, [loading, statusCode]);

  const auditBadge = useMemo(() => {
    if (auditLoading) return { label: 'Requesting…', tone: 'muted' };
    if (auditStatusCode === 200) return { label: '200 OK', tone: 'ok' };
    if (auditStatusCode) return { label: `${auditStatusCode} Error`, tone: 'err' };
    return { label: 'Idle', tone: 'muted' };
  }, [auditLoading, auditStatusCode]);

  function badgeStyle(tone) {
    const base = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 10px',
      borderRadius: 999,
      border: '1px solid var(--border)',
      fontSize: 13,
      color: 'var(--muted)',
      background: 'rgba(255,255,255,0.02)',
    };

    if (tone === 'ok') {
      return {
        ...base,
        color: 'var(--text)',
        borderColor: 'rgba(80,200,120,0.28)',
        background: 'rgba(80,200,120,0.10)',
      };
    }

    if (tone === 'err') {
      return {
        ...base,
        color: 'var(--text)',
        borderColor: 'rgba(255,107,107,0.28)',
        background: 'rgba(255,107,107,0.10)',
      };
    }

    return base;
  }

  function dotColor(tone) {
    return tone === 'ok'
      ? 'rgba(80,200,120,1)'
      : tone === 'err'
      ? 'rgba(255,107,107,1)'
      : 'rgba(168,179,191,1)';
  }

  function readServerMeta(res) {
    const rid = res.headers.get('x-request-id');
    const rt = res.headers.get('x-response-time-ms');
    return {
      requestId: rid || null,
      latencyMs: rt ? Number(rt) : null,
    };
  }

  async function fetchStatus() {
    setLoading(true);
    setError(null);
    setData(null);
    setStatusCode(null);
    setLatencyMs(null);
    setRequestId(null);

    const start = performance.now();

    try {
      const url = `/api/status${simulateFailure ? '?fail=1' : ''}`;
      const res = await fetch(url);

      setStatusCode(res.status);

      const meta = readServerMeta(res);
      if (meta.requestId) setRequestId(meta.requestId);

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setError(json?.message || `Request failed (${res.status})`);
        return;
      }

      setData(json);
    } catch {
      setStatusCode(0);
      setError('Network error — API not reachable');
    } finally {
      const end = performance.now();
      setLatencyMs((prev) => prev ?? Math.round(end - start));
      setLoading(false);
    }
  }

  async function fetchRecentAudit() {
    setAuditLoading(true);
    setAuditError(null);
    setAuditItems([]);
    setAuditStatusCode(null);
    setAuditLatencyMs(null);
    setAuditRequestId(null);

    const start = performance.now();

    try {
      const res = await fetch('/api/audit/recent');
      setAuditStatusCode(res.status);

      const meta = readServerMeta(res);
      if (meta.requestId) setAuditRequestId(meta.requestId);
      if (meta.latencyMs !== null) setAuditLatencyMs(meta.latencyMs);

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setAuditError(json?.message || `Request failed (${res.status})`);
        return;
      }

      setAuditItems(json?.items || []);
    } catch {
      setAuditStatusCode(0);
      setAuditError('Network error — API not reachable');
    } finally {
      const end = performance.now();
      setAuditLatencyMs((prev) => prev ?? Math.round(end - start));
      setAuditLoading(false);
    }
  }

  return (
    <section className="section">
      <Container>
        <div className="kicker">Sandbox</div>
        <h2 className="h2" style={{ marginTop: 6 }}>
          API Interaction Demo
        </h2>

        <div className="card" style={{ padding: 24, marginTop: 16 }}>
          <p className="p" style={{ marginBottom: 16, maxWidth: 780 }}>
            Interactive examples of frontend-to-backend communication,
            including status checks and audit log retrieval.
          </p>

          {/* STATUS */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" onClick={fetchStatus} disabled={loading}>
              {loading ? 'Fetching...' : 'GET /api/status'}
            </Button>

            <span style={badgeStyle(statusBadge.tone)}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: dotColor(statusBadge.tone),
                }}
              />
              {statusBadge.label}
              {latencyMs !== null && <span> • {latencyMs}ms</span>}
            </span>

            <label style={{ fontSize: 13, color: 'var(--muted)' }}>
              <input
                type="checkbox"
                checked={simulateFailure}
                onChange={(e) => setSimulateFailure(e.target.checked)}
                style={{ marginRight: 6 }}
              />
              Simulate failure
            </label>

            {requestId && (
              <span style={{ fontSize: 12, color: 'var(--faint)' }}>
                req: <span style={{ color: 'var(--muted)' }}>{requestId}</span>
              </span>
            )}
          </div>

          {/* STATUS RESPONSE */}
          <div style={{ marginTop: 18 }}>
            {loading && <div style={{ color: 'var(--muted)' }}>Loading response…</div>}
            {error && <div style={{ color: 'rgba(255,107,107,1)' }}>{error}</div>}

            {data && (
              <>
                <div style={{ marginTop: 14, color: 'var(--faint)', fontSize: 13 }}>
                  Response
                </div>
                <pre
                  style={{
                    marginTop: 10,
                    background: 'var(--panel-2)',
                    padding: 16,
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    fontSize: 13,
                    overflowX: 'auto',
                  }}
                >
                  {JSON.stringify(data, null, 2)}
                </pre>
              </>
            )}
          </div>

          {/* AUDIT */}
          <div style={{ marginTop: 28 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="secondary" onClick={fetchRecentAudit} disabled={auditLoading}>
                {auditLoading ? 'Loading…' : 'GET /api/audit/recent'}
              </Button>

              <span style={badgeStyle(auditBadge.tone)}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: dotColor(auditBadge.tone),
                  }}
                />
                {auditBadge.label}
                {auditLatencyMs !== null && <span> • {auditLatencyMs}ms</span>}
              </span>

              {auditRequestId && (
                <span style={{ fontSize: 12, color: 'var(--faint)' }}>
                  req: <span style={{ color: 'var(--muted)' }}>{auditRequestId}</span>
                </span>
              )}
            </div>

            {auditError && (
              <div style={{ marginTop: 12, color: 'rgba(255,107,107,1)' }}>
                {auditError}
              </div>
            )}

            {auditItems.length > 0 && (
              <div
                style={{
                  marginTop: 14,
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr 1fr 220px',
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.02)',
                    fontSize: 13,
                    color: 'var(--faint)',
                  }}
                >
                  <div>ID</div>
                  <div>Actor</div>
                  <div>Action</div>
                  <div>Timestamp</div>
                </div>

                {auditItems.map((row) => (
                  <div
                    key={row.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr 1fr 220px',
                      padding: '10px 12px',
                      borderTop: '1px solid var(--border)',
                      fontSize: 13,
                      color: 'var(--muted)',
                    }}
                  >
                    <div style={{ color: 'var(--text)' }}>{row.id}</div>
                    <div>{row.actor}</div>
                    <div>{row.action}</div>
                    <div>{new Date(row.at).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}