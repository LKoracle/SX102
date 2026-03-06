import { useState } from 'react';

interface PersonalityStrategy {
  type: string;
  icon: string;
  color: string;
  bg: string;
  characteristics: string[];
  responses: string[];
}

interface ResponseStrategyCardProps {
  data: Record<string, unknown>;
}

export function ResponseStrategyCard({ data }: ResponseStrategyCardProps) {
  const strategies = (data.strategies as PersonalityStrategy[]) || [
    {
      type: '防御型',
      icon: '🛡️',
      color: '#DC2626',
      bg: '#FEF2F2',
      characteristics: [
        '倾向于找外部原因解释业绩下滑',
        '对数据分析持抵触或怀疑态度',
        '可能会反驳或转移话题',
      ],
      responses: [
        '先认可对方的感受："我理解你可能觉得有些因素不在你的控制范围内"',
        '用事实而非评价引导："我们来看看数据本身在说什么"',
        '给出选择权："你觉得我们可以先从哪个方面开始改善？"',
      ],
    },
    {
      type: '自责型',
      icon: '😞',
      color: '#7C3AED',
      bg: '#F5F3FF',
      characteristics: [
        '过度自我否定，情绪低落',
        '可能表达"我不行"、"我做不到"',
        '缺乏行动的信心和动力',
      ],
      responses: [
        '先肯定过往成绩："你上半年拿下3个大单，说明能力是有的"',
        '聚焦具体行动而非结果："我们不看最终数字，先做好每天的30通电话"',
        '提供陪伴支持："第一周我陪你一起做客户分析，不用一个人扛"',
      ],
    },
    {
      type: '口头答应型',
      icon: '🤝',
      color: '#D97706',
      bg: '#FFFBEB',
      characteristics: [
        '面谈时态度很好，充分认同',
        '口头承诺很爽快，但执行力差',
        '过往有"说到做不到"的记录',
      ],
      responses: [
        '要求具体承诺："好，那我们把这个写下来，第一周具体做什么？"',
        '设置检查节点："我们约好周三中午做个5分钟的进展确认，可以吗？"',
        '预设困难场景："如果遇到客户连续拒绝，你打算怎么调整？"',
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🎭 应对策略指南</h3>
      </div>

      <div className="p-3 space-y-2 max-h-[450px] overflow-y-auto">
        {/* Tab Buttons */}
        <div className="flex gap-1.5">
          {strategies.map((s, i) => (
            <button
              key={i}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-[10px] text-[11px] font-medium transition-all"
              style={{
                background: activeTab === i ? s.color : s.bg,
                color: activeTab === i ? '#fff' : s.color,
                border: `1px solid ${activeTab === i ? s.color : `${s.color}30`}`,
              }}
              onClick={() => setActiveTab(i)}
            >
              <span className="text-[12px]">{s.icon}</span>
              {s.type}
            </button>
          ))}
        </div>

        {/* Active Strategy Content */}
        {strategies.map((s, i) => {
          if (activeTab !== i) return null;
          return (
            <div key={i} className="space-y-2">
              {/* Characteristics */}
              <div className="rounded-[12px] border p-2.5" style={{ borderColor: `${s.color}20`, background: s.bg }}>
                <p className="text-[11px] font-bold mb-1.5" style={{ color: s.color }}>
                  📋 典型表现
                </p>
                <ul className="space-y-1">
                  {s.characteristics.map((c, j) => (
                    <li key={j} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: s.color }} />
                      <span className="text-[10px] text-[#555]">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responses */}
              <div className="rounded-[12px] border border-gray-100 p-2.5 bg-white">
                <p className="text-[11px] font-bold text-[#1D4ED8] mb-1.5">💡 推荐应对</p>
                <div className="space-y-1.5">
                  {s.responses.map((r, j) => (
                    <div
                      key={j}
                      className="bg-[#F8FAFC] rounded-[8px] p-2 border border-gray-100"
                    >
                      <div className="flex items-start gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 mt-0.5"
                          style={{ background: s.color }}
                        >
                          {j + 1}
                        </span>
                        <p className="text-[10px] text-[#555] leading-relaxed">{r}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
