import { useState } from 'react';

interface SegmentRow {
  icon: string;
  label: string;
  count: number;
  color: string;
  customers?: { name: string; detail?: string }[];
}

interface FieldSmartRecommendCardProps {
  data: {
    total: number;
    subtitle: string;
    conversionRate: string;
    estimatedDeal: string;
    segments: SegmentRow[];
    aiNote: string;
  };
}

export default function FieldSmartRecommendCard({ data }: FieldSmartRecommendCardProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (i: number) => setExpandedIndex(prev => prev === i ? null : i);

  return (
    <div style={{
      borderRadius: 16,
      overflow: 'hidden',
      border: '1px solid #E8EFFE',
      boxShadow: '0 2px 12px rgba(59,94,219,0.10)',
      background: '#fff',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #3B5EDB 0%, #6C3AED 100%)',
        padding: '14px 16px 12px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ fontSize: 16 }}>🎯</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>客群智能推荐</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{data.subtitle}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{data.total}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>位重点客户</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.2)',
          margin: '10px 0 6px', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: '10%',
            background: 'linear-gradient(90deg, #FBBF24, #F97316)',
            borderRadius: 3,
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.80)' }}>预计转化率 {data.conversionRate}</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.80)' }}>预计成交 {data.estimatedDeal}</span>
        </div>
      </div>

      {/* Hint */}
      <div style={{ padding: '8px 16px 4px' }}>
        <span style={{ fontSize: 11, color: '#94A3B8' }}>点击可展开查看客户名单 ▾</span>
      </div>

      {/* Segment rows */}
      <div style={{ padding: '4px 12px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.segments.map((seg, i) => (
          <div key={i}>
            <div
              onClick={() => toggle(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#FAFBFF', borderRadius: 10, padding: '9px 12px',
                cursor: 'pointer', userSelect: 'none',
              }}
            >
              <span style={{ fontSize: 20, flexShrink: 0 }}>{seg.icon}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#1E293B' }}>{seg.label}</span>
              <div style={{
                minWidth: 28, height: 28, borderRadius: '50%',
                background: seg.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 13,
              }}>{seg.count}</div>
              <span style={{ fontSize: 10, color: '#94A3B8', marginLeft: 2 }}>
                {expandedIndex === i ? '▲' : '▼'}
              </span>
            </div>

            {/* Expanded customer list */}
            {expandedIndex === i && seg.customers && seg.customers.length > 0 && (
              <div style={{
                background: '#F8FAFF', borderRadius: '0 0 10px 10px',
                padding: '6px 12px 8px 52px',
                marginTop: -2,
                border: '1px solid #E8EFFE',
                borderTop: 'none',
              }}>
                {seg.customers.map((c, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '4px 0',
                    borderBottom: j < seg.customers!.length - 1 ? '1px solid #EEF2FF' : 'none',
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>{c.name}</span>
                    {c.detail && <span style={{ fontSize: 11, color: '#94A3B8' }}>{c.detail}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Note */}
      <div style={{
        margin: '0 12px 12px',
        background: '#EFF6FF', borderRadius: 10,
        padding: '9px 12px',
        display: 'flex', gap: 8, alignItems: 'flex-start',
      }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>🤖</span>
        <span style={{ fontSize: 11, color: '#1D4ED8', lineHeight: 1.6 }}>{data.aiNote}</span>
      </div>
    </div>
  );
}
