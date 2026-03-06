interface MetricItem {
  actual: number;
  target: number;
  lastMonth?: number;
}

interface DeptPerformanceCardProps {
  data: Record<string, unknown>;
}

export function DeptPerformanceCard({ data }: DeptPerformanceCardProps) {
  const department = (data.department as string) || '阳光营业部';
  const period = (data.period as string) || '本月';
  const metrics = (data.metrics as {
    fyc: MetricItem;
    policyCount: MetricItem;
    activeHeadcount: { actual: number; total: number };
    activityRate: MetricItem;
  }) || {
    fyc: { actual: 970000, target: 1200000, lastMonth: 1050000 },
    policyCount: { actual: 82, target: 100, lastMonth: 90 },
    activeHeadcount: { actual: 37, total: 45 },
    activityRate: { actual: 68, target: 80 },
  };
  const highlights = (data.highlights as string[]) || [];
  const concerns = (data.concerns as string[]) || [];

  const fycRate = Math.round((metrics.fyc.actual / metrics.fyc.target) * 100);
  const fycDelta = metrics.fyc.lastMonth
    ? Math.round(((metrics.fyc.actual - metrics.fyc.lastMonth) / metrics.fyc.lastMonth) * 100)
    : 0;

  const policyRate = Math.round((metrics.policyCount.actual / metrics.policyCount.target) * 100);
  const policyDelta = metrics.policyCount.lastMonth
    ? Math.round(
        ((metrics.policyCount.actual - metrics.policyCount.lastMonth) / metrics.policyCount.lastMonth) * 100
      )
    : 0;

  const activeRate = Math.round((metrics.activeHeadcount.actual / metrics.activeHeadcount.total) * 100);
  const activityRate = metrics.activityRate.actual;

  const getTrendIcon = (delta: number) => {
    if (delta > 0) return { icon: '↑', color: '#059669' };
    if (delta < 0) return { icon: '↓', color: '#DC2626' };
    return { icon: '→', color: '#6B7280' };
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#6366F1] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📊 {department}业绩总览</h3>
        <p className="text-white/80 text-[11px] mt-0.5">{period}</p>
      </div>

      <div className="p-3 space-y-3 max-h-[450px] overflow-y-auto">
        {/* FYC达成 */}
        <div className="border border-[#E9D5FF] rounded-[10px] p-2 bg-gradient-to-r from-[#F3E8FF]/30 to-[#EDE9FE]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-[#6B21A8]">💰 FYC达成</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[#7C3AED]">{fycRate}%</span>
              {(() => {
                const t = getTrendIcon(fycDelta);
                return (
                  <span className="text-[10px] font-medium" style={{ color: t.color }}>
                    {t.icon}{Math.abs(fycDelta)}%
                  </span>
                );
              })()}
            </div>
          </div>
          <div className="h-1.5 bg-[#E9D5FF] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(fycRate, 100)}%`,
                background: 'linear-gradient(90deg, #7C3AED88, #6366F1)',
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-1 text-[10px] text-[#666]">
            <span>已达：¥{(metrics.fyc.actual / 10000).toFixed(1)}万</span>
            <span>目标：¥{(metrics.fyc.target / 10000).toFixed(1)}万</span>
          </div>
        </div>

        {/* 出单量 */}
        <div className="border border-[#E9D5FF] rounded-[10px] p-2 bg-gradient-to-r from-[#F3E8FF]/30 to-[#EDE9FE]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-[#6B21A8]">📄 出单量</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[#7C3AED]">{policyRate}%</span>
              {(() => {
                const t = getTrendIcon(policyDelta);
                return (
                  <span className="text-[10px] font-medium" style={{ color: t.color }}>
                    {t.icon}{Math.abs(policyDelta)}%
                  </span>
                );
              })()}
            </div>
          </div>
          <div className="h-1.5 bg-[#E9D5FF] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(policyRate, 100)}%`,
                background: 'linear-gradient(90deg, #7C3AED88, #6366F1)',
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-1 text-[10px] text-[#666]">
            <span>已达：{metrics.policyCount.actual}件</span>
            <span>目标：{metrics.policyCount.target}件</span>
          </div>
        </div>

        {/* 有效人力 & 活动量 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-[#E9D5FF] rounded-[10px] p-2 bg-gradient-to-r from-[#F3E8FF]/30 to-[#EDE9FE]/30">
            <p className="text-[11px] font-medium text-[#6B21A8] mb-1">👥 有效人力</p>
            <p className="text-[16px] font-bold text-[#7C3AED]">
              {metrics.activeHeadcount.actual}
              <span className="text-[11px] font-normal text-[#666]">/{metrics.activeHeadcount.total}人</span>
            </p>
            <p className="text-[10px] text-[#666]">占比 {activeRate}%</p>
          </div>
          <div className="border border-[#E9D5FF] rounded-[10px] p-2 bg-gradient-to-r from-[#F3E8FF]/30 to-[#EDE9FE]/30">
            <p className="text-[11px] font-medium text-[#6B21A8] mb-1">📈 活动量达成</p>
            <p className="text-[16px] font-bold text-[#7C3AED]">
              {activityRate}%
            </p>
            <p className="text-[10px] text-[#666]">目标 {metrics.activityRate.target}%</p>
          </div>
        </div>

        {/* 亮点 & 问题 */}
        <div className="grid grid-cols-2 gap-2">
          {highlights.length > 0 && (
            <div className="bg-gradient-to-r from-[#DCFCE7] to-[#F0FDF4] rounded-[10px] p-2">
              <p className="text-[11px] font-bold text-[#059669] mb-1">✅ 亮点</p>
              <ul className="text-[9px] text-[#047857] space-y-0.5">
                {highlights.map((h, i) => (
                  <li key={i}>• {h}</li>
                ))}
              </ul>
            </div>
          )}
          {concerns.length > 0 && (
            <div className="bg-gradient-to-r from-[#FEE2E2] to-[#FEF2F2] rounded-[10px] p-2">
              <p className="text-[11px] font-bold text-[#DC2626] mb-1">⚠️ 待关注</p>
              <ul className="text-[9px] text-[#991B1B] space-y-0.5">
                {concerns.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
