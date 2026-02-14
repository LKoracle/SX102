import type { QuickReply } from '../types';

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  if (replies.length === 0) return null;

  return (
    <div className="px-4 pb-2 animate-fade-in-up">
      <div className="flex flex-wrap gap-2">
        {replies.map((reply, index) => (
          <button
            key={`${reply.value}-${index}`}
            onClick={() => onSelect(reply)}
            className="inline-flex items-center px-4 py-2 bg-white border border-primary/30 text-primary rounded-full text-sm font-medium hover:bg-primary-50 active:bg-primary active:text-white transition-all shadow-sm"
          >
            {reply.label}
          </button>
        ))}
      </div>
    </div>
  );
}
