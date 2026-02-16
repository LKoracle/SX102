interface VisitSummaryCardProps {
  data: Record<string, unknown>;
}

export function VisitSummaryCard({ data }: VisitSummaryCardProps) {
  const customerName = data.customerName as string;
  const date = data.date as string;
  const duration = data.duration as string;
  const location = data.location as string;
  const attendees = data.attendees as string;
  const keyPoints = data.keyPoints as string[];
  const nextActions = data.nextActions as string[];
  const sentiment = data.sentiment as string;
  const closeProbability = data.closeProbability as number;

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📝 拜访总结 - {customerName}</h3>
      </div>
      <div className="p-3 space-y-2.5">
        {/* Meta info */}
        <div className="grid grid-cols-2 gap-2 text-[13px]">
          <div className="flex items-center gap-1 text-text-secondary">
            <span>📅</span> {date}
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <span>⏱️</span> {duration}
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <span>📍</span> {location}
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <span>👥</span> {attendees}
          </div>
        </div>

        {/* Key points */}
        <div>
          <p className="text-[13px] font-medium mb-1">📋 关键要点：</p>
          <ul className="space-y-1">
            {keyPoints.map((point, i) => (
              <li key={i} className="text-[13px] text-text-secondary flex items-start gap-1.5">
                <span className="text-blue-500 mt-0.5">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next actions */}
        <div>
          <p className="text-[13px] font-medium mb-1">🎯 下一步行动：</p>
          <ul className="space-y-1">
            {nextActions.map((action, i) => (
              <li key={i} className="text-[13px] text-text-secondary flex items-start gap-1.5">
                <span className="text-primary">→</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-text-secondary">客户态度：</span>
            <span className="text-[13px] font-medium text-blue-600">{sentiment}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-text-secondary">签单概率：</span>
            <span className={`text-[13px] font-bold ${closeProbability >= 70 ? 'text-blue-600' : closeProbability >= 40 ? 'text-indigo-600' : 'text-purple-500'}`}>
              {closeProbability}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
