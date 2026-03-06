interface Agent {
  name: string;
  fycRate: number;
  activity: number;
  conversion: number;
  status: 'danger' | 'good' | 'warning';
}

interface ProgressListCardProps {
  data: Record<string, unknown>;
}

export function ProgressListCard({ data }: ProgressListCardProps) {
  const agents = (data.agents as Agent[]) || [
    { name: '李平安', fycRate: 38, activity: 45, conversion: 12, status: 'danger' },
    { name: '张明辉', fycRate: 92, activity: 88, conversion: 35, status: 'good' },
    { name: '王丽华', fycRate: 65, activity: 60, conversion: 22, status: 'warning' },
  ];

  const getStatusStyle = (status: string) => {
    const map: Record<string, { color: string; bg: string; label: string }> = {
      danger: { color: '#DC2626', bg: '#FEE2E2', label: '需关注' },
      good: { color: '#059669', bg: '#DCFCE7', label: '达标' },
      warning: { color: '#D97706', bg: '#FEF3C7', label: '偏低' },
    };
    return map[status] || map.warning;
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📊 代理人进度追踪</h3>
      </div>

      <div className="p-3 space-y-2 max-h-[450px] overflow-y-auto">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-1 px-2 py-1.5 bg-blue-50 rounded-[10px]">
          <span className="text-[10px] font-semibold text-[#1D4ED8]">姓名</span>
          <span className="text-[10px] font-semibold text-[#1D4ED8] text-center">FYC达成率</span>
          <span className="text-[10px] font-semibold text-[#1D4ED8] text-center">活动量</span>
          <span className="text-[10px] font-semibold text-[#1D4ED8] text-center">转化率</span>
          <span className="text-[10px] font-semibold text-[#1D4ED8] text-center">状态</span>
        </div>

        {/* Agent Rows */}
        {agents.map((agent, i) => {
          const style = getStatusStyle(agent.status);
          return (
            <div
              key={i}
              className="grid grid-cols-5 gap-1 px-2 py-2 rounded-[10px] border transition-all"
              style={{
                borderColor: agent.status === 'danger' ? '#FECACA' : '#F3F4F6',
                background: agent.status === 'danger' ? '#FFF5F5' : '#FFFFFF',
              }}
            >
              <span className="text-[11px] font-medium text-[#333] flex items-center">
                {agent.status === 'danger' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse" />}
                {agent.name}
              </span>
              <span className="text-[11px] font-bold text-center" style={{ color: style.color }}>
                {agent.fycRate}%
              </span>
              <span className="text-[11px] text-center text-[#666]">{agent.activity}%</span>
              <span className="text-[11px] text-center text-[#666]">{agent.conversion}%</span>
              <span className="flex justify-center">
                <span
                  className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                  style={{ color: style.color, background: style.bg }}
                >
                  {style.label}
                </span>
              </span>
            </div>
          );
        })}

        {/* Tip */}
        <div className="bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] rounded-[12px] p-2.5">
          <p className="text-[10px] text-[#1D4ED8]">💡 红色标记代理人需要重点关注，点击可查看详情</p>
        </div>
      </div>
    </div>
  );
}
