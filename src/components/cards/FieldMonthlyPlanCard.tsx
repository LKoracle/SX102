interface TopContact {
  name: string;
  detail: string;
  rank: number;
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
        {/* Title row */}
        <div className="text-white font-semibold text-[13px] mb-3">
          ✅ 4月经营计划已生成
        </div>

        {/* Stats row */}
        <div className="flex items-end justify-between">
          {/* Center: big number */}
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-white font-bold leading-none"
              style={{ fontSize: '36px' }}
            >
              {data.totalCount}
            </span>
            <span className="text-white text-[12px]">位重点客户</span>
          </div>

          {/* Right: small stats */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-white/80 text-[11px]">
              预计转化 {data.estimatedConversion}
            </span>
            <span className="text-white/80 text-[11px]">
              潜在收入 {data.estimatedIncome}
            </span>
          </div>
        </div>
      </div>

      {/* Priority Visit Section */}
      <div>
        <div className="text-[12px] font-semibold text-[#1a1a1a] px-[14px] pt-[12px] pb-[6px]">
          🎯 优先拜访
        </div>

        {/* Contact List */}
        <div className="px-[14px]">
          {visibleContacts.map((contact, index) => (
            <div key={contact.rank}>
              <div className="flex items-center gap-3 py-2">
                {/* Rank badge */}
                <div
                  className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #1D4ED8, #7C3AED)',
                    fontSize: '10px',
                  }}
                >
                  {contact.rank}
                </div>

                {/* Name and detail */}
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] font-semibold text-[#1a1a1a]">
                    {contact.name}
                  </span>
                  <span className="text-[11px] text-[#999] ml-2">
                    {contact.detail}
                  </span>
                </div>
              </div>

              {/* Separator — hidden on last item */}
              {index < visibleContacts.length - 1 && (
                <div style={{ height: '1px', background: '#F3F4F6' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Note */}
      <div
        className="px-[14px] py-[10px] mt-1"
        style={{ background: '#EFF6FF' }}
      >
        <p className="text-[12px] leading-[1.5]" style={{ color: '#1D4ED8' }}>
          ✨ {data.aiNote}
        </p>
      </div>
    </div>
  );
}
