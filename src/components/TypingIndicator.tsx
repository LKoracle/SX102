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
        {/* AI Avatar with breathing effect */}
        <div className="relative flex-shrink-0 mt-0.5">
          {/* Outer glow layer */}
          <div
            className="absolute inset-0 rounded-full animate-ai-breathe"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}
          />
          {/* Orbit ring */}
          <div
            className="absolute -inset-1 rounded-full animate-orbit"
            style={{
              border: '1px dashed rgba(59,130,246,0.25)',
            }}
          />
          {/* Core avatar */}
          <div
            className="relative w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
        </div>

        {/* Thinking bubble - glass */}
        <div
          className="rounded-[18px] rounded-tl-[4px] px-4 py-2.5 flex items-center gap-2"
          style={{
            background: 'rgba(255,255,255,0.70)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 8px 30px 0 rgba(37,99,235,0.06)',
            border: '1px solid rgba(255,255,255,0.80)',
          }}
        >
          <span className="text-[14px] text-[#475569] font-medium">深度思考中</span>
          <span className="text-[13px] text-[#475569]/60">&middot;</span>
          <span className="text-[13px] text-[#3B82F6] font-medium">{elapsed.toFixed(1)}s</span>
          <span className="flex items-center gap-0.5 ml-0.5">
            <span className="typing-dot w-1 h-1 bg-[#3B82F6]/50 rounded-full"></span>
            <span className="typing-dot w-1 h-1 bg-[#3B82F6]/50 rounded-full"></span>
            <span className="typing-dot w-1 h-1 bg-[#3B82F6]/50 rounded-full"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
