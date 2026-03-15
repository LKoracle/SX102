import { useState } from 'react';

interface ConsultItem {
  id: number;
  title: string;
  summary: string;
  tag: string;
}

interface FieldHealthConsultCardProps {
  data: {
    items: ConsultItem[];
  };
}

export default function FieldHealthConsultCard({ data }: FieldHealthConsultCardProps) {
  const [sharedMap, setSharedMap] = useState<Record<number, boolean>>({});

  const handleShare = (item: ConsultItem) => {
    setSharedMap(prev => ({ ...prev, [item.id]: true }));
    window.dispatchEvent(new CustomEvent('health-consult-share-moments', {
      detail: { title: item.title, summary: item.summary },
    }));
  };

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm border border-gray-100"
      style={{ background: '#fff' }}
    >
      {/* Header */}
      <div
        className="px-4 py-3"
        style={{ background: 'linear-gradient(135deg, #059669 0%, #0891B2 100%)' }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 18 }}>🏥</span>
          <span className="text-white font-semibold text-[13px]">每日资讯推荐</span>
        </div>
        <div className="text-white/80 text-[11px] mt-1">健康养老 · 今日精选 3 条</div>
      </div>

      {/* Consult Items */}
      <div style={{ padding: '8px 14px 4px' }}>
        {data.items.map((item, index) => (
          <div key={item.id}>
            <div style={{ paddingTop: 10, paddingBottom: 8 }}>
              {/* Tag + Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '1px 6px',
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #D1FAE5, #CFFAFE)',
                    color: '#065F46',
                    flexShrink: 0,
                  }}
                >
                  {item.tag}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4 }}>
                  {item.title}
                </span>
              </div>

              {/* Summary bubble */}
              <div
                style={{
                  borderRadius: 10,
                  padding: '8px 12px',
                  background: '#F0FDF4',
                  border: '1px solid #D1FAE5',
                  marginBottom: 8,
                }}
              >
                <div style={{ fontSize: 11, color: '#374151', lineHeight: 1.65, marginBottom: 8 }}>
                  {item.summary}
                </div>
                <button
                  onClick={() => handleShare(item)}
                  style={{
                    width: '100%',
                    padding: '6px 0',
                    borderRadius: 8,
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: sharedMap[item.id] ? 'default' : 'pointer',
                    background: sharedMap[item.id]
                      ? '#E2E8F0'
                      : 'linear-gradient(135deg, #059669, #0891B2)',
                    color: sharedMap[item.id] ? '#94A3B8' : '#fff',
                    transition: 'all 0.2s',
                  }}
                >
                  {sharedMap[item.id] ? '✅ 已发到朋友圈' : '一键发到朋友圈'}
                </button>
              </div>
            </div>
            {index < data.items.length - 1 && (
              <div style={{ height: '1px', background: '#F3F4F6' }} />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-[14px] py-[10px]" style={{ background: '#ECFDF5' }}>
        <p className="text-[11px] leading-[1.5]" style={{ color: '#065F46' }}>
          🌿 每日更新健康养老资讯，发到朋友圈提升专业形象
        </p>
      </div>
    </div>
  );
}
