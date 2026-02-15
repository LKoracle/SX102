interface HeaderProps {
  isSpeaking: boolean;
  onStopSpeaking: () => void;
}

export function Header({ isSpeaking, onStopSpeaking }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-[#667eea] to-[#764ba2] pt-10 pb-4 px-5 relative z-10 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <h1 className="text-[18px] font-semibold text-white">万能营销</h1>
        </div>

        <div className="flex items-center gap-3">
          {isSpeaking && (
            <button
              onClick={onStopSpeaking}
              className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white font-medium transition-all hover:bg-white/30"
            >
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-white rounded-full"
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

          <button className="w-6 h-6 flex items-center justify-center text-white transition-transform active:scale-90">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
