import { useState, useEffect } from 'react';

export function TypingIndicator() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 0.1);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 mb-4 animate-fade-in-up">
      <div className="flex gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4B7BF5] to-[#6366F1] flex-shrink-0 flex items-center justify-center mt-0.5">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ animation: 'spin-slow 3s linear infinite' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>

        <div className="bg-white rounded-[18px] rounded-tl-[4px] px-4 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center gap-2">
          <span className="text-[14px] text-[#8B8FA7] font-medium">深度思考中</span>
          <span className="text-[13px] text-[#8B8FA7]/60">&middot;</span>
          <span className="text-[13px] text-[#4B7BF5] font-medium">{elapsed.toFixed(1)}s</span>
          <span className="flex items-center gap-0.5 ml-0.5">
            <span className="typing-dot w-1 h-1 bg-[#4B7BF5]/50 rounded-full"></span>
            <span className="typing-dot w-1 h-1 bg-[#4B7BF5]/50 rounded-full"></span>
            <span className="typing-dot w-1 h-1 bg-[#4B7BF5]/50 rounded-full"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
