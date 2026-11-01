import { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const useSpeechSynthesis = () => {
  const { preferences } = useApp();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const hasSupport = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const utteranceRef = useRef(null);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(
    (text, overrideLang) => {
      if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      // Clean text of markdown or special characters
      const cleanText = text
        .replace(/[*_#`~]/g, '')
        .replace(/https?:\/\/\S+/g, 'link')
        .replace(/₹/g, 'rupees ');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utteranceRef.current = utterance;

      const targetLang = overrideLang || preferences.language || 'en';
      utterance.lang = targetLang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = preferences.speechRate || 0.88; // Slower, clear pace for seniors
      utterance.pitch = 1.0;

      // Try to find a warm, natural sounding voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const matchingVoice = voices.find((v) =>
          targetLang === 'hi'
            ? v.lang.startsWith('hi')
            : v.lang.startsWith('en-IN') || v.lang.startsWith('en-GB') || v.lang.startsWith('en-US')
        );
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('SpeechSynthesis error:', e.error);
        }
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [preferences.language, preferences.speechRate]
  );

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    hasSupport,
  };
};
