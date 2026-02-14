interface HeaderProps {
  isSpeaking: boolean;
  onStopSpeaking: () => void;
}

export function Header({ isSpeaking, onStopSpeaking }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-primary via-secondary to-purple-600 text-white px-5 py-4 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-3">
        {/* Back arrow */}
        <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <div>
          <h1 className="text-base font-semibold leading-tight">万能营销</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></span>
            <span className="text-xs text-white/70">在线</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isSpeaking && (
          <button
            onClick={onStopSpeaking}
            className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs"
          >
            <span className="flex items-center gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="w-0.5 bg-white rounded-full"
                  style={{
                    height: '12px',
                    animation: `voice-wave 0.6s ease-in-out infinite ${i * 0.1}s`,
                  }}
                />
              ))}
            </span>
            停止
          </button>
        )}
        <button className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
