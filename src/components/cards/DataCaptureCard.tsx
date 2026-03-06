import { useState, useEffect } from 'react';

interface DataSource {
  name: string;
  icon: string;
  items: string[];
}

interface DataCaptureCardProps {
  data: Record<string, unknown>;
}

export function DataCaptureCard({ data }: DataCaptureCardProps) {
  const sources = (data.sources as DataSource[]) || [
    { name: 'CRM系统', icon: '💼', items: ['客户拜访记录', '商机跟进状态', '客户画像数据'] },
    { name: '通话记录', icon: '📞', items: ['外呼频次统计', '通话时长分析', '接通率数据'] },
    { name: '考勤数据', icon: '📅', items: ['出勤天数', '早会参与率', '培训签到记录'] },
    { name: '保单系统', icon: '📄', items: ['新单件数', 'FYC金额', '续保率'] },
  ];

  const [progress, setProgress] = useState<number[]>(sources.map(() => 0));
  const [completed, setCompleted] = useState<boolean[]>(sources.map(() => false));

  useEffect(() => {
    sources.forEach((_, i) => {
      const startDelay = i * 800;
      const duration = 1200;
      const steps = 20;
      const stepTime = duration / steps;

      const timeout = setTimeout(() => {
        let step = 0;
        const interval = setInterval(() => {
          step++;
          setProgress((prev) => {
            const next = [...prev];
            next[i] = Math.min((step / steps) * 100, 100);
            return next;
          });
          if (step >= steps) {
            clearInterval(interval);
            setCompleted((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        }, stepTime);
      }, startDelay);

      return () => clearTimeout(timeout);
    });
  }, []);

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🔄 数据自动抓取</h3>
      </div>

      <div className="p-3 space-y-2 max-h-[450px] overflow-y-auto">
        {sources.map((src, i) => (
          <div key={i} className="border border-gray-100 rounded-[12px] p-2.5 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[14px]">{src.icon}</span>
                <span className="text-[12px] font-medium text-[#333]">{src.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {completed[i] ? (
                  <span className="text-[10px] text-[#059669] font-medium flex items-center gap-0.5">
                    <span className="w-3.5 h-3.5 bg-[#059669] rounded-full flex items-center justify-center text-white text-[8px]">✓</span>
                    已完成
                  </span>
                ) : (
                  <span className="text-[10px] text-[#3B82F6] font-medium">{Math.round(progress[i])}%</span>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1.5">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${progress[i]}%`,
                  background: completed[i]
                    ? 'linear-gradient(90deg, #059669, #10B981)'
                    : 'linear-gradient(90deg, #3B82F6, #1D4ED8)',
                }}
              />
            </div>

            {/* Data Items */}
            <div className="flex flex-wrap gap-1">
              {src.items.map((item, j) => (
                <span
                  key={j}
                  className="px-1.5 py-0.5 rounded text-[9px]"
                  style={{
                    background: completed[i] ? '#DCFCE7' : '#EFF6FF',
                    color: completed[i] ? '#059669' : '#3B82F6',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Summary */}
        {completed.every(Boolean) && (
          <div className="bg-gradient-to-r from-[#DCFCE7] to-[#F0FDF4] rounded-[12px] p-2.5 text-center animate-fade-in-up">
            <p className="text-[11px] text-[#059669] font-medium">✅ 全部数据已采集完成，共分析4个数据源</p>
          </div>
        )}
      </div>
    </div>
  );
}
