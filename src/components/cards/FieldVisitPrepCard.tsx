interface NeedItem {
  icon: string;
  title: string;
  desc: string;
}

interface StrategyItem {
  step: number;
  label: string;
  tip: string;
}

interface VisitPrepData {
  customerName?: string;
  age?: number;
  occupation?: string;
  tags?: string[];
  coreNeeds?: NeedItem[];
  strategy?: StrategyItem[];
  openingScript?: string;
}

interface FieldVisitPrepCardProps {
  data: Record<string, unknown>;
}

export default function FieldVisitPrepCard({ data }: FieldVisitPrepCardProps) {
  const d = data as unknown as VisitPrepData;

  const tags = d.tags || ['企业中层', '50岁', '有2个孩子', '定存30万到期', '关注资产配置'];
  const coreNeeds = d.coreNeeds || [
    { icon: '💰', title: '定存到期再配置', desc: '30万定存本月到期，有主动配置意愿，是切入最佳时机' },
    { icon: '🏢', title: '企业经营风险保障', desc: '创业者缺乏稳定收入，需防范经营风险对家庭的冲击' },
    { icon: '👨‍👩‍👧‍👦', title: '子女教育与传承', desc: '2个孩子，教育金储备和财富传承是中长期核心诉求' },
    { icon: '🌿', title: '养老规划提前布局', desc: '50岁正是养老规划黄金期，趁早锁定长期复利收益' },
  ];
  const strategy = d.strategy || [
    { step: 1, label: '开场共鸣', tip: '从定存到期切入，询问他对这笔钱的打算，建立共同话题' },
    { step: 2, label: '需求挖掘', tip: '围绕"创业者的钱如何更安全增值"展开，探讨传承和养老' },
    { step: 3, label: '方案呈现', tip: '针对财富缺口和养老缺口，推荐储蓄型+年金险组合方案' },
    { step: 4, label: '促成建议', tip: '借助司庆季节点稀缺性，建议尽快锁定方案' },
  ];
  const openingScript =
    d.openingScript ||
    '陈总，您好！之前聊到您3月有笔定存到期，这段时间您有想好怎么打算吗？我最近正好帮几个类似情况的客户做了资产配置方案，效果不错，今天带过来给您参考一下。';

  return (
    <div className="rounded-[20px] overflow-hidden shadow-sm border border-gray-100 bg-white">
      {/* Header */}
      <div
        className="px-4 py-3"
        style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #0891B2 100%)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-white/70 text-[9px] font-medium">AI 拜访前准备方案</div>
            <div className="text-white font-bold text-[14px]">
              📋 {d.customerName || '陈诚'}的访前分析
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#93C5FD] text-[10px] font-semibold">
              {d.age || 50}岁 · {d.occupation || '企业中层'}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Core Needs */}
        <div>
          <div className="flex items-center gap-1.5 mb-2 px-0.5">
            <span className="text-[11px]">🎯</span>
            <span className="text-[11px] font-bold text-[#1a1a1a]">核心需求挖掘</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {coreNeeds.map((need, i) => (
              <div
                key={i}
                className="rounded-[12px] p-2.5"
                style={{ background: '#F0F9FF', border: '1px solid #BAE6FD' }}
              >
                <div className="text-[14px] mb-1">{need.icon}</div>
                <div className="text-[10px] font-bold text-[#0369A1] mb-0.5 leading-[1.3]">{need.title}</div>
                <div className="text-[9px] text-[#64748B] leading-[1.4]">{need.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visit Strategy */}
        <div>
          <div className="flex items-center gap-1.5 mb-2 px-0.5">
            <span className="text-[11px]">🗺️</span>
            <span className="text-[11px] font-bold text-[#1a1a1a]">拜访策略与沟通要点</span>
          </div>
          <div className="space-y-1.5">
            {strategy.map((s) => (
              <div
                key={s.step}
                className="flex items-start gap-2.5 rounded-[10px] px-2.5 py-2"
                style={{ background: '#F8FAFF', border: '1px solid #E0E7FF' }}
              >
                <div
                  className="flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: 'linear-gradient(135deg, #1D4ED8, #0891B2)', fontSize: 9 }}
                >
                  {s.step}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#1D4ED8]">{s.label}　</span>
                  <span className="text-[9px] text-[#475569] leading-[1.5]">{s.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opening Script */}
        <div
          className="rounded-[12px] px-3 py-2.5"
          style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}
        >
          <div className="flex items-center gap-1 mb-1.5">
            <span className="text-[10px]">💬</span>
            <span className="text-[10px] font-bold text-[#92400E]">建议开场白</span>
          </div>
          <p className="text-[10px] text-[#78350F] leading-[1.65]">{openingScript}</p>
        </div>
      </div>
    </div>
  );
}
