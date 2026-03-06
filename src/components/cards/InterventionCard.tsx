import { useState } from 'react';

interface InterventionItem {
  type: '面谈' | '追踪' | '辅导' | '陪访';
  icon: string;
  target: string;
  reason: string;
  suggestedDate: string;
  priority: 'urgent' | 'normal';
}

interface InterventionCardProps {
  data: Record<string, unknown>;
}

export function InterventionCard({ data }: InterventionCardProps) {
  const groupName = (data.groupName as string) || '';
  const leader = (data.leader as string) || '';
  const interventions = (data.interventions as InterventionItem[]) || [];
  const trackingEnabled = (data.trackingEnabled as boolean) ?? true;
  const [tracked, setTracked] = useState(false);

  const getPriorityStyle = (priority: string) => {
    if (priority === 'urgent') {
      return { color: '#DC2626', bg: '#FEE2E2', label: '紧急' };
    }
    return { color: '#D97706', bg: '#FEF3C7', label: '一般' };
  };

  const getTypeColor = (type: string) => {
    const config: Record<string, string> = {
      '面谈': '#7C3AED',
      '追踪': '#0891B2',
      '辅导': '#059669',
      '陪访': '#D97706',
    };
    return config[type] || '#6B7280';
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📋 干预建议</h3>
        <p className="text-white/80 text-[11px] mt-0.5">{groupName} · {leader}</p>
      </div>

      <div className="p-3 space-y-2 max-h-[450px] overflow-y-auto">
        {interventions.map((item, i) => {
          const priorityStyle = getPriorityStyle(item.priority);
          const typeColor = getTypeColor(item.type);

          return (
            <div
              key={i}
              className="border border-gray-100 rounded-[12px] p-2.5"
              style={{ borderLeftWidth: '3px', borderLeftColor: typeColor }}
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px]">{item.icon}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
                        style={{ background: typeColor }}
                      >
                        {item.type}
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                        style={{ color: priorityStyle.color, background: priorityStyle.bg }}
                      >
                        {priorityStyle.label}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-[#999] flex-shrink-0">{item.suggestedDate}</span>
              </div>

              <p className="text-[11px] font-medium text-[#333] mb-0.5">
                对象：{item.target}
              </p>
              <p className="text-[10px] text-[#666] leading-relaxed">{item.reason}</p>
            </div>
          );
        })}

        {/* 一键追踪按钮 */}
        {trackingEnabled && (
          <button
            onClick={() => setTracked(true)}
            disabled={tracked}
            className="w-full py-2.5 rounded-[12px] text-[13px] font-semibold text-white transition-all"
            style={{
              background: tracked
                ? '#10B981'
                : 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
              opacity: tracked ? 0.9 : 1,
            }}
          >
            {tracked ? '✅ 已启动追踪' : '🔔 一键追踪'}
          </button>
        )}
      </div>
    </div>
  );
}
