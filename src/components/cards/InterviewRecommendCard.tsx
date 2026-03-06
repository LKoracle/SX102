import { useState } from 'react';

interface TalkingPoint {
  phase: string;
  icon: string;
  content: string;
}

interface RecommendedAgent {
  name: string;
  group: string;
  avatar: string;
  milestone: string;
  priority: 'high' | 'medium';
  talkingPoints: TalkingPoint[];
}

interface InterviewRecommendCardProps {
  data: Record<string, unknown>;
}

export function InterviewRecommendCard({ data }: InterviewRecommendCardProps) {
  const title = (data.title as string) || '推荐面谈对象';
  const agents = (data.agents as RecommendedAgent[]) || [];
  const [expandedAgent, setExpandedAgent] = useState<number | null>(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getPriorityStyle = (priority: string) => {
    if (priority === 'high') {
      return { color: '#DC2626', bg: '#FEE2E2', label: '优先' };
    }
    return { color: '#D97706', bg: '#FEF3C7', label: '建议' };
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">💬 {title}</h3>
      </div>

      <div className="p-3 space-y-2 max-h-[500px] overflow-y-auto">
        {agents.map((agent, i) => {
          const isExpanded = expandedAgent === i;
          const priorityStyle = getPriorityStyle(agent.priority);

          return (
            <div
              key={i}
              className="border border-gray-100 rounded-[12px] overflow-hidden"
            >
              {/* 代理人信息头部 */}
              <button
                onClick={() => setExpandedAgent(isExpanded ? null : i)}
                className="w-full px-3 py-2.5 flex items-center gap-2.5 hover:bg-gray-50 transition-colors"
              >
                {/* 头像 */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">
                  {agent.avatar}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-semibold text-[#333]">{agent.name}</span>
                    <span className="text-[9px] text-[#999]">{agent.group}</span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                      style={{ color: priorityStyle.color, background: priorityStyle.bg }}
                    >
                      {priorityStyle.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#7C3AED] font-medium mt-0.5">{agent.milestone}</p>
                </div>

                <span className="text-[10px] text-[#999] flex-shrink-0">
                  {isExpanded ? '▼' : '▶'}
                </span>
              </button>

              {/* 面谈话术 */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-3 py-2.5 space-y-2">
                  {agent.talkingPoints.map((tp, j) => (
                    <div
                      key={j}
                      className="bg-gradient-to-r from-[#F3E8FF]/50 to-[#FCE7F3]/50 rounded-[10px] p-2.5 border-l-3"
                      style={{ borderLeftWidth: '3px', borderLeftColor: '#8B5CF6' }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-[#6B21A8] flex items-center gap-1">
                          <span>{tp.icon}</span> {tp.phase}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(tp.content);
                          }}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-white/70 text-[#7C3AED] hover:bg-white transition-colors"
                        >
                          复制
                        </button>
                      </div>
                      <p className="text-[11px] text-[#4A1D8C] leading-relaxed">{tp.content}</p>
                    </div>
                  ))}

                  {/* 一键复制全部 */}
                  <button
                    onClick={() => {
                      const allText = agent.talkingPoints
                        .map((tp) => `【${tp.phase}】${tp.content}`)
                        .join('\n\n');
                      copyToClipboard(allText);
                    }}
                    className="w-full py-2 rounded-[10px] text-[11px] font-medium text-[#7C3AED] bg-[#F3E8FF] hover:bg-[#E9D5FF] transition-colors"
                  >
                    📋 复制全部话术
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* 面谈建议 */}
        <div className="bg-gradient-to-r from-[#ECFDF5] to-[#DBEAFE] rounded-[12px] p-2.5">
          <p className="text-[11px] text-[#059669] font-medium">✨ 面谈小贴士</p>
          <ul className="text-[10px] text-[#047857] mt-1 space-y-0.5">
            <li>• 先肯定成绩，再指出差距，保持正向激励</li>
            <li>• 用具体数据说话，避免模糊表达</li>
            <li>• 结束时确定具体行动计划和时间节点</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
