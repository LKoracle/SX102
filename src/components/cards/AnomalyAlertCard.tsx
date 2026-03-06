interface AlertMetric {
  label: string;
  actual: number;
  target: number;
  gap: string;
}

interface AlertItem {
  groupName: string;
  leader: string;
  severity: 'high' | 'medium';
  metrics: AlertMetric[];
  reasons: string[];
}

interface AnomalyAlertCardProps {
  data: Record<string, unknown>;
}

export function AnomalyAlertCard({ data }: AnomalyAlertCardProps) {
  const date = (data.date as string) || '今日';
  const alerts = (data.alerts as AlertItem[]) || [];
  const totalAlerts = (data.totalAlerts as number) || alerts.length;

  const getSeverityStyle = (severity: string) => {
    if (severity === 'high') {
      return { color: '#DC2626', bg: '#FEE2E2', border: '#FECACA', label: '严重', icon: '🔴' };
    }
    return { color: '#D97706', bg: '#FEF3C7', border: '#FDE68A', label: '关注', icon: '🟡' };
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#DC2626] to-[#F59E0B] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🚨 异常预警</h3>
        <p className="text-white/80 text-[11px] mt-0.5">{date} · 共{totalAlerts}条预警</p>
      </div>

      <div className="p-3 space-y-3 max-h-[450px] overflow-y-auto">
        {alerts.map((alert, i) => {
          const severity = getSeverityStyle(alert.severity);

          return (
            <div
              key={i}
              className="rounded-[12px] overflow-hidden"
              style={{ border: `1.5px solid ${severity.border}` }}
            >
              {/* 预警头部 */}
              <div
                className="px-3 py-2 flex items-center justify-between"
                style={{ background: severity.bg }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[12px]">{severity.icon}</span>
                  <div>
                    <p className="text-[12px] font-semibold" style={{ color: severity.color }}>
                      {alert.groupName}
                    </p>
                    <p className="text-[10px] text-[#666]">{alert.leader}</p>
                  </div>
                </div>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold text-white"
                  style={{
                    background: alert.severity === 'high' ? '#DC2626' : '#D97706',
                  }}
                >
                  {severity.label}
                </span>
              </div>

              {/* 异常指标 */}
              <div className="px-3 py-2 space-y-1.5">
                {alert.metrics.map((metric, j) => (
                  <div key={j}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-[#666]">{metric.label}</span>
                      <span className="text-[10px] font-medium" style={{ color: severity.color }}>
                        {metric.gap}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min((metric.actual / metric.target) * 100, 100)}%`,
                          background:
                            alert.severity === 'high'
                              ? 'linear-gradient(90deg, #DC262688, #EF4444)'
                              : 'linear-gradient(90deg, #D9770688, #F59E0B)',
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-0.5 text-[9px] text-[#999]">
                      <span>当前：{metric.actual}%</span>
                      <span>目标：{metric.target}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 原因分析 */}
              {alert.reasons.length > 0 && (
                <div className="px-3 py-2 border-t" style={{ borderColor: severity.border }}>
                  <p className="text-[10px] font-medium text-[#666] mb-1">📋 原因分析</p>
                  <ul className="space-y-0.5">
                    {alert.reasons.map((reason, k) => (
                      <li key={k} className="text-[9px] text-[#888]">• {reason}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
