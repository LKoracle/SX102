interface TrackingAction {
  title: string;
  icon: string;
  target: string;
  status: 'completed' | 'in-progress' | 'planned';
  detail: string;
}

interface TrackingStatusData {
  title: string;
  actions: TrackingAction[];
}

export function TrackingStatusCard({ data }: { data: Record<string, unknown> }) {
  const d = data as unknown as TrackingStatusData;

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-100 text-green-700 border-green-300';
    if (status === 'in-progress') return 'bg-blue-100 text-blue-700 border-blue-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return '✓';
    if (status === 'in-progress') return '⚙';
    return '→';
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#10B981] to-[#059669] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🎯 {d.title}</h3>
        <p className="text-white/80 text-[11px] mt-0.5">追踪行动实时推送</p>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2 max-h-[400px] overflow-y-auto">
        {d.actions.map((action, idx) => (
          <div key={idx} className="relative">
            {/* Timeline line */}
            {idx < d.actions.length - 1 && (
              <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-[#E5E7EB]" />
            )}

            {/* Action Card */}
            <div className="pl-14 pb-1">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#059669]/20 border border-[#D1FAE5] flex items-center justify-center text-lg">
                {action.icon}
              </div>

              {/* Content */}
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <div className="flex items-start justify-between mb-1.5">
                  <div>
                    <div className="font-semibold text-[12px] text-[#333]">{action.title}</div>
                    <div className="text-[10px] text-[#999] mt-0.5">目标：{action.target}</div>
                  </div>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded border ${getStatusColor(action.status)}`}
                  >
                    {getStatusIcon(action.status)} {action.status === 'completed' ? '已完成' : action.status === 'in-progress' ? '进行中' : '计划中'}
                  </span>
                </div>
                <div className="text-[11px] leading-relaxed text-[#666] bg-white rounded p-1.5 mt-1">
                  {action.detail}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200 px-3 pb-3">
        <div className="text-[11px] text-[#999]">
          ✓ 已全部推送至相关负责人，后续将每日追踪进展
        </div>
      </div>
    </div>
  );
}
