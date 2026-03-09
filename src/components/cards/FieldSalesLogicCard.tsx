interface LogicStep {
  step: number;
  title: string;
  script: string;
  tip?: string;
}

interface SalesLogicData {
  productName?: string;
  steps?: LogicStep[];
  keyPoints?: string[];
}

interface FieldSalesLogicCardProps {
  data: Record<string, unknown>;
}

export function FieldSalesLogicCard({ data }: FieldSalesLogicCardProps) {
  const d = (data as unknown as SalesLogicData) || {};
  const steps = d.steps || [
    {
      step: 1,
      title: '需求共鸣',
      script: '陈先生，您45岁正是家庭责任最重的阶段，上有父母、下有子女，自己还是家庭的顶梁柱。这个阶段资产保值增值和养老规划是最关键的两件事，您认同吗？',
      tip: '先建立共识，让客户点头认可',
    },
    {
      step: 2,
      title: '缺口呈现',
      script: '根据我对您情况的分析，目前有两个重要缺口：财富缺口约160万，养老缺口约180万。如果现在不做规划，这两个缺口会随时间越来越难以填补。',
      tip: '用数字说话，增强紧迫感',
    },
    {
      step: 3,
      title: '方案呈现',
      script: '这款平安盛盈·居家养老，年交20万、交6年，可以同时解决这两个缺口：现金持续增值，享受分红收益，还配套专业的居家养老服务，一举三得。',
      tip: '方案讲解要简洁，突出核心价值',
    },
    {
      step: 4,
      title: '促成成交',
      script: '司庆季现在是特殊节点，这款产品的分红收益在这个时间点配置是最划算的。您看，我帮您把受益人和缴费方式先确认一下？',
      tip: '顺势推进，减少客户犹豫时间',
    },
  ];

  const stepColors = ['#3B82F6', '#7C3AED', '#F59E0B', '#059669'];

  return (
    <div className="rounded-[20px] overflow-hidden shadow-sm border border-gray-100" style={{ background: '#fff' }}>
      {/* Header */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ background: 'linear-gradient(135deg, #1D4ED8, #7C3AED)' }}
      >
        <span className="text-white font-bold text-[14px]">🎙️ AI销售逻辑话术</span>
        <span className="ml-auto text-[9px] text-white/70">{d.productName || '平安盛盈·居家养老'}</span>
      </div>

      {/* Steps */}
      <div className="p-3 space-y-2.5">
        {steps.map((s, i) => (
          <div key={i} className="relative">
            {/* Step connector line */}
            {i < steps.length - 1 && (
              <div
                className="absolute left-[15px] top-[32px] w-[2px] h-[calc(100%+6px)] z-0"
                style={{ background: `${stepColors[i]}30` }}
              />
            )}

            <div className="flex gap-2.5 relative z-10">
              {/* Step number circle */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-[12px] flex-shrink-0"
                style={{ background: stepColors[i % stepColors.length] }}
              >
                {s.step}
              </div>

              <div className="flex-1">
                {/* Step title */}
                <div
                  className="text-[11px] font-bold mb-1"
                  style={{ color: stepColors[i % stepColors.length] }}
                >
                  {s.title}
                </div>

                {/* Script */}
                <div
                  className="text-[10px] text-[#333] leading-[1.6] px-2.5 py-2 rounded-[10px]"
                  style={{ background: stepColors[i % stepColors.length] + '08', borderLeft: `2px solid ${stepColors[i % stepColors.length]}50` }}
                >
                  "{s.script}"
                </div>

                {/* Tip */}
                {s.tip && (
                  <div className="mt-1 text-[9px] text-[#999] italic pl-1">
                    💡 {s.tip}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key points */}
      {d.keyPoints && d.keyPoints.length > 0 && (
        <div
          className="mx-3 mb-3 rounded-[14px] px-3 py-2.5"
          style={{ background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)' }}
        >
          <div className="text-[10px] font-bold text-[#D97706] mb-1.5">⚡ 关键要点</div>
          {d.keyPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-1.5 mb-1 last:mb-0">
              <span className="text-[#F59E0B] text-[10px] mt-0.5">▸</span>
              <span className="text-[10px] text-[#92400E]">{point}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
