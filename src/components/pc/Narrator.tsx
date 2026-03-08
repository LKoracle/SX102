import { useState, useCallback, useRef, useEffect } from 'react';
import { useSpeech } from '../../hooks/useSpeech';

/**
 * PC-side narrator hook.
 * Delegates ALL TTS to the shared useSpeech hook — same voice, same engine,
 * same chunking and Chrome workaround as the mobile/外勤 side.
 * Only adds subtitle text state for the NarratorSubtitle overlay.
 */
export function useNarrator() {
  const [text, setText] = useState('');
  const speech = useSpeech();
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, []);

  const clearPoll = useCallback(() => {
    if (pollRef.current) { clearTimeout(pollRef.current); pollRef.current = null; }
  }, []);

  // Poll speechSynthesis.speaking to clear subtitle when done
  const startPoll = useCallback(() => {
    const check = () => {
      pollRef.current = setTimeout(() => {
        if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
          setText('');
        } else {
          check();
        }
      }, 400);
    };
    check();
  }, []);

  const speak = useCallback((line: string) => {
    clearPoll();
    setText(line);
    speech.speak(line);
    startPoll();
  }, [speech, clearPoll, startPoll]);

  const stop = useCallback(() => {
    clearPoll();
    speech.stopSpeaking();
    setText('');
  }, [speech, clearPoll]);

  return { narratorText: text, speak, stop };
}

export function NarratorSubtitle({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="narrator-bar">
      <span className="narrator-icon">🔊</span>
      <span className="narrator-text">{text}</span>
    </div>
  );
}
