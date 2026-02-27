interface TeamMemberSummary {
  name: string;
  incomeRate: number;
  visitCount: number;
  status: 'excellent' | 'good' | 'needs-attention';
}

interface ManagerSummaryCardProps {
  data: Record<string, unknown>;
}

export function ManagerSummaryCard({ data }: ManagerSummaryCardProps) {
  const period = (data.period as string) || '本周';
  const membersSummary = (data.members as TeamMemberSummary[]) || [
    { name: '李明', incomeRate: 43, visitCount: 5, status: 'needs-attention' },
    { name: '小林', incomeRate: 80, visitCount: 12, status: 'good' },
    { name: '小周', incomeRate: 45, visitCount: 6, status: 'needs-attention' },
    { name: '小吴', incomeRate: 110, visitCount: 18, status: 'excellent' },
  ];

  const teamMetrics = {
    totalIncome: 1280000,
    incomePlan: 1400000,
    totalVisits: 41,
    visitPlan: 50,
    averageConversion: 28,
  };

  const challenges = ['李明拜访量仍然不足', '整体转化率还需提升', '新人培育进度滞后'];
  const highlights = ['小吴业绩突出，可成为样板', '团队气氛良好，执行力强', '客户满意度保持高位'];

  const getStatusColor = (status: string) => {
    const config: Record<string, { color: string; bg: string }> = {
      excellent: { color: '#059669', bg: '#DCFCE7' },
      good: { color: '#0891B2', bg: '#CFFAFE' },
      'needs-attention': { color: '#DC2626', bg: '#FEE2E2' },
    };
    return config[status] || config.good;
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#0891B2] to-[#0EA5E9] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📈 主管工作总结</h3>
      </div>

      <div className="p-3 space-y-3 max-h-[450px] overflow-y-auto">
        {/* 时间周期 */}
        <div className="bg-gradient-to-r from-[#E0F7FA] to-[#E0F2FE] rounded-[14px] p-2.5">
          <p className="text-[12px] font-medium text-[#0369A1] mb-1">📅 统计周期</p>
          <p className="text-[13px] font-bold text-[#0EA5E9]">{period}</p>
        </div>

        {/* 团队业绩概览 */}
        <div className="space-y-1.5">
          <p className="text-[12px] font-medium text-[#333]">📊 团队业绩总览</p>

          {/* 收入情况 */}
          <div className="border border-[#CFFAFE] rounded-[10px] p-2 bg-gradient-to-r from-[#E0F7FA]/30 to-[#E0F2FE]/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium text-[#0369A1]">💰 团队总收入</span>
              <span className="text-[11px] font-bold text-[#0EA5E9]">
                {Math.round((teamMetrics.totalIncome / teamMetrics.incomePlan) * 100)}%
              </span>
            </div>
            <div className="h-1.5 bg-[#CFFAFE] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min((teamMetrics.totalIncome / teamMetrics.incomePlan) * 100, 100)}%`,
                  background: 'linear-gradient(90deg, #0891B288, #0EA5E9)',
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-1 text-[10px] text-[#666]">
              <span>已达：¥{(teamMetrics.totalIncome / 10000).toFixed(1)}万</span>
              <span>计划：¥{(teamMetrics.incomePlan / 10000).toFixed(1)}万</span>
            </div>
          </div>

          {/* 拜访情况 */}
          <div className="border border-[#CFFAFE] rounded-[10px] p-2 bg-gradient-to-r from-[#E0F7FA]/30 to-[#E0F2FE]/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium text-[#0369A1]">🤝 团队拜访</span>
              <span className="text-[11px] font-bold text-[#0EA5E9]">{teamMetrics.totalVisits}/{teamMetrics.visitPlan}</span>
            </div>
            <div className="h-1.5 bg-[#CFFAFE] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min((teamMetrics.totalVisits / teamMetrics.visitPlan) * 100, 100)}%`,
                  background: 'linear-gradient(90deg, #0891B288, #0EA5E9)',
                }}
              />
            </div>
          </div>

          {/* 平均转化率 */}
          <div className="border border-[#CFFAFE] rounded-[10px] p-2 bg-gradient-to-r from-[#E0F7FA]/30 to-[#E0F2FE]/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium text-[#0369A1]">📊 平均转化率</span>
              <span className="text-[11px] font-bold text-[#0EA5E9]">{teamMetrics.averageConversion}%</span>
            </div>
            <div className="h-1.5 bg-[#CFFAFE] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${teamMetrics.averageConversion}%`,
                  background: 'linear-gradient(90deg, #0891B288, #0EA5E9)',
                }}
              />
            </div>
          </div>
        </div>

        {/* 成员个人成绩 */}
        <div className="space-y-1.5">
          <p className="text-[12px] font-medium text-[#333]">👥 成员个人表现</p>

          {membersSummary.map((member: TeamMemberSummary, i: number) => {
            const statusColor = getStatusColor(member.status);
            return (
              <div key={i} className="border border-gray-100 rounded-[10px] p-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex-1">
                    <p className="text-[11px] font-medium text-[#333]">{member.name}</p>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-medium"
                    style={{ color: statusColor.color, background: statusColor.bg }}
                  >
                    {member.status === 'excellent' ? '优秀' : member.status === 'good' ? '良好' : '需关注'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#666]">
                  <span>业绩: {member.incomeRate}%</span>
                  <span>拜访: {member.visitCount}次</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 优秀表现和待改进 */}
        <div className="grid grid-cols-2 gap-2">
          {/* 亮点 */}
          <div className="bg-gradient-to-r from-[#DCFCE7] to-[#F0FDF4] rounded-[10px] p-2">
            <p className="text-[11px] font-bold text-[#059669] mb-1">✅ 本周亮点</p>
            <ul className="text-[9px] text-[#047857] space-y-0.5">
              {highlights.map((h, i) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>

          {/* 待改进 */}
          <div className="bg-gradient-to-r from-[#FEE2E2] to-[#FEF2F2] rounded-[10px] p-2">
            <p className="text-[11px] font-bold text-[#DC2626] mb-1">⚠️ 待改进</p>
            <ul className="text-[9px] text-[#991B1B] space-y-0.5">
              {challenges.map((c, i) => (
                <li key={i}>• {c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 下周行动计划 */}
        <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FECACA] rounded-[12px] p-2.5">
          <p className="text-[11px] font-bold text-[#92400E] mb-1">🎯 下周重点工作</p>
          <ul className="text-[10px] text-[#92400E] space-y-0.5">
            <li>• 针对李明和小周开展一对一面谈，制定改进计划</li>
            <li>• 邀请小吴分享成功经验，帮助其他成员提升</li>
            <li>• 组织团队话术演练，重点突破转化瓶颈</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
