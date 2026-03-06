interface FieldReplyPreviewCardProps {
  data: Record<string, unknown>;
}

interface ReplyData {
  recipient: string;
  replyText: string;
  tips?: string[];
}

export function FieldReplyPreviewCard({ data }: FieldReplyPreviewCardProps) {
  const d = (data as unknown as ReplyData) || {
    recipient: '王哥',
    replyText: '',
    tips: [],
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#059669] to-[#10B981] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">✏️ 推荐回复</h3>
      </div>
      <div className="p-3 space-y-2.5 max-h-[450px] overflow-y-auto">
        {/* Recipient */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#999]">发送给：</span>
          <span className="px-2 py-0.5 rounded-full bg-green-50 text-[10px] font-medium text-[#059669] border border-green-200">
            👤 {d.recipient}
          </span>
        </div>

        {/* Reply text */}
        <div className="bg-green-50 rounded-[14px] p-3 border-l-[3px] border-[#10B981]">
          <p className="text-[11px] text-[#333] leading-[1.7] whitespace-pre-wrap">{d.replyText}</p>
        </div>

        {/* Tips */}
        {d.tips && d.tips.length > 0 && (
          <div className="bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] rounded-[14px] p-2.5">
            <div className="text-[10px] font-semibold text-[#059669] mb-1.5">💡 回复要点</div>
            {d.tips.map((t, i) => (
              <div key={i} className="flex items-start gap-1.5 mb-1">
                <span className="w-3.5 h-3.5 rounded-full bg-green-200 text-[8px] text-green-700 flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-[10px] text-[#059669]">{t}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
