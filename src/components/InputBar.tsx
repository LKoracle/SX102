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
      if (text.trim()) {
        setTimeout(() => handleSend(), 200);
      }
    } else {
      setText('');
      onVoiceStart();
    }
  };

  // Voice mode - large centered mic button with gradient bg
  if (mode === 'voice' && !isListening) {
    return (
      <div className="bottom-gradient px-6 pt-6 pb-8 safe-area-bottom">
        <div className="flex items-center justify-center">
          {/* Large mic button */}
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-3 rounded-full bg-white/10 blur-sm" />
            <button
              onClick={handleVoiceToggle}
              disabled={disabled}
              className="relative w-[72px] h-[72px] rounded-full bg-white text-primary flex items-center justify-center shadow-xl active:scale-95 transition-transform disabled:opacity-50"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
              </svg>
            </button>
          </div>

          {/* Switch to keyboard - positioned to the right */}
          <button
            onClick={() => setMode('text')}
            className="absolute right-6 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-white/60 mt-3">点击开始语音对话</p>
      </div>
    );
  }

  // Listening mode - animated mic with gradient bg
  if (isListening) {
    return (
      <div className="bottom-gradient px-6 pt-5 pb-8 safe-area-bottom">
        {/* Transcript preview */}
        {text && (
          <div className="mb-4 px-4 py-2.5 bg-white/15 backdrop-blur-sm rounded-2xl text-sm text-white">
            {text}
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          {/* Voice wave indicator */}
          <div className="flex items-center gap-1.5 h-8">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <span
                key={i}
                className="w-1 bg-white/70 rounded-full"
                style={{
                  height: '24px',
                  animation: `voice-wave 0.5s ease-in-out infinite ${i * 0.07}s`,
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center w-full relative">
            {/* Cancel */}
            <button
              onClick={() => { onVoiceStop(); setText(''); }}
              className="absolute left-6 w-11 h-11 rounded-full bg-white/15 flex items-center justify-center text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Animated mic button */}
            <div className="relative">
              <button
                onClick={handleVoiceToggle}
                className="relative w-[72px] h-[72px] rounded-full bg-white text-secondary flex items-center justify-center shadow-xl animate-pulse-glow mic-ripple"
              >
                <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h12v12H6z" />
                </svg>
              </button>
            </div>

            {/* Send if has text */}
            <button
              onClick={() => { onVoiceStop(); if (text.trim()) setTimeout(handleSend, 200); }}
              className={`absolute right-6 w-11 h-11 rounded-full flex items-center justify-center ${
                text.trim() ? 'bg-white text-primary' : 'bg-white/15 text-white/50'
              }`}
              disabled={!text.trim()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          <p className="text-xs text-white/70 font-medium">正在聆听...</p>
        </div>
      </div>
    );
  }

  // Text input mode
  return (
    <div className="bg-white border-t border-gray-100 px-4 py-3 safe-area-bottom">
      <div className="flex items-center gap-3">
        {/* Switch to voice */}
        <button
          onClick={() => setMode('voice')}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-primary/20"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
          </svg>
        </button>

        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息..."
            disabled={disabled}
            className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all disabled:opacity-50"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            text.trim()
              ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/20'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
