interface MidMonthAlertData {
  currentDate: string;
  daysElapsed: number;
  daysTotal: number;
  metrics: {
    fyc: { current: number; target: number; progress: number };
    policyCount: { current: number; target: number; progress: number };
    activityRate: { current: number; target: number; progress: number };
  };
  alerts: Array<{
    groupName: string;
    leader: string;
    fycGap: string;
    activityGap: string;
    severity: 'high' | 'medium';
  }>;
}

export function MidMonthAlertCard({ data }: { data: Record<string, unknown> }) {
  const d = data as unknown as MidMonthAlertData;

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getSeverityColor = (severity: string) => {
    return severity === 'high' ? 'border-red-500 bg-red-50' : 'border-amber-500 bg-amber-50';
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📊 月中数据快照</h3>
        <p className="text-white/80 text-[11px] mt-0.5">{d.currentDate} · 已运行 {d.daysElapsed}/{d.daysTotal} 天</p>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3 max-h-[400px] overflow-y-auto">
        {/* Metrics Grid */}
        <div className="space-y-2">
          {[
            { label: 'FYC 达成', data: d.metrics.fyc },
            { label: '政策件数', data: d.metrics.policyCount },
            { label: '活动量达成率', data: d.metrics.activityRate },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-medium text-[#6B21A8]">{item.label}</span>
                <span className="text-[10px] text-[#999]">
                  {item.data.progress}% ({item.data.current}/{item.data.target})
                </span>
              </div>
              <div className="h-1.5 bg-[#E9D5FF] rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(item.data.progress)} transition-all`}
                  style={{ width: `${Math.min(item.data.progress, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Alerts Section */}
        {d.alerts.length > 0 && (
          <div>
            <h4 className="text-[12px] font-bold mb-2 text-[#DC2626]">⚠️ 异常预警</h4>
            <div className="space-y-2 max-h-[150px] overflow-y-auto">
              {d.alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-2.5 border-l-4 ${getSeverityColor(alert.severity)} text-[11px]`}
                >
                  <div className="font-semibold flex items-center gap-2 text-[#333]">
                    {alert.severity === 'high' ? '🔴' : '🟠'} {alert.groupName} ({alert.leader})
                  </div>
                  <div className="mt-1 text-[10px] space-y-0.5 text-[#666]">
                    <div>• FYC 落后：{alert.fycGap}</div>
                    <div>• 活动量不足：{alert.activityGap}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200 text-center text-[11px] text-[#999]">
        建议立即启动追踪，关注重点部/组进度
      </div>
    </div>
  );
}
