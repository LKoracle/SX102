import { teamMembers } from '../../data/team';

interface MemberCoachingPlanCardProps {
  data: Record<string, unknown>;
}

export function MemberCoachingPlanCard({ data }: MemberCoachingPlanCardProps) {
  const memberId = data.memberId as string;
  const topics = (data.topics as string[]) || [];
  const suggestedDate = (data.suggestedDate as string) || '';
  const duration = (data.duration as string) || '30分钟';

  const member = teamMembers.find((m) => m.id === memberId);

  if (!member) {
    return <div className="text-center text-gray-400 py-4">未找到成员信息</div>;
  }

  // 格式化日期显示
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${month}月${day}日 ${weekDays[date.getDay()]}`;
  };

  const metrics = member.monthlyAchieved !== undefined && member.monthlyTarget !== undefined
    ? Math.round((member.monthlyAchieved / member.monthlyTarget) * 100)
    : 0;

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">💼 面谈计划详情</h3>
      </div>

      <div className="p-3 space-y-3">
        {/* 成员信息标题 */}
        <div className="flex items-start gap-2 pb-2 border-b border-gray-100">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {member.avatar}
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-[#333]">{member.name}</p>
            <p className="text-[12px] text-[#666]">{member.level}</p>
          </div>
        </div>

        {/* 本月业绩 */}
        <div className="bg-gradient-to-r from-[#f0f4ff] to-[#f8f9ff] rounded-[14px] p-2.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-[#333]">本月业绩进度</span>
            <span className="text-[13px] font-bold text-[#667eea]">{metrics}%</span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.max(metrics, 2)}%`,
                background: 'linear-gradient(90deg, #667eea88, #667eea)',
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-[11px] text-[#666]">
            <span>已实现：¥{member.monthlyAchieved?.toLocaleString()}</span>
            <span>目标：¥{member.monthlyTarget?.toLocaleString()}</span>
          </div>
        </div>

        {/* 主要问题 */}
        {member.issues && member.issues.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[12px] font-medium text-[#DC2626]">⚠️ 需要关注的问题</p>
            <div className="space-y-1">
              {member.issues.slice(0, 2).map((issue: string, i: number) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-[11px] text-[#DC2626] flex-shrink-0">•</span>
                  <span className="text-[11px] text-[#666]">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 面谈主题 */}
        <div className="space-y-2">
          <p className="text-[12px] font-medium text-[#333]">📌 建议面谈主题</p>
          <div className="flex flex-wrap gap-1.5">
            {topics.map((topic: string, i: number) => (
              <span
                key={i}
                className="px-2.5 py-1.5 rounded-[8px] bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 text-[12px] font-medium text-[#667eea] border border-[#667eea]/20"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* 建议日期 */}
        <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FEF0E2] rounded-[14px] p-2.5">
          <p className="text-[12px] font-medium text-[#92400E] mb-1">📅 建议面谈时间</p>
          <p className="text-[13px] font-semibold text-[#D97706]">{formatDate(suggestedDate)}</p>
          <p className="text-[11px] text-[#92400E] mt-1">预计时长：{duration}</p>
        </div>

        {/* 面谈目标 */}
        <div className="bg-gradient-to-r from-[#E0F2FE] to-[#F0F9FF] rounded-[14px] p-2.5">
          <p className="text-[12px] font-medium text-[#0369A1] mb-1">🎯 面谈目标</p>
          <ul className="text-[11px] text-[#0c4a6e] space-y-1">
            <li>✓ 分析本月业绩情况，找出关键问题</li>
            <li>✓ 制定详细的改善计划</li>
            <li>✓ 确认下月的目标和行动</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
