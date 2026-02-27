import { useState } from 'react';

interface KeyPoint {
  point: string;
  example: string;
}

interface ObjectionItem {
  objection: string;
  response: string;
}

interface CoachingSpeakingPointCardProps {
  data: Record<string, unknown>;
}

export function CoachingSpeakingPointCard({ data }: CoachingSpeakingPointCardProps) {
  const topic = (data.topic as string) || '面谈';
  const openingLine = (data.openingLine as string) || '';
  const keyPoints = (data.keyPoints as KeyPoint[]) || [];
  const objectionHandling = (data.objectionHandling as ObjectionItem[]) || [];

  const [expandedPoint, setExpandedPoint] = useState<number | null>(null);
  const [expandedObjection, setExpandedObjection] = useState<number | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">💬 {topic}面谈话术</h3>
      </div>

      <div className="p-3 space-y-3 max-h-[500px] overflow-y-auto">
        {/* 开场白 */}
        {openingLine && (
          <div className="bg-gradient-to-r from-[#F3E8FF] to-[#FCE7F3] rounded-[14px] p-3 border-l-4 border-[#8B5CF6]">
            <p className="text-[11px] font-medium text-[#6B21A8] mb-2">🎤 建议开场白</p>
            <p className="text-[13px] text-[#5E1B8C] leading-relaxed font-medium">{openingLine}</p>
            <button
              onClick={() => copyToClipboard(openingLine)}
              className="mt-2 text-[10px] px-2 py-1 rounded bg-white/50 text-[#6B21A8] hover:bg-white transition-colors"
            >
              复制
            </button>
          </div>
        )}

        {/* 关键话术 */}
        {keyPoints.length > 0 && (
          <div className="space-y-2">
            <p className="text-[12px] font-medium text-[#333]">📌 3步面谈框架</p>
            {keyPoints.map((item: KeyPoint, i: number) => (
              <div key={i} className="border border-gray-100 rounded-[10px] overflow-hidden">
                <button
                  onClick={() => setExpandedPoint(expandedPoint === i ? null : i)}
                  className="w-full bg-gradient-to-r from-[#F3E8FF] to-[#FCE7F3] px-3 py-2 flex items-center justify-between hover:from-[#E9D5FF] hover:to-[#F9D8E7] transition-colors"
                >
                  <span className="text-[12px] font-semibold text-[#7C3AED]">
                    {i + 1}. {item.point}
                  </span>
                  <span className="text-[10px] text-[#7C3AED]">
                    {expandedPoint === i ? '▼' : '▶'}
                  </span>
                </button>
                {expandedPoint === i && (
                  <div className="bg-white px-3 py-2.5 space-y-2 border-t border-gray-100">
                    <p className="text-[12px] text-[#666] leading-relaxed">{item.example}</p>
                    <button
                      onClick={() => copyToClipboard(item.example)}
                      className="text-[10px] px-2 py-1 rounded bg-[#F3E8FF] text-[#7C3AED] hover:bg-[#E9D5FF] transition-colors"
                    >
                      复制话术
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 异议处理 */}
        {objectionHandling.length > 0 && (
          <div className="space-y-2">
            <p className="text-[12px] font-medium text-[#333]">🛡️ 可能的异议与应对</p>
            {objectionHandling.map((item: ObjectionItem, i: number) => (
              <div key={i} className="border border-[#FED7AA] rounded-[10px] overflow-hidden bg-gradient-to-r from-[#FEF3C7]/30 to-[#FECACA]/20">
                <button
                  onClick={() => setExpandedObjection(expandedObjection === i ? null : i)}
                  className="w-full px-3 py-2 flex items-center justify-between hover:bg-[#FEF3C7]/50 transition-colors text-left"
                >
                  <span className="text-[12px] font-medium text-[#D97706] flex items-start gap-1.5 flex-1">
                    <span className="flex-shrink-0">Q:</span>
                    <span>{item.objection}</span>
                  </span>
                  <span className="text-[10px] text-[#D97706] flex-shrink-0 ml-2">
                    {expandedObjection === i ? '▼' : '▶'}
                  </span>
                </button>
                {expandedObjection === i && (
                  <div className="bg-white/70 px-3 py-2.5 space-y-2 border-t border-[#FED7AA]">
                    <p className="text-[12px] text-[#666] leading-relaxed flex items-start gap-1.5">
                      <span className="text-[10px] text-[#D97706] font-bold flex-shrink-0 mt-0.5">A:</span>
                      <span>{item.response}</span>
                    </p>
                    <button
                      onClick={() => copyToClipboard(item.response)}
                      className="text-[10px] px-2 py-1 rounded bg-[#FEF3C7] text-[#D97706] hover:bg-[#FED7AA] transition-colors"
                    >
                      复制应对
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 面谈建议 */}
        <div className="bg-gradient-to-r from-[#ECFDF5] to-[#DBEAFE] rounded-[12px] p-2.5">
          <p className="text-[11px] text-[#059669] font-medium">✨ 面谈小贴士</p>
          <ul className="text-[10px] text-[#047857] mt-1 space-y-0.5">
            <li>• 多倾听，充分了解对方的想法</li>
            <li>• 用数据和案例支撑观点</li>
            <li>• 结束时确认下一步行动和时间</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
