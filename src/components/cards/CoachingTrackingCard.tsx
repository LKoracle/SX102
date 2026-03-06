interface ExecutionItem {
  action: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface CoachingTrackingCardProps {
  data: Record<string, unknown>;
}

export function CoachingTrackingCard({ data }: CoachingTrackingCardProps) {
  const memberName = (data.memberName as string) || '团队成员';
  const executions = (data.executions as ExecutionItem[]) || [
    {
      action: '每周触客50+人，记录所有客户沟通',
      deadline: '2025-03-12',
      status: 'in-progress',
    },
    {
      action: '完成3次客户深度面访，准备方案',
      deadline: '2025-03-15',
      status: 'pending',
    },
    {
      action: '参加异议处理话术培训，提交学习笔记',
      deadline: '2025-03-10',
      status: 'completed',
    },
  ];

  const progressData = {
    incomeTarget: 350000,
    incomeAchieved: 150000,
    visitTarget: 15,
    visitCompleted: 8,
    conversionTarget: 25,
    conversionAchieved: 18,
  };

  const getStatusColor = (status: string) => {
    const config: Record<string, { color: string; bg: string; label: string }> = {
      pending: { color: '#0891B2', bg: '#CFFAFE', label: '待执行' },
      'in-progress': { color: '#D97706', bg: '#FEF3C7', label: '执行中' },
      completed: { color: '#059669', bg: '#DCFCE7', label: '已完成' },
    };
    return config[status] || config.pending;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#10B981] to-[#059669] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📊 面谈后执行追踪</h3>
      </div>

      <div className="p-3 space-y-3 max-h-[450px] overflow-y-auto">
        {/* 成员信息 */}
        <div className="bg-gradient-to-r from-[#DCFCE7] to-[#F0FDF4] rounded-[14px] p-2.5">
          <p className="text-[12px] font-medium text-[#065F46] mb-1">跟踪对象</p>
          <p className="text-[13px] font-bold text-[#059669]">{memberName}</p>
        </div>

        {/* 达成进度看板 */}
        <div className="space-y-2">
          <p className="text-[12px] font-medium text-[#333]">📈 目标达成情况</p>

          <div className="space-y-1.5">
            {/* 收入进度 */}
            <div className="border border-[#DCFCE7] rounded-[10px] p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-[#059669]">💰 月收入</span>
                <span className="text-[11px] font-bold text-[#059669]">
                  {Math.round((progressData.incomeAchieved / progressData.incomeTarget) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-[#DCFCE7] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min((progressData.incomeAchieved / progressData.incomeTarget) * 100, 100)}%`,
                    background: 'linear-gradient(90deg, #10B98188, #10B981)',
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-1 text-[10px] text-[#666]">
                <span>已达：¥{(progressData.incomeAchieved / 10000).toFixed(1)}万</span>
                <span>目标：¥{(progressData.incomeTarget / 10000).toFixed(1)}万</span>
              </div>
            </div>

            {/* 拜访进度 */}
            <div className="border border-[#DCFCE7] rounded-[10px] p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-[#059669]">🤝 客户面访</span>
                <span className="text-[11px] font-bold text-[#059669]">
                  {progressData.visitCompleted}/{progressData.visitTarget}
                </span>
              </div>
              <div className="h-1.5 bg-[#DCFCE7] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min((progressData.visitCompleted / progressData.visitTarget) * 100, 100)}%`,
                    background: 'linear-gradient(90deg, #10B98188, #10B981)',
                  }}
                />
              </div>
            </div>

            {/* 转化进度 */}
            <div className="border border-[#DCFCE7] rounded-[10px] p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-[#059669]">📊 成交转化</span>
                <span className="text-[11px] font-bold text-[#059669]">{progressData.conversionAchieved}%</span>
              </div>
              <div className="h-1.5 bg-[#DCFCE7] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progressData.conversionAchieved}%`,
                    background: 'linear-gradient(90deg, #10B98188, #10B981)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 执行行动项 */}
        <div className="space-y-1.5">
          <p className="text-[12px] font-medium text-[#333]">✅ 执行行动追踪</p>

          {executions.map((exec: ExecutionItem, i: number) => {
            const statusConfig = getStatusColor(exec.status);
            return (
              <div key={i} className="border border-gray-100 rounded-[10px] p-2">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex-1">
                    <p className="text-[11px] font-medium text-[#333]">{exec.action}</p>
                    <p className="text-[10px] text-[#999] mt-0.5">截止: {formatDate(exec.deadline)}</p>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap"
                    style={{ color: statusConfig.color, background: statusConfig.bg }}
                  >
                    {statusConfig.label}
                  </span>
                </div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: exec.status === 'pending' ? '0%' : exec.status === 'in-progress' ? '50%' : '100%',
                      background: statusConfig.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 辅导建议 */}
        <div className="bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] rounded-[12px] p-2.5 space-y-1.5">
          <p className="text-[12px] font-bold text-[#059669]">💡 辅导提升建议</p>
          <ul className="text-[10px] text-[#047857] space-y-0.5">
            <li>• 本周重点关注客户拜访完成，目标8次</li>
            <li>• 在异议处理环节投入精力，预计可提升转化率5-8%</li>
            <li>• 建议周四参加话术培训，周五进行演练</li>
            <li>• 下周一进行一对一跟进面谈，评估执行进展</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
