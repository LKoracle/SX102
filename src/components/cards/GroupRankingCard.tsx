interface GroupItem {
  name: string;
  leader: string;
  rank: number;
  achieveRate: number;
  fyc: number;
  headcount: number;
  status: 'excellent' | 'normal' | 'warning' | 'danger';
  trend: 'up' | 'down' | 'flat';
}

interface GroupRankingCardProps {
  data: Record<string, unknown>;
}

export function GroupRankingCard({ data }: GroupRankingCardProps) {
  const title = (data.title as string) || '各组业绩排名';
  const groups = (data.groups as GroupItem[]) || [];
  const summary = (data.summary as string) || '';

  const getStatusStyle = (status: string) => {
    const config: Record<string, { color: string; bg: string; label: string }> = {
      excellent: { color: '#059669', bg: '#DCFCE7', label: '优秀' },
      normal: { color: '#0891B2', bg: '#CFFAFE', label: '正常' },
      warning: { color: '#D97706', bg: '#FEF3C7', label: '预警' },
      danger: { color: '#DC2626', bg: '#FEE2E2', label: '异常' },
    };
    return config[status] || config.normal;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { bg: '#FEF3C7', color: '#D97706', border: '#FCD34D' };
    if (rank === 2) return { bg: '#F1F5F9', color: '#64748B', border: '#CBD5E1' };
    if (rank === 3) return { bg: '#FED7AA', color: '#C2410C', border: '#FDBA74' };
    return { bg: '#F9FAFB', color: '#6B7280', border: '#E5E7EB' };
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return { icon: '↑', color: '#059669' };
    if (trend === 'down') return { icon: '↓', color: '#DC2626' };
    return { icon: '→', color: '#6B7280' };
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#6366F1] to-[#818CF8] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🏆 {title}</h3>
      </div>

      <div className="p-3 space-y-2 max-h-[400px] overflow-y-auto">
        {groups.map((group, i) => {
          const statusStyle = getStatusStyle(group.status);
          const rankStyle = getRankStyle(group.rank);
          const trendInfo = getTrendIcon(group.trend);

          return (
            <div
              key={i}
              className="border border-gray-100 rounded-[12px] p-2.5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-2.5 mb-2">
                {/* 排名 */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0"
                  style={{
                    background: rankStyle.bg,
                    color: rankStyle.color,
                    border: `1.5px solid ${rankStyle.border}`,
                  }}
                >
                  {group.rank}
                </div>

                {/* 组名 & 组长 */}
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-[#333] truncate">{group.name}</p>
                  <p className="text-[10px] text-[#999]">{group.leader} · {group.headcount}人</p>
                </div>

                {/* 状态 */}
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-medium flex-shrink-0"
                  style={{ color: statusStyle.color, background: statusStyle.bg }}
                >
                  {statusStyle.label}
                </span>
              </div>

              {/* 达成率进度条 */}
              <div className="mb-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-[#666]">FYC达成率</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold" style={{ color: statusStyle.color }}>
                      {group.achieveRate}%
                    </span>
                    <span className="text-[10px] font-medium" style={{ color: trendInfo.color }}>
                      {trendInfo.icon}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(group.achieveRate, 100)}%`,
                      background:
                        group.achieveRate >= 80
                          ? 'linear-gradient(90deg, #059669, #10B981)'
                          : group.achieveRate >= 60
                          ? 'linear-gradient(90deg, #D97706, #F59E0B)'
                          : 'linear-gradient(90deg, #DC2626, #EF4444)',
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#999]">
                <span>FYC：¥{(group.fyc / 10000).toFixed(1)}万</span>
              </div>
            </div>
          );
        })}

        {summary && (
          <div className="bg-gradient-to-r from-[#EDE9FE] to-[#E0E7FF] rounded-[12px] p-2.5 mt-2">
            <p className="text-[11px] text-[#4338CA] font-medium">💡 {summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
