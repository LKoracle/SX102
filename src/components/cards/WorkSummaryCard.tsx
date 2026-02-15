interface WorkSummaryCardProps {
  data: Record<string, unknown>;
}

interface MetricData {
  actual: number;
  target: number;
  label: string;
}

export function WorkSummaryCard({ data }: WorkSummaryCardProps) {
  const period = data.period as string;
  const metrics = data.metrics as Record<string, MetricData>;
  const highlights = data.highlights as string[];
  const improvements = data.improvements as string[];

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2.5">
        <h3 className="text-white font-semibold text-sm">📊 工作总结</h3>
        <p className="text-white/80 text-xs">{period}</p>
      </div>
      <div className="p-3 space-y-3">
        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-2">
          {Object.values(metrics).slice(0, 3).map((metric, i) => {
            const rate = Math.round((metric.actual / metric.target) * 100);
            return (
              <div key={i} className="text-center bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-text-secondary">{metric.label}</p>
                <p className={`text-lg font-bold ${rate >= 80 ? 'text-blue-600' : 'text-purple-500'}`}>
                  {metric.label === '保费收入'
                    ? `${(metric.actual / 10000).toFixed(1)}万`
                    : metric.actual}
                </p>
                <p className="text-xs text-text-secondary">
                  目标 {metric.label === '保费收入' ? `${(metric.target / 10000).toFixed(1)}万` : metric.target}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional metrics */}
        <div className="grid grid-cols-2 gap-2">
          {Object.values(metrics).slice(3).map((metric, i) => {
            const rate = Math.round((metric.actual / metric.target) * 100);
            return (
              <div key={i} className="bg-gray-50 rounded-lg p-2 flex items-center justify-between">
                <span className="text-xs text-text-secondary">{metric.label}</span>
                <span className={`text-sm font-bold ${rate >= 80 ? 'text-blue-600' : 'text-purple-500'}`}>
                  {metric.label === '保费收入'
                    ? `${(metric.actual / 10000).toFixed(1)}万`
                    : metric.actual}/{metric.label === '保费收入' ? `${(metric.target / 10000).toFixed(1)}万` : metric.target}
                </span>
              </div>
            );
          })}
        </div>

        {/* Highlights */}
        <div>
          <p className="text-xs font-medium text-blue-700 mb-1">✅ 本周亮点：</p>
          {highlights.map((h, i) => (
            <p key={i} className="text-xs text-text-secondary ml-2 mb-0.5">• {h}</p>
          ))}
        </div>

        {/* Improvements */}
        <div>
          <p className="text-xs font-medium text-violet-700 mb-1">⚠️ 待改进：</p>
          {improvements.map((imp, i) => (
            <p key={i} className="text-xs text-text-secondary ml-2 mb-0.5">• {imp}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
