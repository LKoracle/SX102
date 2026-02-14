interface HeaderProps {
  isSpeaking: boolean;
  onStopSpeaking: () => void;
}

export function Header({ isSpeaking, onStopSpeaking }: HeaderProps) {
  return (
    <header className="glass border-b border-white/20 px-4 py-3 flex items-center justify-between relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
        <div>
          <h1 className="text-[15px] font-semibold leading-tight text-text">AI智能助理</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
            <span className="text-xs text-text-secondary">在线</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
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
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-secondary">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
