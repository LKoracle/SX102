import { useState } from 'react';

interface CaseResultCardProps {
  data: Record<string, unknown>;
}

export function CaseResultCard({ data: _data }: CaseResultCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [forwarded, setForwarded] = useState(false);

  const caseContent = `曲潇，今年36岁，入职保险行业仅1年多，却成了团队里业绩增速最快的人。转行前做多年客户服务，让她更擅长"先解决问题，再谈方案"。入职前两个月，她不急着冲单，而是把通讯录按家庭阶段分层：新手爸妈、三明治家庭、小微老板等，并用"保单整理+家庭风险清单"做低门槛切入，先拿到一次诊断机会，降低客户对推销的防备。

第3个月，她遇到首次关键成长事件：同学父亲住院，家里慌乱无措。她主动协助报案、核对等待期与免赔、一次性列材料清单，并用"进度条式同步"跟进每一步。结案后，对方在家族群长文感谢，说她"不是来卖保险的，是来帮我们把事办妥的"，由此带来第一波转介绍。

第4个月起，她把服务标准化：投保后30天确认保单归档与扣费，90天回访确认理解并补齐缺口，满10个月做年度保单年检，输出一页纸结论（保持/调整/补齐+理由+下一步清单）。第8个月，一位小微老板核保补件，她用两套备选路径稳住情绪并成功承保，客户朋友圈评价她"专业不催、遇事有方案"，又带来多位同圈层客户。

到第12个月，她靠"诊断式面谈+可视化服务流程"形成稳定口碑：回复快、流程清楚、理赔保全不推诿。业绩增长看似快，本质是把每次服务做成复利。`;

  const handleCopy = () => {
    navigator.clipboard.writeText(caseContent).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleForward = () => {
    setForwarded(true);
    setTimeout(() => setForwarded(false), 2000);
  };

  const tags = [
    { label: '快速成长', color: '#059669', bg: '#DCFCE7' },
    { label: '女性', color: '#7C3AED', bg: '#EDE9FE' },
    { label: '36岁', color: '#D97706', bg: '#FEF3C7' },
    { label: '1年期', color: '#3B82F6', bg: '#DBEAFE' },
    { label: '华南地区', color: '#DC2626', bg: '#FEE2E2' },
  ];

  const milestones = [
    { month: '第1-2月', event: '客户分层 + 低门槛切入', icon: '📋' },
    { month: '第3月', event: '理赔服务 → 首波转介绍', icon: '🌟' },
    { month: '第4月', event: '服务标准化流程建立', icon: '⚙️' },
    { month: '第8月', event: '核保困难 → 口碑传播', icon: '🏆' },
    { month: '第12月', event: '稳定口碑 · 服务复利', icon: '🚀' },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#059669] to-[#047857] px-4 py-2.5 flex items-center justify-between">
        <h3 className="text-white font-semibold text-[15px]">🏆 匹配案例</h3>
        <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] text-white">
          匹配度 96%
        </span>
      </div>

      <div className="p-3 space-y-3 max-h-[520px] overflow-y-auto">
        {/* Agent profile header */}
        <div className="flex items-center gap-3 bg-[#F0FDF4] rounded-[14px] p-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#059669] to-[#047857] rounded-full flex items-center justify-center text-white text-[18px] font-bold shrink-0">
            曲
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-[#1E293B]">曲潇</p>
            <p className="text-[10px] text-[#666]">36岁 · 入职1年 · 华南地区</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {tags.map((t) => (
                <span
                  key={t.label}
                  className="px-1.5 py-0.5 rounded text-[8px] font-medium"
                  style={{ color: t.color, background: t.bg }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Growth milestones */}
        <div className="space-y-1">
          <p className="text-[11px] font-medium text-[#666] px-1">📈 成长轨迹</p>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-2.5 relative">
                <div className="flex flex-col items-center">
                  <span className="text-sm">{m.icon}</span>
                  {i < milestones.length - 1 && (
                    <div className="w-px h-6 bg-[#D1FAE5]" />
                  )}
                </div>
                <div className="pb-2">
                  <span className="text-[10px] font-bold text-[#059669]">{m.month}</span>
                  <p className="text-[10px] text-[#475569]">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collapsible full case */}
        <div className="border border-[#D1FAE5] rounded-[14px] overflow-hidden">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between p-3 text-left hover:bg-[#F0FDF4] transition-all"
          >
            <span className="text-[12px] font-semibold text-[#059669]">
              📄 {expanded ? '收起完整案例' : '展开完整案例'}
            </span>
            <svg
              className={`w-4 h-4 text-[#059669] transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expanded && (
            <div className="px-3 pb-3 animate-fade-in-up">
              <div className="bg-[#FAFFFE] rounded-[10px] p-3 border border-[#D1FAE5]">
                <p className="text-[11px] text-[#334155] leading-relaxed whitespace-pre-wrap">
                  {caseContent}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[12px] border border-[#D1FAE5] transition-all hover:bg-[#F0FDF4]"
          >
            <span className="text-sm">{copied ? '✅' : '📋'}</span>
            <span className="text-[11px] font-medium text-[#059669]">
              {copied ? '已复制' : '复制'}
            </span>
          </button>
          <button
            onClick={handleForward}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[12px] border border-[#D1FAE5] transition-all hover:bg-[#F0FDF4]"
          >
            <span className="text-sm">{forwarded ? '✅' : '↗️'}</span>
            <span className="text-[11px] font-medium text-[#059669]">
              {forwarded ? '已转发' : '转发'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
