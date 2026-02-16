import type { QuickReply } from '../types';

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  if (replies.length === 0) return null;

  return (
    <div className="px-5 pb-3 animate-fade-in-up">
      <div className="flex flex-wrap gap-2">
        {replies.map((reply, index) => (
          <button
            key={`${reply.value}-${index}`}
            onClick={() => onSelect(reply)}
            className="px-4 py-2 bg-[#f8f9ff] border border-[#e0e4ff] text-[#667eea] rounded-[12px] text-[13px] font-medium hover:bg-[#eef0ff] hover:border-[#667eea] active:bg-[#667eea] active:text-white transition-all"
          >
            {reply.label}
          </button>
        ))}
      </div>
    </div>
  );
}
