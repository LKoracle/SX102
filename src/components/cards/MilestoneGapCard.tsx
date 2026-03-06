interface AgentGap {
  name: string;
  group: string;
  avatar: string;
  current: number;
  target: number;
  gap: number;
  gapUnit: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  suggestion: string;
}

interface MilestoneCategory {
  type: '达钻' | '新人津贴' | '激励方案';
  icon: string;
  count: number;
  agents: AgentGap[];
}

interface MilestoneGapCardProps {
  data: Record<string, unknown>;
}

export function MilestoneGapCard({ data }: MilestoneGapCardProps) {
  const title = (data.title as string) || '月末达标预警';
  const deadline = (data.deadline as string) || '';
  const categories = (data.categories as MilestoneCategory[]) || [];
  const summary = (data.summary as string) || '';

  const getDifficultyStyle = (difficulty: string) => {
    const config: Record<string, { color: string; bg: string; label: string }> = {
      easy: { color: '#059669', bg: '#DCFCE7', label: '易达' },
      moderate: { color: '#D97706', bg: '#FEF3C7', label: '中等' },
      hard: { color: '#DC2626', bg: '#FEE2E2', label: '困难' },
    };
    return config[difficulty] || config.moderate;
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">⚠️ {title}</h3>
        {deadline && <p className="text-white/80 text-[11px] mt-0.5">⏰ {deadline}</p>}
      </div>

      <div className="p-3 space-y-3 max-h-[500px] overflow-y-auto">
        {categories.map((cat, ci) => (
          <div key={ci}>
            {/* 分类标题 */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[14px]">{cat.icon}</span>
              <span className="text-[12px] font-semibold text-[#333]">{cat.type}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#F3E8FF] text-[#7C3AED] text-[10px] font-medium">
                {cat.count}人
              </span>
            </div>

            {/* 人员列表 */}
            <div className="space-y-2">
              {cat.agents.map((agent, ai) => {
                const diffStyle = getDifficultyStyle(agent.difficulty);
                const progressRate = Math.round((agent.current / agent.target) * 100);

                return (
                  <div
                    key={ai}
                    className="border border-gray-100 rounded-[12px] p-2.5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {/* 头像 */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#D946EF] flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
                        {agent.avatar}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12px] font-semibold text-[#333]">{agent.name}</span>
                          <span className="text-[9px] text-[#999]">{agent.group}</span>
                        </div>
                        <p className="text-[10px] text-[#DC2626] font-medium">
                          差 {agent.gap} {agent.gapUnit}
                        </p>
                      </div>

                      {/* 难度 */}
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium flex-shrink-0"
                        style={{ color: diffStyle.color, background: diffStyle.bg }}
                      >
                        {diffStyle.label}
                      </span>
                    </div>

                    {/* 进度条 */}
                    <div className="mb-1.5">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[9px] text-[#999]">当前进度</span>
                        <span className="text-[10px] font-bold text-[#7C3AED]">{progressRate}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(progressRate, 100)}%`,
                            background: 'linear-gradient(90deg, #8B5CF688, #D946EF)',
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-0.5 text-[9px] text-[#999]">
                        <span>{agent.current.toLocaleString()}</span>
                        <span>目标 {agent.target.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* 建议 */}
                    <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FEF9C3] rounded-[8px] px-2 py-1.5">
                      <p className="text-[10px] text-[#92400E]">💡 {agent.suggestion}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {summary && (
          <div className="bg-gradient-to-r from-[#F3E8FF] to-[#FCE7F3] rounded-[12px] p-2.5">
            <p className="text-[11px] text-[#6B21A8] font-medium">📌 {summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
