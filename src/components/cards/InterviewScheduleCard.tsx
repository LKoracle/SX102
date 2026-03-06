interface ScheduleItem {
  name: string;
  group: string;
  avatar: string;
  priority: string;
  suggestedDate: string;
  suggestedTime: string;
  location: string;
  duration: string;
  focus: string;
}

interface InterviewScheduleData {
  title: string;
  schedules: ScheduleItem[];
}

export function InterviewScheduleCard({ data }: { data: Record<string, unknown> }) {
  const d = data as unknown as InterviewScheduleData;

  const getPriorityColor = (priority: string) => {
    return priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700';
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📅 {d.title}</h3>
        <p className="text-white/80 text-[11px] mt-0.5">面谈日程安排</p>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3 max-h-[400px] overflow-y-auto">
        {d.schedules.map((s, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            {/* Person Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-[11px] font-bold text-white">
                  {s.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[12px] text-[#333]">{s.name}</div>
                  <div className="text-[10px] text-[#999]">{s.group}</div>
                </div>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${getPriorityColor(s.priority)}`}>
                {s.priority === 'high' ? '高优' : '中优'}
              </span>
            </div>

            {/* Schedule Details Grid */}
            <div className="grid grid-cols-2 gap-2 bg-white rounded p-2.5 mb-2 border border-gray-100">
              <div>
                <div className="text-[10px] text-[#999]">建议时间</div>
                <div className="text-[11px] font-semibold text-[#333]">{s.suggestedDate}</div>
                <div className="text-[10px] text-[#666]">{s.suggestedTime}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#999]">预计时长</div>
                <div className="text-[11px] font-semibold text-[#333]">{s.duration}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] text-[#999]">面谈地点</div>
                <div className="text-[11px] text-[#333]">{s.location}</div>
              </div>
            </div>

            {/* Focus Area */}
            <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FEE8A8] rounded p-2 border border-[#FCD34D]">
              <div className="text-[10px] text-[#92400E] font-medium mb-1">💡 重点</div>
              <div className="text-[11px] leading-snug text-[#78350F]">{s.focus}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200 text-center text-[11px] text-[#999]">
        ✓ 日程已同步至系统日历，主管将收到提醒
      </div>
    </div>
  );
}
