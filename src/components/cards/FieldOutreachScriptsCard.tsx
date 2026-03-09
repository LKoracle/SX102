interface FieldOutreachScriptsCardProps {
  data: {
    totalCount: number;
    priorityContact: {
      name: string;
      script: string;
      reason: string;
    };
    generalTemplate: string;
    templateCount: number;
  };
}

export default function FieldOutreachScriptsCard({ data }: FieldOutreachScriptsCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm border border-gray-100"
      style={{ background: '#fff' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-[14px] py-[12px]"
        style={{ background: 'linear-gradient(90deg, #1E40AF 0%, #3B82F6 100%)' }}
      >
        <span className="text-white font-bold text-[13px]">
          🎙️ 沟通话术 · 司庆季触客
        </span>
        <span className="text-white/80 text-[11px]">
          {data.totalCount}人已匹配
        </span>
      </div>

      {/* Priority Section */}
      <div className="px-[14px] pt-[12px] pb-[10px]">
        {/* Label + name chip row */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[12px] text-[#999]">⭐ 优先触客</span>
          <span
            className="px-2 py-0.5 rounded-full text-[11px] font-medium text-white"
            style={{ background: '#3B82F6' }}
          >
            {data.priorityContact.name}
          </span>
        </div>

        {/* Reason tag */}
        <div className="mb-2">
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[11px] text-[#666]"
            style={{ background: '#F3F4F6' }}
          >
            {data.priorityContact.reason}
          </span>
        </div>

        {/* Script preview box */}
        <div
          className="rounded-xl px-[10px] py-[10px] text-[11px] leading-[1.6] text-[#374151]"
          style={{
            background: '#EFF6FF',
            borderLeft: '3px solid #3B82F6',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {data.priorityContact.script}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#F3F4F6', margin: '0 14px' }} />

      {/* General Template Section */}
      <div className="px-[14px] pt-[8px] pb-[12px]">
        <div className="text-[12px] font-semibold text-[#999] mb-2">
          📋 通用话术模板 · 其余{data.templateCount}位客户
        </div>

        {/* Template preview box */}
        <div
          className="rounded-xl px-[10px] py-[10px] text-[11px] leading-[1.6] text-[#374151]"
          style={{
            background: '#F9FAFB',
            borderLeft: '3px solid #D1D5DB',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {data.generalTemplate}
        </div>
      </div>
    </div>
  );
}
