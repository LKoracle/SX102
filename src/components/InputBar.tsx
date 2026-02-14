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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (transcript && isListening) {
      setText(transcript);
    }
  }, [transcript, isListening]);

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

  return (
    <div className="bg-white border-t border-gray-200 px-3 py-2 safe-area-bottom">
      {isListening && (
        <div className="flex items-center justify-center gap-2 py-2 text-primary text-sm">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="w-1 bg-primary rounded-full"
                style={{
                  height: '16px',
                  animation: `voice-wave 0.5s ease-in-out infinite ${i * 0.08}s`,
                }}
              />
            ))}
          </div>
          <span>正在聆听...</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? '语音识别中...' : '输入消息...'}
            disabled={disabled}
            className="w-full bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
          />
        </div>

        <button
          onClick={handleVoiceToggle}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
            isListening
              ? 'bg-danger text-white animate-pulse-glow'
              : 'bg-gray-100 text-gray-500 active:bg-gray-200'
          }`}
        >
          {isListening ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
            </svg>
          )}
        </button>

        {text.trim() && (
          <button
            onClick={handleSend}
            disabled={disabled}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 active:bg-primary-dark transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
