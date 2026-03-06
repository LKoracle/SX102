interface MonthlyTarget {
  month: string;
  fyc: number;
  policyCount: number;
  focus: string;
}

interface CheckPoint {
  week: string;
  date: string;
  metrics: string;
  action: string;
}

interface QuarterlyTrackingPlanData {
  title: string;
  monthlyTargets: MonthlyTarget[];
  checkPoints: CheckPoint[];
  expectedResult: string;
}

export function QuarterlyTrackingPlanCard({ data }: { data: Record<string, unknown> }) {
  const d = data as unknown as QuarterlyTrackingPlanData;

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0891B2] to-[#0369A1] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📋 {d.title}</h3>
        <p className="text-white/80 text-[11px] mt-0.5">Q4 快速追赶计划</p>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3 max-h-[400px] overflow-y-auto">
        {/* Monthly Targets */}
        <div>
          <h4 className="text-[12px] font-bold mb-2 text-[#0369A1]">📅 月度目标分解</h4>
          <div className="grid grid-cols-3 gap-2">
            {d.monthlyTargets.map((target, idx) => (
              <div key={idx} className="bg-gradient-to-r from-[#F3E8FF]/30 to-[#EDE9FE]/30 rounded-lg p-3 border border-[#E9D5FF]">
                <div className="text-[10px] text-[#666] font-medium">{target.month}</div>
                <div className="mt-2 space-y-1">
                  <div>
                    <div className="text-[10px] text-[#999]">FYC</div>
                    <div className="text-[13px] font-bold text-[#0089A1]">{target.fyc}万</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#999]">政策</div>
                    <div className="text-[13px] font-bold text-[#0089A1]">{target.policyCount}件</div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200 text-[10px] text-[#666]">
                  {target.focus}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Checkpoints */}
        <div>
          <h4 className="text-[12px] font-bold mb-2 text-[#0369A1]">🎯 周进度汇总节点</h4>
          <div className="space-y-2 max-h-[150px] overflow-y-auto">
            {d.checkPoints.map((cp, idx) => (
              <div key={idx} className="bg-gray-50 rounded p-2.5 text-[10px] border-l-2 border-[#0089A1]">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-[#333]">{cp.week}</span>
                  <span className="text-[#999]">{cp.date}</span>
                </div>
                <div className="text-[#666] mb-1">检查：{cp.metrics}</div>
                <div className="bg-white rounded p-1.5 text-[#0089A1] font-medium">→ {cp.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Result */}
        <div className="bg-gradient-to-r from-[#DCFCE7] to-[#F0FDF4] rounded-lg p-3 border border-[#86EFAC]">
          <div className="text-[12px] font-bold mb-1 text-[#059669]">📈 预期达成</div>
          <div className="text-[11px] leading-relaxed text-[#047857]">{d.expectedResult}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200 text-center text-[11px] text-[#999]">
        ✓ 追踪计划已启动，将按照节点进度推送动态
      </div>
    </div>
  );
}
