interface HeaderProps {
  isSpeaking: boolean;
  onStopSpeaking: () => void;
}

export function Header({ isSpeaking, onStopSpeaking }: HeaderProps) {
  return (
    <header className="bg-white/60 backdrop-blur-xl border-b border-gray-100/50 px-5 py-3.5 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-3">
        {/* Back arrow */}
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <div>
          <h1 className="text-[17px] font-semibold text-gray-900 leading-tight">万能营销</h1>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {isSpeaking && (
          <button
            onClick={onStopSpeaking}
            className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5 text-xs text-primary font-medium"
          >
            <span className="flex items-center gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="w-0.5 bg-primary rounded-full"
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
        <button className="w-8 h-8 rounded-full bg-gray-100/80 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
