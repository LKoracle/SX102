import { useState } from 'react';

interface ReportPreviewCardProps {
  data: Record<string, unknown>;
}

type DisplayStyle = 'card' | 'chart' | 'table';

interface MetricData {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: string;
}

const weekData: Record<string, MetricData[]> = {
  本周: [
    { label: 'NBEV', value: '2,850万', trend: '+12.3%', trendUp: true, icon: '💰' },
    { label: '增员率', value: '18.5%', trend: '+3.2%', trendUp: true, icon: '👥' },
    { label: '3转 (3个月转正率)', value: '72.6%', trend: '-1.8%', trendUp: false, icon: '🔄' },
    { label: '13留 (13个月留存率)', value: '68.3%', trend: '+2.1%', trendUp: true, icon: '📌' },
  ],
  下周: [
    { label: 'NBEV', value: '3,120万', trend: '+9.5%', trendUp: true, icon: '💰' },
    { label: '增员率', value: '19.8%', trend: '+7.0%', trendUp: true, icon: '👥' },
    { label: '3转 (3个月转正率)', value: '74.1%', trend: '+2.1%', trendUp: true, icon: '🔄' },
    { label: '13留 (13个月留存率)', value: '69.7%', trend: '+2.0%', trendUp: true, icon: '📌' },
  ],
};

const trendData: Record<string, number[]> = {
  本周: [62, 58, 65, 71, 68, 75, 80],
  下周: [75, 80, 72, 85, 82, 88, 92],
};

