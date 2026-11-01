import { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const useSpeechRecognition = () => {
  const { preferences } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const hasSupport =
    typeof window !== 'undefined' &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = preferences.language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.warn('SpeechRecognition error:', event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone access was denied. Please allow microphone permissions or type your question below.');
        } else if (event.error === 'no-speech') {
          setError('No voice detected. Please speak closer to your microphone or type below.');
        } else {
          setError('Could not understand voice. Please try again or type below.');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [preferences.language]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or type your message.');
      return;
    }
    setError(null);
    setTranscript('');
    try {
      recognitionRef.current.start();
    } catch {
      try {
        recognitionRef.current.abort();
        setTimeout(() => recognitionRef.current?.start(), 100);
      } catch (err) {
        console.warn('Failed to start speech recognition', err);
      }
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    transcript,
    error,
    hasSupport,
    startListening,
    stopListening,
    setTranscript,
    clearError: () => setError(null),
  };
};
