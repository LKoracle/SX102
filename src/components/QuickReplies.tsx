import type { QuickReply } from '../types';

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  if (replies.length === 0) return null;

  return (
    <div className="px-5 py-4 animate-fade-in-up">
      <div className="grid grid-cols-2 quick-reply-gap">
        {replies.map((reply, index) => (
          <button
            key={`${reply.value}-${index}`}
            onClick={() => onSelect(reply)}
            className="px-4 py-3 bg-white border border-gray-200 text-text rounded-2xl text-sm text-center hover:border-primary/40 hover:text-primary active:bg-primary active:text-white active:border-primary transition-all shadow-sm"
          >
            {reply.label}
          </button>
        ))}
      </div>
    </div>
  );
}
