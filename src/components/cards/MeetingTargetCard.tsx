import { useState } from 'react';

interface Target {
  text: string;
  priority: 'high' | 'medium';
}

interface MeetingTargetCardProps {
  data: Record<string, unknown>;
}

export function MeetingTargetCard({ data }: MeetingTargetCardProps) {
  const targets = (data.targets as Target[]) || [
    { text: '确认李平安对当前业绩下滑的自我认知', priority: 'high' },
    { text: '共同分析根本原因（技能/心态/行为）', priority: 'high' },
    { text: '制定未来30天具体改善计划', priority: 'high' },
    { text: '明确每周检查节点和达成标准', priority: 'medium' },
    { text: '激励信心，建立正向预期', priority: 'medium' },
  ];

  const [checked, setChecked] = useState<boolean[]>(targets.map(() => false));

  const toggleCheck = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const completedCount = checked.filter(Boolean).length;

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">🎯 面谈目标清单</h3>
      </div>

      <div className="p-3 space-y-2 max-h-[450px] overflow-y-auto">
        {/* Progress */}
        <div className="flex items-center justify-between px-2 py-1.5 bg-[#FFFBEB] rounded-[10px]">
          <span className="text-[10px] text-[#D97706] font-medium">
            完成进度: {completedCount}/{targets.length}
          </span>
          <div className="w-24 h-1.5 bg-[#FDE68A] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-[#D97706] transition-all"
              style={{ width: `${(completedCount / targets.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Target Items */}
        {targets.map((target, i) => (
          <div
            key={i}
            className="flex items-start gap-2 p-2.5 rounded-[10px] border cursor-pointer transition-all"
            style={{
              borderColor: checked[i] ? '#BBF7D0' : '#F3F4F6',
              background: checked[i] ? '#F0FDF4' : '#FFFFFF',
            }}
            onClick={() => toggleCheck(i)}
          >
            {/* Checkbox */}
            <div
              className="w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
              style={{
                borderColor: checked[i] ? '#059669' : '#D1D5DB',
                background: checked[i] ? '#059669' : 'transparent',
                width: '18px',
                height: '18px',
              }}
            >
              {checked[i] && (
                <span className="text-white text-[10px]">✓</span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: '#D97706' }}
                >
                  {i + 1}
                </span>
                <p
                  className="text-[11px] font-medium"
                  style={{
                    color: checked[i] ? '#059669' : '#333',
                    textDecoration: checked[i] ? 'line-through' : 'none',
                  }}
                >
                  {target.text}
                </p>
              </div>
            </div>

            {/* Priority */}
            <span
              className="px-1.5 py-0.5 rounded text-[9px] font-medium flex-shrink-0"
              style={{
                background: target.priority === 'high' ? '#FEE2E2' : '#FEF3C7',
                color: target.priority === 'high' ? '#DC2626' : '#D97706',
              }}
            >
              {target.priority === 'high' ? '重要' : '一般'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
