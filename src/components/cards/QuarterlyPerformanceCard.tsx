interface QuarterlyMetric {
  metric: string;
  q3Current: number;
  q3Target: number;
  ytdCurrent: number;
  ytdTarget: number;
  trend: 'up' | 'equal' | 'down';
}

interface QuarterlyPerformanceData {
  title: string;
  quarter: string;
  metrics: QuarterlyMetric[];
}

export function QuarterlyPerformanceCard({ data }: { data: Record<string, unknown> }) {
  const d = data as unknown as QuarterlyPerformanceData;

  const getAchievementRate = (current: number, target: number) => {
    const rate = ((current / target) * 100).toFixed(0);
    return parseInt(rate);
  };

  const getRateColor = (rate: number) => {
    if (rate >= 100) return 'text-green-600 font-bold';
    if (rate >= 80) return 'text-amber-600 font-bold';
    return 'text-red-600 font-bold';
  };

  const getRateBg = (rate: number) => {
    if (rate >= 100) return 'bg-green-50';
    if (rate >= 80) return 'bg-amber-50';
    return 'bg-red-50';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '→';
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E40AF] to-[#0369A1] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📊 {d.title}</h3>
        <p className="text-white/80 text-[11px] mt-0.5">{d.quarter}</p>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2 max-h-[400px] overflow-y-auto">
        {/* Table Header */}
        <div className="mb-2 text-[10px] font-bold text-[#6B7280] grid grid-cols-5 gap-2">
          <div>指标</div>
          <div className="text-center">本季度</div>
          <div className="text-center">YTD</div>
          <div className="text-center">达成率</div>
          <div className="text-center">趋势</div>
        </div>

        {/* Metrics Rows */}
        {d.metrics.map((m, idx) => {
          const q3Rate = getAchievementRate(m.q3Current, m.q3Target);
          const ytdRate = getAchievementRate(m.ytdCurrent, m.ytdTarget);
          const avgRate = Math.round((q3Rate + ytdRate) / 2);

          return (
            <div
              key={idx}
              className={`grid grid-cols-5 gap-2 p-2 rounded-lg text-[11px] ${getRateBg(avgRate)}`}
            >
              <div className="font-medium truncate text-[#333]">{m.metric}</div>
              <div className="text-center text-[10px] text-[#666]">
                {m.q3Current}/{m.q3Target}
              </div>
              <div className="text-center text-[10px] text-[#666]">
                {m.ytdCurrent}/{m.ytdTarget}
              </div>
              <div className={`text-center font-bold ${getRateColor(avgRate)}`}>{avgRate}%</div>
              <div className="text-center">{getTrendIcon(m.trend)}</div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-3 pt-3 border-t border-gray-200 px-3 pb-3">
        <div className="text-[11px] text-[#0369A1] font-medium mb-1">💡 综合分析</div>
        <div className="text-[11px] leading-relaxed text-[#666]">
          营业部年度整体达成率偏低，Q3环比有所下滑。建议加强第二、四组重点突破，优化激励政策，确保Q4快速恢复增长。
        </div>
      </div>
    </div>
  );
}
