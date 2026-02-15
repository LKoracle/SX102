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

  // Voice mode
  if (mode === 'voice' && !isListening) {
    return (
      <div className="bg-white border-t border-[#ECEDF3]/50 px-6 pt-5 pb-6">
        <div className="flex items-center justify-center relative">
          <button
            onClick={handleVoiceToggle}
            disabled={disabled}
            className="w-16 h-16 rounded-full bg-[#4B7BF5] flex items-center justify-center shadow-lg shadow-[#4B7BF5]/25 active:scale-95 transition-transform disabled:opacity-50"
          >
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
            </svg>
          </button>

          <button
            onClick={() => setMode('text')}
            className="absolute right-0 w-10 h-10 rounded-full bg-[#F0F1F5] flex items-center justify-center text-[#8B8FA7]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
            </svg>
          </button>
        </div>
        <p className="text-center text-[11px] text-[#8B8FA7] mt-3">点击开始语音对话</p>
      </div>
    );
  }

  // Listening mode
  if (isListening) {
    return (
      <div className="bg-white border-t border-[#ECEDF3]/50 px-6 pt-4 pb-6">
        {text && (
          <div className="mb-3 px-3.5 py-2 bg-[#EEF3FE] rounded-2xl text-[13px] text-[#1A1D26]">
            {text}
          </div>
        )}

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1 h-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <span
                key={i}
                className="w-[3px] bg-[#4B7BF5]/60 rounded-full"
                style={{
                  height: '20px',
                  animation: `voice-wave 0.5s ease-in-out infinite ${i * 0.07}s`,
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center w-full relative">
            <button
              onClick={() => { onVoiceStop(); setText(''); }}
              className="absolute left-4 w-10 h-10 rounded-full bg-[#F0F1F5] flex items-center justify-center text-[#8B8FA7]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={handleVoiceToggle}
              className="w-16 h-16 rounded-full bg-[#4B7BF5] flex items-center justify-center shadow-lg shadow-[#4B7BF5]/25 animate-pulse-glow"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h12v12H6z" />
              </svg>
            </button>

            <button
              onClick={() => { onVoiceStop(); if (text.trim()) setTimeout(handleSend, 200); }}
              className={`absolute right-4 w-10 h-10 rounded-full flex items-center justify-center ${
                text.trim() ? 'bg-[#4B7BF5] text-white' : 'bg-[#F0F1F5] text-[#8B8FA7]/40'
              }`}
              disabled={!text.trim()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          <p className="text-[11px] text-[#4B7BF5] font-medium">正在聆听...</p>
        </div>
      </div>
    );
  }

  // Text input mode
  return (
    <div className="bg-white border-t border-[#ECEDF3]/50 px-4 py-3">
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setMode('voice')}
          className="w-9 h-9 rounded-full bg-[#4B7BF5] flex items-center justify-center text-white flex-shrink-0 shadow-sm shadow-[#4B7BF5]/20"
        >
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
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
            className="w-full bg-[#F0F1F5] rounded-full px-4 py-2 text-[13px] outline-none focus:ring-2 focus:ring-[#4B7BF5]/15 transition-all disabled:opacity-50 placeholder:text-[#8B8FA7]/60"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
            text.trim()
              ? 'bg-[#4B7BF5] text-white shadow-sm shadow-[#4B7BF5]/20'
              : 'bg-[#F0F1F5] text-[#8B8FA7]/40'
          }`}
        >
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
