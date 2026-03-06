import { useState } from 'react';

interface RiskItem {
  category: string;
  icon: string;
  metric: string;
  current: string;
  benchmark: string;
  severity: 'high' | 'medium' | 'low';
  detail: string;
}

interface RiskRadarCardProps {
  data: Record<string, unknown>;
}

export function RiskRadarCard({ data }: RiskRadarCardProps) {
  const risks = (data.risks as RiskItem[]) || [
    {
      category: '日均外呼',
      icon: '📞',
      metric: '日均外呼量',
      current: '18通',
      benchmark: '团队均值45通',
      severity: 'high',
      detail: '外呼量严重不足，仅为团队平均水平的40%，直接影响商机来源',
    },
    {
      category: '客户转化率',
      icon: '🔄',
      metric: '客户转化率',
      current: '12%',
      benchmark: '团队均值25%',
      severity: 'high',
      detail: '转化率持续走低，近3个月呈下降趋势，需要加强面谈技巧',
    },
    {
      category: '出勤',
      icon: '📅',
      metric: '月出勤天数',
      current: '18天',
      benchmark: '标准22天',
      severity: 'medium',
      detail: '出勤率82%，低于标准要求，早会缺勤3次',
    },
    {
      category: '培训',
      icon: '📚',
      metric: '培训参与',
      current: '1次/月',
      benchmark: '标准3次/月',
      severity: 'medium',
      detail: '培训参与度低，近2月仅参加1次培训，技能提升停滞',
    },
    {
      category: '客户投诉',
      icon: '⚠️',
      metric: '客户投诉',
      current: '2次',
      benchmark: '团队均值0.5次',
      severity: 'low',
      detail: '近期收到2起客户反馈，主要为沟通态度问题',
    },
  ];

  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const severityConfig: Record<string, { color: string; bg: string; label: string; border: string }> = {
    high: { color: '#DC2626', bg: '#FEE2E2', label: '高危', border: '#FECACA' },
    medium: { color: '#D97706', bg: '#FEF3C7', label: '中危', border: '#FDE68A' },
    low: { color: '#CA8A04', bg: '#FEF9C3', label: '低危', border: '#FDE047' },
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#DC2626] to-[#EF4444] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🔍 异常雷达扫描</h3>
      </div>

      <div className="p-3 space-y-1.5 max-h-[450px] overflow-y-auto">
        {/* Summary Bar */}
        <div className="flex items-center gap-2 px-2 py-1.5 bg-[#FEF2F2] rounded-[10px]">
          <span className="text-[10px] text-[#DC2626] font-medium">
            共发现 {risks.length} 项异常：
          </span>
          <span className="text-[10px] text-[#DC2626]">
            {risks.filter((r) => r.severity === 'high').length}项高危
          </span>
          <span className="text-[10px] text-[#D97706]">
            {risks.filter((r) => r.severity === 'medium').length}项中危
          </span>
          <span className="text-[10px] text-[#CA8A04]">
            {risks.filter((r) => r.severity === 'low').length}项低危
          </span>
        </div>

        {/* Risk Items */}
        {risks.map((risk, i) => {
          const cfg = severityConfig[risk.severity];
          const isExpanded = expandedIdx === i;
          return (
            <div
              key={i}
              className="rounded-[10px] border overflow-hidden cursor-pointer transition-all"
              style={{ borderColor: cfg.border }}
              onClick={() => setExpandedIdx(isExpanded ? null : i)}
            >
              <div className="flex items-center gap-2 px-2.5 py-2" style={{ background: cfg.bg }}>
                <span className="text-[13px]">{risk.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#333]">{risk.metric}</span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                      style={{ color: '#fff', background: cfg.color }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold" style={{ color: cfg.color }}>
                      当前: {risk.current}
                    </span>
                    <span className="text-[10px] text-[#999]">|</span>
                    <span className="text-[10px] text-[#666]">{risk.benchmark}</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#999]">{isExpanded ? '▲' : '▼'}</span>
              </div>

              {isExpanded && (
                <div className="px-2.5 py-2 bg-white border-t" style={{ borderColor: cfg.border }}>
                  <p className="text-[10px] text-[#555] leading-relaxed">{risk.detail}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
