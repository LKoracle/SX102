import { useState, useCallback, useRef } from 'react';

interface UseSpeechReturn {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  enqueueSpeak: (text: string) => void;
  narrate: (text: string, onEnd?: () => void) => void;
  stopSpeaking: () => void;
  supported: boolean;
}

function stripPunct(text: string): string {
  return text.replace(/[。！？，、；：…]/g, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSpeechRecognition = (): (new () => any) | null => {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
};

/**
 * Pick a male Chinese voice for narrator/旁白.
 * Prefers Azure neural male voices exposed by Chrome/Edge.
 * Falls back to any zh voice that is not the best female voice.
 */
function pickMaleZhVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const zhVoices = voices.filter((v) => v.lang.startsWith('zh'));
  if (zhVoices.length === 0) return null;

  const maleKeywords = ['Yunxi', 'Yunyang', 'Yunjian', 'Yunfeng', 'Yunhao', 'Male'];
  for (const kw of maleKeywords) {
    const match = zhVoices.find((v) => v.name.includes(kw));
    if (match) return match;
  }
  // Fallback: pick any voice other than the best female pick
  const femaleVoice = pickBestZhVoice();
  return zhVoices.find((v) => v !== femaleVoice) ?? null;
}

/**
 * Pick the most natural-sounding Chinese voice available.
 * Prefer voices whose name contains keywords like "Natural", "Premium",
 * "Xiaoxiao", "Yunxi" (Azure neural voices that Chrome/Edge expose),
 * then fall back to any zh voice.
 */
function pickBestZhVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const zhVoices = voices.filter((v) => v.lang.startsWith('zh'));
  if (zhVoices.length === 0) return null;

  // Rank by quality keywords (order matters – first match wins)
  const qualityKeywords = ['Natural', 'Premium', 'Enhanced', 'Neural', 'Xiaoxiao', 'Yunxi', 'Female'];
  for (const kw of qualityKeywords) {
    const match = zhVoices.find((v) => v.name.includes(kw));
    if (match) return match;
  }
  // Prefer non-local (network) voices – they tend to sound better
  const remote = zhVoices.find((v) => !v.localService);
  if (remote) return remote;

  return zhVoices[0];
}

/**
 * Clean and chunk text for speech synthesis.
 * Keeps chunks large enough to sound fluent while still allowing the
 * synthesiser to insert micro-pauses at natural boundaries.
 */
function splitIntoChunks(text: string): string[] {
  const clean = text
    .replace(/[#*_~`|>\-]/g, '')
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    .trim();

  // Split on major sentence boundaries only (。！？and newlines).
  // Semicolons and commas stay inside the chunk so the engine reads
  // them fluidly instead of inserting awkward pauses.
  const parts = clean.split(/(?<=[。！？\n])/);
  const trimmed = parts.map((s) => s.trim()).filter(Boolean);

  // Merge short fragments (< 8 chars) into the previous chunk so the
  // engine doesn't produce choppy micro-utterances.
  const merged: string[] = [];
  for (const seg of trimmed) {
    if (merged.length > 0 && seg.length < 8) {
      merged[merged.length - 1] += seg;
    } else {
      merged.push(seg);
    }
  }
  return merged;
}

export function useSpeech(): UseSpeechReturn {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<number | null>(null);
  // Session counter for narrate() – incremented on each call so a cancelled
  // narration never fires its onEnd callback.
  const narrateSessionRef = useRef(0);

  const SILENCE_TIMEOUT = 1000; // 1秒静默后自动发送

  const supported =
    !!getSpeechRecognition() &&
    typeof window !== 'undefined' &&
    typeof window.speechSynthesis !== 'undefined';

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current !== null) {
      window.clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognitionCtor = getSpeechRecognition();
    if (!SpeechRecognitionCtor) return;

    setTranscript('');

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = 'zh-CN';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const results = event.results;
      let text = '';
      for (let i = 0; i < results.length; i++) {
        const seg = results[i][0].transcript.trim();
        if (!seg) continue;
        text += stripPunct(seg);
      }
      setTranscript(text);

      // 每次收到新结果，重置静默计时器
      clearSilenceTimer();
      silenceTimerRef.current = window.setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      }, SILENCE_TIMEOUT);
    };

    recognition.onend = () => {
      clearSilenceTimer();
      setIsListening(false);
    };
    recognition.onerror = () => {
      clearSilenceTimer();
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [clearSilenceTimer]);

  const stopListening = useCallback(() => {
    clearSilenceTimer();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [clearSilenceTimer]);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const voice = pickBestZhVoice();
    const chunks = splitIntoChunks(text);
    if (chunks.length === 0) return;

    setIsSpeaking(true);

    chunks.forEach((chunk, idx) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = 'zh-CN';
      utterance.rate = 1.25;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      if (voice) utterance.voice = voice;

      if (idx === chunks.length - 1) {
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
      }

      window.speechSynthesis.speak(utterance);
    });
  }, []);

  /** Queue speech WITHOUT cancelling ongoing utterances. */
  const enqueueSpeak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const voice = pickBestZhVoice();
    const chunks = splitIntoChunks(text);
    if (chunks.length === 0) return;

    setIsSpeaking(true);

    chunks.forEach((chunk) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = 'zh-CN';
      utterance.rate = 1.25;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
          setIsSpeaking(false);
        }
      };
      utterance.onerror = () => {
        if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
          setIsSpeaking(false);
        }
      };

      window.speechSynthesis.speak(utterance);
    });
  }, []);

  /**
   * Male-voice narrator. Cancels any ongoing speech, then speaks text using a
   * male zh voice (lower pitch/rate to sound distinct from the AI chat voice).
   * onEnd fires only if this narration is NOT interrupted by a subsequent call.
   */
  const narrate = useCallback((text: string, onEnd?: () => void) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      onEnd?.();
      return;
    }

    window.speechSynthesis.cancel();
    narrateSessionRef.current += 1;
    const session = narrateSessionRef.current;

    const voice = pickMaleZhVoice();
    const chunks = splitIntoChunks(text);
    if (chunks.length === 0) {
      onEnd?.();
      return;
    }

    setIsSpeaking(true);

    chunks.forEach((chunk, idx) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = 'zh-CN';
      utterance.rate = 1.05;   // slightly deliberate for narration
      utterance.pitch = 0.85;  // lower pitch for male/narrator feel
      utterance.volume = 1.0;
      if (voice) utterance.voice = voice;

      if (idx === chunks.length - 1) {
        utterance.onend = () => {
          if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
            setIsSpeaking(false);
          }
          // Only fire callback if this narration was not superseded
          if (narrateSessionRef.current === session) {
            onEnd?.();
          }
        };
        utterance.onerror = () => {
          if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
            setIsSpeaking(false);
          }
          // Cancelled/interrupted – do NOT call onEnd
        };
      }

      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    speak,
    enqueueSpeak,
    narrate,
    stopSpeaking,
    supported,
  };
}
