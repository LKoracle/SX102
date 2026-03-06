import { useState } from 'react';

interface CoachingRecordCardProps {
  data: Record<string, unknown>;
}

export function CoachingRecordCard({ data }: CoachingRecordCardProps) {
  const [records, setRecords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const memberName = (data.memberName as string) || '团队成员';
  const topics = (data.topics as string[]) || ['业绩分析', '改进建议', '行动计划'];

  const addRecord = () => {
    if (inputValue.trim()) {
      setRecords([...records, inputValue]);
      setInputValue('');
    }
  };

  const summary = {
    keyPoints: [
      '本次面谈主要讨论了业绩完成情况和市场机遇',
      '成员表示下月将重点关注客户拓展和产品升级',
      '约定下周进行定期跟进，及时调整策略',
    ],
    improvements: ['提升客户拜访频率', '加强专业知识培训', '优化面谈技巧'],
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📱 面谈中实时记录</h3>
      </div>

      <div className="p-3 space-y-3 max-h-[450px] overflow-y-auto">
        {/* 面谈成员信息 */}
        <div className="bg-gradient-to-r from-[#F3E8FF] to-[#FCE7F3] rounded-[14px] p-2.5 border-l-4 border-[#8B5CF6]">
          <p className="text-[12px] font-medium text-[#6B21A8] mb-1">与谁进行面谈</p>
          <p className="text-[13px] font-bold text-[#5E1B8C]">{memberName}</p>
        </div>

        {/* 面谈主题 */}
        <div className="space-y-1.5">
          <p className="text-[12px] font-medium text-[#333]">📌 面谈主题</p>
          <div className="flex flex-wrap gap-1">
            {topics.map((topic: string, i: number) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-[8px] bg-[#E9D5FF] text-[#6B21A8] text-[11px] font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* 实时记录区域 */}
        <div className="space-y-2">
          <p className="text-[12px] font-medium text-[#333]">✍️ 面谈要点实时记录</p>

          {/* 记录输入框 */}
          <div className="flex gap-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addRecord()}
              placeholder="输入面谈要点，按Enter添加..."
              className="flex-1 px-2.5 py-1.5 rounded-[8px] border border-[#E9D5FF] text-[12px] focus:outline-none focus:border-[#8B5CF6]"
            />
            <button
              onClick={addRecord}
              className="px-3 py-1.5 rounded-[8px] bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-white text-[11px] font-medium hover:shadow-md transition-all"
            >
              记录
            </button>
          </div>

          {/* 已记录的内容 */}
          {records.length > 0 && (
            <div className="bg-[#F3E8FF]/50 rounded-[10px] p-2 space-y-1">
              {records.map((record, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[11px] text-[#8B5CF6] font-bold flex-shrink-0">{i + 1}.</span>
                  <span className="text-[11px] text-[#5E1B8C]">{record}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 自动总结 */}
        <div className="space-y-2">
          <p className="text-[12px] font-medium text-[#333]">📋 面谈自动总结</p>

          <div className="bg-gradient-to-r from-[#F3E8FF]/30 to-[#DDD6FE]/30 rounded-[10px] p-2.5 space-y-2">
            <div>
              <p className="text-[11px] font-bold text-[#7C3AED] mb-1">核心要点：</p>
              {summary.keyPoints.map((point, i) => (
                <p key={i} className="text-[10px] text-[#5E1B8C] leading-relaxed mb-1">
                  {i + 1}. {point}
                </p>
              ))}
            </div>

            <div className="border-t border-[#E9D5FF] pt-2">
              <p className="text-[11px] font-bold text-[#7C3AED] mb-1">改进建议：</p>
              {summary.improvements.map((imp, i) => (
                <p key={i} className="text-[10px] text-[#5E1B8C] flex items-start gap-1 mb-1">
                  <span className="flex-shrink-0">→</span>
                  <span>{imp}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* 下一步提醒 */}
        <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FECACA] rounded-[12px] p-2.5">
          <p className="text-[11px] text-[#92400E] font-medium">💡 面谈结束后，系统将自动生成完整总结报告，支持导出和分享。</p>
        </div>
      </div>
    </div>
  );
}
