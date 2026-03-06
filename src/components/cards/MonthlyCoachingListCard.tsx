import { teamMembers } from '../../data/team';

interface MonthlyCoachingListCardProps {
  data: Record<string, unknown>;
}

export function MonthlyCoachingListCard({ data }: MonthlyCoachingListCardProps) {
  const memberIds = (data.members as string[]) || [];
  const month = (data.month as string) || '本月';
  const tips = (data.tips as string[]) || [];

  // 获取需要面谈的团队成员
  const coachingMembers = memberIds
    .map((id) => teamMembers.find((m) => m.id === id))
    .filter(Boolean);

  // 按优先级排序（高 > 中 > 低）
  const priorityOrder: Record<string, number> = {
    high: 1,
    medium: 2,
    low: 3,
  };

  const sortedMembers = coachingMembers.sort((a: any, b: any) => {
    const aPriority = a?.coachingPriority ? priorityOrder[a.coachingPriority] : 999;
    const bPriority = b?.coachingPriority ? priorityOrder[b.coachingPriority] : 999;
    return aPriority - bPriority;
  });

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, { label: string; color: string; bg: string }> = {
      high: { label: '高优先级', color: '#DC2626', bg: '#FEE2E2' },
      medium: { label: '中优先级', color: '#D97706', bg: '#FEF3C7' },
      low: { label: '低优先级', color: '#0891B2', bg: '#CFFAFE' },
    };
    return config[priority] || config.medium;
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#F59E0B] to-[#EC4899] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📋 {month}推荐面谈名单</h3>
      </div>

      <div className="p-3 space-y-3">
        {/* 面谈提示 */}
        {tips.length > 0 && (
          <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FECACA] rounded-xl p-2.5 flex items-start gap-2">
            <span className="text-[16px] leading-none mt-0.5">💡</span>
            <div>
              <p className="text-[12px] font-medium text-[#92400E] space-y-1">
                {tips.map((tip, i) => (
                  <div key={i}>• {tip}</div>
                ))}
              </p>
            </div>
          </div>
        )}

        {/* 成员列表 */}
        <div className="space-y-2">
          {sortedMembers.map((member: any) => {
            const priority = member?.coachingPriority || 'medium';
            const badge = getPriorityBadge(priority);
            const metrics = member.monthlyAchieved !== undefined && member.monthlyTarget !== undefined
              ? Math.round((member.monthlyAchieved / member.monthlyTarget) * 100)
              : 0;

            return (
              <div
                key={member.id}
                className="border border-gray-100 rounded-[14px] p-2.5 hover:border-[#3B82F6]/30 hover:bg-gradient-to-r hover:from-[#f8f9ff] hover:to-transparent transition-all cursor-pointer"
              >
                {/* 成员基本信息 */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                      }}
                    >
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#333]">{member.name}</p>
                      <p className="text-[11px] text-[#999]">{member.level}</p>
                    </div>
                  </div>
                  <span
                    className="px-2 py-1 rounded text-[11px] font-medium"
                    style={{ color: badge.color, background: badge.bg }}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* 业绩达成率 */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-[#666]">本月完成率</span>
                    <span className="text-[12px] font-bold text-[#3B82F6]">{metrics}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.max(metrics, 2)}%`,
                        background: 'linear-gradient(90deg, #3B82F688, #3B82F6)',
                      }}
                    />
                  </div>
                </div>

                {/* 推荐主题 */}
                {member.coachingTopics && member.coachingTopics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {member.coachingTopics.map((topic: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] bg-[#f0f4ff] text-[#3B82F6]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 统计信息 */}
        <div className="bg-gradient-to-r from-[#f0f4ff] to-[#f8f0ff] rounded-xl p-2.5">
          <p className="text-[12px] text-[#3B82F6] font-medium">
            共需面谈 <span className="font-bold text-[14px]">{sortedMembers.length}</span> 位成员
          </p>
        </div>
      </div>
    </div>
  );
}
