import { useState, useRef, useEffect } from 'react';

interface InputBarProps {
  onSend: (text: string) => void;
  onVoiceStart: () => void;
  onVoiceStop: () => void;
  isListening: boolean;
  transcript: string;
  disabled?: boolean;
}

export function InputBar({
  onSend,
  onVoiceStart,
  onVoiceStop,
  isListening,
  transcript,
  disabled,
}: InputBarProps) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'voice' | 'text'>('voice');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (transcript && isListening) {
      setText(transcript);
    }
  }, [transcript, isListening]);

  useEffect(() => {
    if (mode === 'text' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode]);

  const handleSend = () => {
    const msg = text.trim();
    if (!msg) return;
    onSend(msg);
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      onVoiceStop();
    } else {
      setText('');
      onVoiceStart();
    }
  };

  // Voice mode - large button with pulse animation
  if (mode === 'voice' && !isListening) {
    return (
      <div className="bg-white border-t border-[#f0f0f0] px-6 pt-5 pb-7">
        <div className="flex items-center justify-center relative">
          <button
            onClick={handleVoiceToggle}
            disabled={disabled}
            className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all disabled:opacity-50 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #4A90E2 0%, #667eea 100%)',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
            }}
          >
            {/* Pulse animation layer */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #4A90E2 0%, #667eea 100%)',
                animation: 'voice-pulse 2s ease-out infinite',
              }}
            />
            {/* Mic icon */}
            <svg className="w-6 h-6 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <rect x="10" y="4" width="4" height="12" rx="2" />
              <path d="M6 12c0 3.314 2.686 6 6 6s6-2.686 6-6M12 18v4m-4 0h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </button>

          <button
            onClick={() => setMode('text')}
            className="absolute right-0 w-10 h-10 rounded-full bg-[#f8f9ff] flex items-center justify-center text-[#667eea] hover:bg-[#eef0ff] transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Listening mode
  if (isListening) {
    return (
      <div className="bg-white border-t border-[#f0f0f0] px-6 pt-4 pb-7">
        {text && (
          <div className="mb-3 px-3.5 py-2 bg-[#f8f9ff] rounded-2xl text-[14px] text-[#333]">
            {text}
          </div>
        )}

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1 h-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <span
                key={i}
                className="w-[3px] rounded-full"
                style={{
                  height: '20px',
                  background: 'linear-gradient(135deg, #4A90E2 0%, #667eea 100%)',
                  opacity: 0.6,
                  animation: `voice-wave 0.5s ease-in-out infinite ${i * 0.07}s`,
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center w-full relative">
            <button
              onClick={() => { onVoiceStop(); setText(''); }}
              className="absolute left-4 w-10 h-10 rounded-full bg-[#f8f9ff] flex items-center justify-center text-[#666] hover:bg-[#eef0ff] transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={handleVoiceToggle}
              className="relative w-16 h-16 rounded-full flex items-center justify-center animate-pulse-glow"
              style={{
                background: 'linear-gradient(135deg, #4A90E2 0%, #667eea 100%)',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              }}
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect width="12" height="12" x="6" y="6" />
              </svg>
            </button>

            <button
              onClick={() => { onVoiceStop(); }}
              className={`absolute right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                text.trim()
                  ? 'text-white hover:scale-105'
                  : 'bg-[#f8f9ff] text-[#999]'
              }`}
              style={text.trim() ? {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              } : {}}
              disabled={!text.trim()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          <p className="text-[12px] text-[#667eea] font-medium">正在聆听...</p>
        </div>
      </div>
    );
  }

  // Text input mode
  return (
    <div className="bg-white border-t border-[#f0f0f0] px-4 py-3">
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setMode('voice')}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          }}
        >
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <rect x="10" y="4" width="4" height="12" rx="2" />
            <path d="M6 12c0 3.314 2.686 6 6 6s6-2.686 6-6M12 18v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
        </button>

        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息..."
            disabled={disabled}
            className="w-full bg-[#f8f9ff] rounded-full px-4 py-2 text-[14px] outline-none focus:ring-2 focus:ring-[#667eea]/20 transition-all disabled:opacity-50 placeholder:text-[#999]"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            text.trim()
              ? 'text-white hover:scale-105'
              : 'bg-[#f8f9ff] text-[#999]'
          }`}
          style={text.trim() ? {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          } : {}}
        >
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
