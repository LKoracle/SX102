import { useState } from 'react';

interface ScriptSection {
  title: string;
  icon: string;
  content: string;
}

interface MeetingScriptCardProps {
  data: Record<string, unknown>;
}

export function MeetingScriptCard({ data }: MeetingScriptCardProps) {
  const sections = (data.sections as ScriptSection[]) || [
    {
      title: '开场白',
      icon: '👋',
      content: '平安，谢谢你今天抽时间来。我们这次谈话的目的不是批评，而是一起想办法。你是团队的重要成员，我希望能帮你找到突破口。先说说你最近的感受？',
    },
    {
      title: '数据对齐',
      icon: '📊',
      content: '我们先看看数据：你的FYC达成率从半年前的85%降到了现在的38%，日均外呼从45通降到18通。这些数据你自己有感觉到吗？你觉得主要是哪些方面在影响？',
    },
    {
      title: '原因探讨',
      icon: '🔍',
      content: '我这边分析了几个可能的原因：一是异议处理的技巧可能需要加强，你最近遇到客户拒绝的情况多吗？二是出勤和培训参与度有些下降，是不是有什么困难？我们一个个来看。',
    },
    {
      title: '行动计划',
      icon: '📋',
      content: '好，那我们一起定个30天计划：第一周恢复日均外呼到30通以上；第二周参加异议处理培训并做3次演练；第三周开始重点客户面访；第四周复盘调整。每周五咱们碰一次，看看进展如何。',
    },
    {
      title: '收尾激励',
      icon: '💪',
      content: '平安，你之前的能力是被验证过的。上半年那几个大单都是你做的，说明你完全有这个实力。现在只是暂时遇到了瓶颈，只要方法对了，一定能恢复。我会全力支持你，有任何困难随时找我。',
    },
  ];

  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  const colors = ['#3B82F6', '#2563EB', '#7C3AED', '#D97706', '#059669'];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📝 面谈话术脚本</h3>
      </div>

      <div className="p-3 space-y-1.5 max-h-[450px] overflow-y-auto">
        <p className="text-[10px] text-[#64748B] px-1">点击展开/收起各环节话术</p>

        {sections.map((section, i) => {
          const isExpanded = expandedIdx === i;
          const color = colors[i % colors.length];

          return (
            <div
              key={i}
              className="rounded-[12px] border overflow-hidden transition-all"
              style={{ borderColor: isExpanded ? `${color}40` : '#F3F4F6' }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-2 px-3 py-2 cursor-pointer transition-all"
                style={{ background: isExpanded ? `${color}10` : '#FAFAFA' }}
                onClick={() => setExpandedIdx(isExpanded ? null : i)}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: color }}
                >
                  {i + 1}
                </span>
                <span className="text-[12px]">{section.icon}</span>
                <span className="text-[12px] font-medium text-[#333] flex-1">{section.title}</span>
                <span className="text-[10px] text-[#999]">{isExpanded ? '▲' : '▼'}</span>
              </div>

              {/* Content */}
              {isExpanded && (
                <div className="px-3 py-2.5 bg-white border-t" style={{ borderColor: `${color}20` }}>
                  <p className="text-[11px] text-[#555] leading-[1.7] whitespace-pre-wrap">{section.content}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