export function ReportPreviewCard({ data: _data }: ReportPreviewCardProps) {
  const [style, setStyle] = useState<DisplayStyle>('card');
  const [week, setWeek] = useState<'本周' | '下周'>('本周');
  const [switching, setSwitching] = useState(false);

  const metrics = weekData[week];
  const trend = trendData[week];
  const days = week === '本周'
    ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  const handleWeekSwitch = (w: '本周' | '下周') => {
    if (w === week) return;
    setSwitching(true);
    setTimeout(() => {
      setWeek(w);
      setSwitching(false);
    }, 600);
  };

  const maxTrend = Math.max(...trend);

  const styles: { id: DisplayStyle; icon: string; label: string }[] = [
    { id: 'card', icon: '🃏', label: '卡片' },
    { id: 'chart', icon: '📊', label: '图表' },
    { id: 'table', icon: '📋', label: '表格' },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-4 py-2.5 flex items-center justify-between">
        <h3 className="text-white font-semibold text-[15px]">📋 智能报告</h3>
        <div className="flex gap-1">
          {(['本周', '下周'] as const).map((w) => (
            <button
              key={w}
              onClick={() => handleWeekSwitch(w)}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-all"
              style={{
                background: week === w ? 'rgba(255,255,255,0.25)' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className={`p-3 space-y-3 max-h-[520px] overflow-y-auto transition-opacity duration-300 ${switching ? 'opacity-30' : 'opacity-100'}`}>
        {/* Style switcher */}
        <div className="flex items-center justify-between px-1">
          <p className="text-[11px] font-medium text-[#666]">关键指标概览</p>
          <div className="flex gap-1 bg-[#F1F5F9] rounded-[8px] p-0.5">
            {styles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className="px-2 py-0.5 rounded-[6px] text-[10px] transition-all"
                style={{
                  background: style === s.id ? 'white' : 'transparent',
                  color: style === s.id ? '#1D4ED8' : '#999',
                  boxShadow: style === s.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {switching && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
              <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-[11px] text-[#1D4ED8]">数据更新中...</span>
            </div>
          </div>
        )}

        {/* Card style */}
        {style === 'card' && (
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((m, i) => (
              <div key={i} className="bg-[#F8FAFC] rounded-[14px] p-3 border border-[#EEF2FF]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-sm">{m.icon}</span>
                  <span className="text-[10px] text-[#666]">{m.label}</span>
                </div>
                <p className="text-[18px] font-bold text-[#1E293B] mb-0.5">{m.value}</p>
                <span
                  className="text-[10px] font-medium"
                  style={{ color: m.trendUp ? '#059669' : '#DC2626' }}
                >
                  {m.trendUp ? '↑' : '↓'} {m.trend} 环比
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Chart style */}
        {style === 'chart' && (
          <div className="space-y-3">
            {metrics.map((m, i) => (
              <div key={i} className="bg-[#F8FAFC] rounded-[14px] p-3 border border-[#EEF2FF]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-[#333]">{m.icon} {m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#1E293B]">{m.value}</span>
                    <span className="text-[10px] font-medium" style={{ color: m.trendUp ? '#059669' : '#DC2626' }}>
                      {m.trendUp ? '↑' : '↓'}{m.trend}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${60 + i * 10}%`,
                      background: m.trendUp
                        ? 'linear-gradient(90deg, #3B82F6, #059669)'
                        : 'linear-gradient(90deg, #F59E0B, #DC2626)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table style */}
        {style === 'table' && (
          <div className="bg-[#F8FAFC] rounded-[14px] border border-[#EEF2FF] overflow-hidden">
            <div className="grid grid-cols-4 gap-0 bg-blue-50 px-3 py-2">
              <span className="text-[10px] font-semibold text-[#1D4ED8]">指标</span>
              <span className="text-[10px] font-semibold text-[#1D4ED8] text-center">当前值</span>
              <span className="text-[10px] font-semibold text-[#1D4ED8] text-center">环比</span>
              <span className="text-[10px] font-semibold text-[#1D4ED8] text-center">趋势</span>
            </div>
            {metrics.map((m, i) => (
              <div key={i} className="grid grid-cols-4 gap-0 px-3 py-2 border-t border-[#EEF2FF]">
                <span className="text-[11px] text-[#333]">{m.icon} {m.label}</span>
                <span className="text-[11px] font-bold text-center text-[#1E293B]">{m.value}</span>
                <span
                  className="text-[11px] font-medium text-center"
                  style={{ color: m.trendUp ? '#059669' : '#DC2626' }}
                >
                  {m.trend}
                </span>
                <span className="text-center">{m.trendUp ? '📈' : '📉'}</span>
              </div>
            ))}
          </div>
        )}

        {/* Mini trend chart */}
        <div className="bg-[#F8FAFC] rounded-[14px] p-3 border border-[#EEF2FF]">
          <p className="text-[11px] font-medium text-[#333] mb-2">📈 NBEV 日趋势</p>
          <div className="flex items-end gap-1 h-[60px]">
            {trend.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-[4px] transition-all duration-700"
                  style={{
                    height: `${(v / maxTrend) * 48}px`,
                    background: i === trend.length - 1
                      ? 'linear-gradient(180deg, #3B82F6, #1D4ED8)'
                      : 'linear-gradient(180deg, #93C5FD, #BFDBFE)',
                  }}
                />
                <span className="text-[8px] text-[#999]">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI analysis */}
        <div className="bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] rounded-[12px] p-2.5 space-y-1">
          <p className="text-[10px] font-medium text-[#1D4ED8]">🤖 AI 趋势分析</p>
          {week === '本周' ? (
            <>
              <p className="text-[10px] text-[#1E40AF]">• NBEV本周环比提升12.3%，主要受益于华南区增员团队扩张</p>
              <p className="text-[10px] text-[#1E40AF]">• 3转率小幅回落1.8%，建议关注新人培训流程优化</p>
              <p className="text-[10px] text-[#1E40AF]">• 13留率稳步上升，核心团队留存质量改善明显</p>
            </>
          ) : (
            <>
              <p className="text-[10px] text-[#1E40AF]">• NBEV预计突破3,100万，华南地区贡献率持续走高</p>
              <p className="text-[10px] text-[#1E40AF]">• 3转率预计回升至74.1%，新人培训优化初见成效</p>
              <p className="text-[10px] text-[#1E40AF]">• 增员率突破19.8%，校招渠道表现超出预期</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
