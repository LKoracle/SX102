interface CoverageGapCardProps {
  data: Record<string, unknown>;
}

interface GapItem {
  category: string;
  current: number;
  recommended: number;
  unit: string;
  status: 'gap' | 'missing' | 'adequate';
}

export function CoverageGapCard({ data }: CoverageGapCardProps) {
  const customerName = data.customerName as string;
  const analysis = data.analysis as GapItem[];
  const summary = data.summary as string;

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📊 {customerName} - 保障缺口分析</h3>
      </div>
      <div className="p-3 space-y-2">
        {analysis.map((item, index) => {
          const percentage = item.recommended > 0 ? Math.min((item.current / item.recommended) * 100, 100) : 0;
          const barColor =
            item.status === 'missing'
              ? 'bg-purple-400'
              : item.status === 'gap'
              ? 'bg-indigo-400'
              : 'bg-blue-400';

          return (
            <div key={index}>
              <div className="flex items-center justify-between text-[13px] mb-1">
                <span className="font-medium">{item.category}</span>
                <span className="text-text-secondary">
                  {item.current}{item.unit} / {item.recommended}{item.unit}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${barColor} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {item.status === 'missing' && (
                <p className="text-[13px] text-purple-500 mt-0.5">⚠️ 完全缺失</p>
              )}
            </div>
          );
        })}

        {summary && (
          <div className="mt-2 p-2 bg-purple-50 rounded-lg text-[13px] text-purple-700">
            📌 {summary}
          </div>
        )}
      </div>
    </div>
  );
}
