interface HeaderProps {
  isSpeaking: boolean;
  onStopSpeaking: () => void;
}

export function Header({ isSpeaking, onStopSpeaking }: HeaderProps) {
  return (
    <header className="bg-white pt-10 pb-3 px-4 relative z-10">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <h1 className="text-[17px] font-semibold text-text">万能营销</h1>
        </div>

        <div className="flex items-center gap-2">
          {isSpeaking && (
            <button
              onClick={onStopSpeaking}
              className="flex items-center gap-1 bg-primary/10 rounded-full px-2.5 py-1 text-xs text-primary font-medium"
            >
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-primary rounded-full"
                    style={{
                      height: '10px',
                      animation: `voice-wave 0.5s ease-in-out infinite ${i * 0.1}s`,
                    }}
                  />
                ))}
              </span>
              停止
            </button>
          )}

          {/* Avatar group */}
          <div className="flex items-center">
            <div className="flex -space-x-1.5">
              {['#4B7BF5', '#6366F1', '#818CF8'].map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold"
                  style={{ background: color, zIndex: 3 - i }}
                />
              ))}
            </div>
            <span className="text-[11px] text-text-secondary ml-1.5">等12人</span>
          </div>

          {/* Menu icon */}
          <button className="w-8 h-8 flex items-center justify-center text-text-secondary">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
