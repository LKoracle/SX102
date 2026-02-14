export function TypingIndicator() {
  return (
    <div className="flex gap-2.5 mb-3 px-4 animate-fade-in-up">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-sm shadow-primary/20">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </div>
      <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-white/40">
        <div className="flex items-center gap-1">
          <span className="typing-dot w-2 h-2 bg-primary/40 rounded-full"></span>
          <span className="typing-dot w-2 h-2 bg-primary/40 rounded-full"></span>
          <span className="typing-dot w-2 h-2 bg-primary/40 rounded-full"></span>
        </div>
      </div>
    </div>
  );
}
