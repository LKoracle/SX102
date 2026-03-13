interface FieldCustomerPanoramaCardProps {
  data: {
    total: number;
    lifeInsurance: number;
    comprehensive: number;
    existing: number;
    prospect: number;
  };
}

const SEGMENTS = [
  { key: 'prospect',      label: '准客户',    icon: '🎯', color: '#3B82F6',  bgFrom: '#EFF6FF', bgTo: '#DBEAFE', border: '#BFDBFE', text: '#1D4ED8' },
  { key: 'lifeInsurance', label: '寿险客户',  icon: '🛡️', color: '#7C3AED',  bgFrom: '#F5F3FF', bgTo: '#EDE9FE', border: '#DDD6FE', text: '#5B21B6' },
  { key: 'comprehensive', label: '综拓客户',  icon: '🌐', color: '#059669',  bgFrom: '#ECFDF5', bgTo: '#D1FAE5', border: '#A7F3D0', text: '#065F46' },
  { key: 'existing',      label: '存续单客户', icon: '📋', color: '#F59E0B', bgFrom: '#FFFBEB', bgTo: '#FEF3C7', border: '#FDE68A', text: '#92400E' },
];

export default function FieldCustomerPanoramaCard({ data }: FieldCustomerPanoramaCardProps) {
  const { total, lifeInsurance, comprehensive, existing, prospect } = data;
  const values: Record<string, number> = { prospect, lifeInsurance, comprehensive, existing };

  // bar widths (minimum 2% so tiny segments are still visible)
  const barWidths = SEGMENTS.map(s => Math.max(2, Math.round((values[s.key] / total) * 100)));

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      border: '1px solid #E8EFFE',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(59,94,219,0.09)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1D4ED8 0%, #4F46E5 100%)',
        padding: '11px 14px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: 16 }}>🗺️</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>客户全景大图</span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.18)',
          borderRadius: 20,
          padding: '2px 10px',
          display: 'flex',
          alignItems: 'baseline',
          gap: 3,
        }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{total.toLocaleString()}</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)' }}>位客户</span>
        </div>
      </div>

      {/* Stacked bar */}
      <div style={{ padding: '10px 14px 4px' }}>
        <div style={{ display: 'flex', height: 10, borderRadius: 6, overflow: 'hidden', gap: 2 }}>
          {SEGMENTS.map((s, i) => (
            <div
              key={s.key}
              style={{
                width: `${barWidths[i]}%`,
                background: s.color,
                borderRadius: i === 0 ? '6px 0 0 6px' : i === SEGMENTS.length - 1 ? '0 6px 6px 0' : 0,
                transition: 'width 0.6s ease',
              }}
            />
          ))}
        </div>
        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', marginTop: 6 }}>
          {SEGMENTS.map(s => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: '#64748B' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#F1F5F9', margin: '8px 14px 0' }} />

      {/* Metric tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '9px 10px 10px' }}>
        {SEGMENTS.map(s => {
          const val = values[s.key];
          const pct = Math.round((val / total) * 100);
          return (
            <div key={s.key} style={{
              borderRadius: 10,
              background: `linear-gradient(135deg, ${s.bgFrom}, ${s.bgTo})`,
              border: `1px solid ${s.border}`,
              padding: '8px 10px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 13 }}>{s.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: s.text }}>{s.label}</span>
                </div>
                <span style={{
                  fontSize: 10, color: s.text,
                  background: 'rgba(255,255,255,0.55)',
                  borderRadius: 8, padding: '1px 5px',
                }}>{pct}%</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1 }}>
                {val.toLocaleString()}
              </div>
              {/* Mini bar */}
              <div style={{ marginTop: 5, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.6)' }}>
                <div style={{ width: `${pct}%`, height: '100%', borderRadius: 2, background: s.color, opacity: 0.7 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
