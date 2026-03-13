import { useState } from 'react';

interface TopContact {
  name: string;
  detail: string;
  rank: number;
  script: string;
}

interface FieldMonthlyPlanCardProps {
  data: {
    totalCount: number;
    estimatedConversion: string;
    estimatedIncome: string;
    topContacts: TopContact[];
    aiNote: string;
  };
}

export default function FieldMonthlyPlanCard({ data }: FieldMonthlyPlanCardProps) {
  const visibleContacts = data.topContacts.slice(0, 3);
  const [sentMap, setSentMap] = useState<Record<number, boolean>>({});

  const handleSend = (contact: TopContact) => {
    setSentMap(prev => ({ ...prev, [contact.rank]: true }));
    window.dispatchEvent(new CustomEvent('monthly-plan-send-wechat', {
      detail: { contactName: contact.name, script: contact.script },
    }));
  };

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm border border-gray-100"
      style={{ background: '#fff' }}
    >
      {/* Top Banner */}
      <div
        className="px-4 py-4"
        style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)' }}
      >
        <div className="text-white font-semibold text-[13px] mb-3">
          ✅ 4月经营计划已生成
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-white font-bold leading-none" style={{ fontSize: '36px' }}>
              {data.totalCount}
            </span>
            <span className="text-white text-[12px]">位重点客户</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-white/80 text-[11px]">预计转化 {data.estimatedConversion}</span>
            <span className="text-white/80 text-[11px]">潜在收入 {data.estimatedIncome}</span>
          </div>
        </div>
      </div>

      {/* Priority Visit Section */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', padding: '12px 14px 6px' }}>
          🎯 优先拜访
        </div>

        <div style={{ padding: '0 14px' }}>
          {visibleContacts.map((contact, index) => (
            <div key={contact.rank}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 8 }}>
                <div
                  style={{
                    width: 22, height: 22, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, flexShrink: 0,
                    background: 'linear-gradient(135deg, #1D4ED8, #7C3AED)',
                    fontSize: 11,
                  }}
                >
                  {contact.rank}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{contact.name}</span>
                  <span style={{ fontSize: 11, color: '#999', marginLeft: 8 }}>{contact.detail}</span>
                </div>
              </div>

              {/* Script bubble */}
              <div
                style={{
                  marginLeft: 34, marginBottom: 8,
                  borderRadius: 10, padding: '8px 12px',
                  background: '#F8FAFF', border: '1px solid #E8EFFE',
                }}
              >
                <div style={{ fontSize: 11, color: '#475569', lineHeight: 1.6, marginBottom: 8 }}>
                  💬 {contact.script}
                </div>
                <button
                  onClick={() => handleSend(contact)}
                  style={{
                    width: '100%',
                    padding: '6px 0',
                    borderRadius: 8,
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: sentMap[contact.rank] ? 'default' : 'pointer',
                    background: sentMap[contact.rank]
                      ? '#E2E8F0'
                      : 'linear-gradient(135deg, #1D4ED8, #7C3AED)',
                    color: sentMap[contact.rank] ? '#94A3B8' : '#fff',
                    transition: 'all 0.2s',
                  }}
                >
                  {sentMap[contact.rank] ? '✅ 已发送' : '一键发送至微信'}
                </button>
              </div>

              {index < visibleContacts.length - 1 && (
                <div style={{ height: '1px', background: '#F3F4F6' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Note */}
      <div className="px-[14px] py-[10px] mt-1" style={{ background: '#EFF6FF' }}>
        <p className="text-[12px] leading-[1.5]" style={{ color: '#1D4ED8' }}>
          ✨ {data.aiNote}
        </p>
      </div>
    </div>
  );
}
