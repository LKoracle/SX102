import type { QuickReply } from '../types';

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  if (replies.length === 0) return null;

  return (
    <div className="px-4 pb-3 animate-fade-in-up">
      <div className="flex flex-wrap gap-2">
        {replies.map((reply, index) => (
          <button
            key={`${reply.value}-${index}`}
            onClick={() => onSelect(reply)}
            className="px-3.5 py-2 bg-white border border-[#4B7BF5]/20 text-[#4B7BF5] rounded-full text-[12.5px] font-medium hover:bg-[#4B7BF5]/5 active:bg-[#4B7BF5] active:text-white active:border-[#4B7BF5] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            {reply.label}
          </button>
        ))}
      </div>
    </div>
  );
}
