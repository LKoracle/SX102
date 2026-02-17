import { useState, useCallback, useRef } from 'react';

interface UseSpeechReturn {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  supported: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSpeechRecognition = (): (new () => any) | null => {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
};

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
 * Split text into sentence-sized chunks so the synthesiser can add
 * natural pauses between them, which sounds much more human.
 */
function splitIntoSentences(text: string): string[] {
  // Clean markdown / emoji cruft first
  const clean = text
    .replace(/[#*_~`|>\-]/g, '')
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    .trim();

  // Split on Chinese and Latin sentence-ending punctuation
  const parts = clean.split(/(?<=[。！？；\n])/);
  return parts.map((s) => s.trim()).filter(Boolean);
}

export function useSpeech(): UseSpeechReturn {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<number | null>(null);

  const SILENCE_TIMEOUT = 1500; // 1.5秒静默后自动发送

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
        text += results[i][0].transcript;
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
    const sentences = splitIntoSentences(text);
    if (sentences.length === 0) return;

    setIsSpeaking(true);

    // Queue each sentence as a separate utterance – the browser plays
    // them sequentially with natural micro-pauses in between.
    sentences.forEach((sentence, idx) => {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'zh-CN';
      // Slightly slower than default → more natural cadence
      utterance.rate = 0.95;
      // Gentle pitch for a warm tone
      utterance.pitch = 1.05;
      utterance.volume = 1.0;

      if (voice) utterance.voice = voice;

      // Only the last sentence triggers the "done" callback
      if (idx === sentences.length - 1) {
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
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
    stopSpeaking,
    supported,
  };
}
