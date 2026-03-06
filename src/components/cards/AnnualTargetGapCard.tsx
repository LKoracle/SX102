import React from 'react';

interface AnnualGapAgent {
  id: string;
  name: string;
  group: string;
  avatar: string;
  examType: string;
  current: number;
  target: number;
  gap: number;
  gapUnit: string;
  trackingPlan: string;
}

interface AnnualTargetGapData {
  title: string;
  totalGapCount: number;
  agents: AnnualGapAgent[];
}

export function AnnualTargetGapCard({ data }: { data: Record<string, unknown> }) {
  const d = data as unknown as AnnualTargetGapData;
  const [expandedId, setExpandedId] = React.useState<string>();

  const getExamTypeColor = (examType: string) => {
    const colors: Record<string, string> = {
      综合排名: 'bg-purple-100 text-purple-700',
      个险件数: 'bg-blue-100 text-blue-700',
      新人留存: 'bg-green-100 text-green-700',
      客户满意度: 'bg-pink-100 text-pink-700',
    };
    return colors[examType] || 'bg-gray-100 text-gray-700';
  };

  const getGapSeverity = (gap: number, target: number) => {
    const rate = (gap / target) * 100;
    if (rate > 20) return 'danger';
    if (rate > 10) return 'warning';
    return 'normal';
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'danger') return 'border-l-red-500';
    if (severity === 'warning') return 'border-l-amber-500';
    return 'border-l-green-500';
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📋 {d.title}</h3>
        <p className="text-white/80 text-[11px] mt-0.5">共 {d.totalGapCount} 人需跟踪</p>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2 max-h-[400px] overflow-y-auto">
        {d.agents.map((agent) => {
          const severity = getGapSeverity(agent.gap, agent.target);
          const isExpanded = expandedId === agent.id;

          return (
            <div
              key={agent.id}
              className={`rounded-lg border-l-4 ${getSeverityColor(severity)} bg-gray-50 border border-gray-100 overflow-hidden transition-all`}
            >
              {/* Collapsed View */}
              <button
                onClick={() => setExpandedId(isExpanded ? undefined : agent.id)}
                className="w-full p-2.5 text-left hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold flex items-center gap-1.5 text-[12px] text-[#333]">
                      <span className="text-base">{agent.avatar}</span>
                      {agent.name}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${getExamTypeColor(agent.examType)}`}>
                        {agent.examType}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#999] mt-0.5">{agent.group}</div>
                  </div>
                  <div className={`font-bold text-[11px] ${severity === 'danger' ? 'text-red-600' : severity === 'warning' ? 'text-amber-600' : 'text-green-600'}`}>
                    {agent.gap} {agent.gapUnit}
                  </div>
                  <span className="text-sm text-[#999]">{isExpanded ? '▼' : '▶'}</span>
                </div>
              </button>

              {/* Expanded View */}
              {isExpanded && (
                <div className="px-2.5 py-2.5 border-t border-gray-200 bg-white space-y-2 text-[11px]">
                  <div className="grid grid-cols-3 gap-2 pb-2 border-b border-gray-200">
                    <div>
                      <div className="text-[10px] text-[#999] mb-0.5">当前进度</div>
                      <div className="font-bold text-[12px] text-[#333]">{agent.current}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#999] mb-0.5">目标值</div>
                      <div className="font-bold text-[12px] text-[#333]">{agent.target}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#999] mb-0.5">差距</div>
                      <div className="font-bold text-[12px] text-[#DC2626]">{agent.gap}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#7C3AED] font-medium mb-1">📋 追踪计划</div>
                    <div className="leading-relaxed text-[#666]">{agent.trackingPlan}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200 text-center text-[11px] text-[#999]">
        ✓ 已生成追踪方案，建议本周启动一对一辅导
      </div>
    </div>
  );
}
