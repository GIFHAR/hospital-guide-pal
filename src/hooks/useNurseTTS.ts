import { useEffect, useMemo, useRef, useState } from 'react';

type Options = {
  lang?: string;      // e.g. 'en-US'
  rate?: number;      // 0.1 - 10 (normal ~0.95-1.05)
  pitch?: number;     // 0 - 2
  volume?: number;    // 0 - 1
  preferredVoiceHints?: string[]; // keywords to match
};

export function useNurseTTS(options: Options = {}) {
  const {
    lang = 'en-US',
    rate = 0.98,
    pitch = 1.05,
    volume = 1,
    preferredVoiceHints = ['Google', 'Microsoft', 'Samantha', 'Natural', 'Neural'],
  } = options;

  const [ready, setReady] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const currentUtterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const load = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (v.length) setReady(true);
    };

    load();
    window.speechSynthesis.onvoiceschanged = load;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const pickVoice = useMemo(() => {
    if (!voices.length) return null;

    // 1) match language
    const langVoices = voices.filter(v => (v.lang || '').toLowerCase().startsWith(lang.toLowerCase().slice(0, 2)));
    const pool = langVoices.length ? langVoices : voices;

    // 2) try hints (more natural names first)
    const scored = pool
      .map(v => {
        const name = (v.name || '').toLowerCase();
        const hintScore = preferredVoiceHints.reduce((acc, h, idx) => {
          if (name.includes(h.toLowerCase())) return acc + (preferredVoiceHints.length - idx) * 10;
          return acc;
        }, 0);
        const localBoost = v.localService ? 2 : 0;
        return { v, score: hintScore + localBoost };
      })
      .sort((a, b) => b.score - a.score);

    return scored[0]?.v ?? pool[0];
  }, [voices, lang, preferredVoiceHints]);

  const stop = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    currentUtterRef.current = null;
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    stop();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    u.pitch = pitch;
    u.volume = volume;
    if (pickVoice) u.voice = pickVoice;

    currentUtterRef.current = u;
    window.speechSynthesis.speak(u);
  };

  return { ready, voices, speak, stop, voice: pickVoice };
}