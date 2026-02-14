import type { QuickReply } from '../types';

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  if (replies.length === 0) return null;

  return (
    <div className="px-5 py-2 animate-fade-in-up">
      <div className="flex flex-wrap gap-2.5">
        {replies.map((reply, index) => (
          <button
            key={`${reply.value}-${index}`}
            onClick={() => onSelect(reply)}
            className="inline-flex items-center px-5 py-2.5 bg-white border border-gray-200 text-text rounded-2xl text-sm hover:border-primary/40 hover:text-primary active:bg-primary active:text-white active:border-primary transition-all shadow-sm"
          >
            {reply.label}
          </button>
        ))}
      </div>
    </div>
  );
}
