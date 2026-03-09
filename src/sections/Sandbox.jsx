import { useMemo, useState } from 'react';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';

function MetaChip({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 10px',
        borderRadius: 999,
        border: '1px solid var(--border)',
        background: 'rgba(255,255,255,0.35)',
        color: 'var(--muted)',
        fontSize: 12,
      }}
    >
      <span style={{ color: 'var(--faint)' }}>{label}:</span>
      <span style={{ color: 'var(--text)' }}>{value}</span>
    </span>
  );
}

export default function Sandbox() {
  const API = import.meta.env.VITE_API_BASE || '';

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [latencyMs, setLatencyMs] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [statusPreset, setStatusPreset] = useState('normal');

  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState(null);
  const [auditItems, setAuditItems] = useState([]);
  const [auditStatusCode, setAuditStatusCode] = useState(null);
  const [auditLatencyMs, setAuditLatencyMs] = useState(null);
  const [auditRequestId, setAuditRequestId] = useState(null);

  const statusBadge = useMemo(() => {
    if (loading) return { label: 'Loading', tone: 'muted' };
    if (statusCode === 200) return { label: 'Success', tone: 'ok' };
    if (statusCode) return { label: 'Error', tone: 'err' };
    return { label: 'Idle', tone: 'muted' };
  }, [loading, statusCode]);

  const auditBadge = useMemo(() => {
    if (auditLoading) return { label: 'Loading', tone: 'muted' };
    if (auditStatusCode === 200) return { label: 'Success', tone: 'ok' };
    if (auditStatusCode) return { label: 'Error', tone: 'err' };
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

  function apiUrl(path) {
    return `${API}${path}`;
  }

  async function copyToClipboard(payload) {
    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      // no-op: clipboard may be unavailable in some environments
    }
  }

  function clearStatus() {
    setData(null);
    setError(null);
    setStatusCode(null);
    setLatencyMs(null);
    setRequestId(null);
  }

  function clearAudit() {
    setAuditItems([]);
    setAuditError(null);
    setAuditStatusCode(null);
    setAuditLatencyMs(null);
    setAuditRequestId(null);
  }

  function timeAgo(iso) {
    const ms = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(ms / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
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
      const path = `/api/status${statusPreset === 'failure' ? '?fail=1' : ''}`;
      const res = await fetch(apiUrl(path));
      setStatusCode(res.status);

      const meta = readServerMeta(res);
      if (meta.requestId) setRequestId(meta.requestId);
      if (meta.latencyMs !== null) setLatencyMs(meta.latencyMs);

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        setError(json?.message || `Request failed (${res.status})`);
        return;
      }

      setData(json);
    } catch {
      setStatusCode(0);
      setError('Network error: API not reachable');
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
      const res = await fetch(apiUrl('/api/audit/recent'));
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
      setAuditError('Network error: API not reachable');
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

        <p className="p" style={{ marginTop: 10, maxWidth: 780 }}>
          Product-style API demos for status checks, error handling, and audit trail retrieval.
        </p>

        <div className="sandboxGrid" style={{ marginTop: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div className="sectionLabel" style={{ marginTop: 0 }}>System health</div>
                <div className="p" style={{ fontSize: 14 }}>Demonstrates request states, graceful errors, and response metadata capture.</div>
              </div>
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
              </span>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
              <Button variant={statusPreset === 'normal' ? 'primary' : 'secondary'} onClick={() => setStatusPreset('normal')}>
                Normal
              </Button>
              <Button variant={statusPreset === 'failure' ? 'primary' : 'secondary'} onClick={() => setStatusPreset('failure')}>
                Simulated failure
              </Button>
              <Button variant="secondary" onClick={fetchStatus} disabled={loading}>
                {loading ? 'Requesting...' : 'Run GET /api/status'}
              </Button>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
              <MetaChip label="code" value={statusCode ?? '-'} />
              <MetaChip label="latency" value={latencyMs !== null ? `${latencyMs}ms` : '-'} />
              <MetaChip label="request id" value={requestId || '-'} />
            </div>

            <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Button variant="secondary" onClick={() => copyToClipboard(JSON.stringify(data || { error }, null, 2))} disabled={!data && !error}>
                Copy response
              </Button>
              <Button variant="secondary" onClick={clearStatus}>
                Clear output
              </Button>
            </div>

            {error && <div style={{ marginTop: 12, color: 'rgba(255,107,107,1)' }}>{error}</div>}

            {data && (
              <pre
                style={{
                  marginTop: 12,
                  background: 'var(--panel-2)',
                  padding: 14,
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  fontSize: 13,
                  overflowX: 'auto',
                }}
              >
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div className="sectionLabel" style={{ marginTop: 0 }}>Audit trail</div>
                <div className="p" style={{ fontSize: 14 }}>Demonstrates recent events retrieval with operational traceability and timestamps.</div>
              </div>
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
              </span>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
              <Button variant="secondary" onClick={fetchRecentAudit} disabled={auditLoading}>
                {auditLoading ? 'Loading...' : 'Run GET /api/audit/recent'}
              </Button>
              <Button variant="secondary" onClick={() => copyToClipboard(JSON.stringify(auditItems, null, 2))} disabled={!auditItems.length}>
                Copy audit
              </Button>
              <Button variant="secondary" onClick={clearAudit}>
                Clear output
              </Button>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
              <MetaChip label="code" value={auditStatusCode ?? '-'} />
              <MetaChip label="latency" value={auditLatencyMs !== null ? `${auditLatencyMs}ms` : '-'} />
              <MetaChip label="request id" value={auditRequestId || '-'} />
            </div>

            {auditError && <div style={{ marginTop: 12, color: 'rgba(255,107,107,1)' }}>{auditError}</div>}

            {!!auditItems.length && (
              <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
                {auditItems.map((row) => (
                  <div
                    key={row.id}
                    className="auditRow"
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: 12,
                      padding: 12,
                      background: 'rgba(255,255,255,0.35)',
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr 1fr 170px',
                      gap: 10,
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--faint)' }}>ID</div>
                      <div style={{ color: 'var(--text)', fontSize: 13 }}>{row.id}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--faint)' }}>Actor</div>
                      <div style={{ color: 'var(--muted)', fontSize: 13 }}>{row.actor}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--faint)' }}>Action</div>
                      <div style={{ color: 'var(--muted)', fontSize: 13 }}>{row.action}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--faint)' }}>{timeAgo(row.at)}</div>
                      <div style={{ color: 'var(--muted)', fontSize: 12 }}>{new Date(row.at).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <style>{`
          .sandboxGrid {
            display: grid;
            gap: 14px;
            grid-template-columns: 1fr 1fr;
          }

          @media (max-width: 980px) {
            .sandboxGrid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 860px) {
            #sandbox .auditRow,
            .auditRow {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}
