export function TypingIndicator() {
  return (
    <div className="mb-8 px-5 animate-fade-in-up">
      <div className="inline-block bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></span>
          <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></span>
          <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full"></span>
        </div>
      </div>
    </div>
  );
}
