import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MascotAvatar } from '../components/MascotAvatar';
import { MicrophoneButton } from '../components/MicrophoneButton';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { processAssistantQuery } from '../services/assistantService';
import { useApp } from '../context/AppContext';
import {
  Send,
  Volume2,
  Sparkles,
  ArrowRight,
  Globe,
  Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const VoiceAssistant = () => {
  const { preferences, setLanguage } = useApp();
  const isHi = preferences.language === 'hi';

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: isHi
        ? 'नमस्ते! मैं साथी हूँ। अपने फोन के बारे में मुझसे कोई भी सवाल पूछिए। मैं धैर्यपूर्वक आपकी मदद करूँगा।'
        : "Hello! I am Sathi, your voice partner. Ask me anything about your phone. I'm here to help you step by step!",
      timestamp: 'Just now',
      suggestions: [
        isHi ? 'व्हाट्सएप पर मैसेज कैसे भेजें?' : 'How do I send a message?',
        isHi ? 'वीडियो कॉल कैसे करें?' : 'How to make a video call?',
        isHi ? 'UPI PIN क्या है?' : 'What is a UPI PIN?',
        isHi ? 'लॉटरी वाला कॉल असली है क्या?' : 'Is a prize call real?',
      ],
    },
  ]);

  const { speak, stop, isSpeaking } = useSpeechSynthesis();
  const {
    isListening,
    transcript,
    error: micError,
    hasSupport: hasMicSupport,
    startListening,
    stopListening,
    setTranscript,
    clearError,
  } = useSpeechRecognition();

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isListening]);

  const handleSend = useCallback((userText) => {
    const textToSend = userText || inputQuery;
    if (!textToSend || !textToSend.trim()) return;

    const trimmed = textToSend.trim();

    // 1. Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
      timestamp: 'Just now',
    };

    // 2. Process through assistant service
    const assistantResult = processAssistantQuery(trimmed, preferences.language);

    const assistantMsg = {
      id: Date.now() + 1,
      sender: 'assistant',
      text: assistantResult.text,
      timestamp: 'Just now',
      suggestions: assistantResult.suggestions,
      actionLink: assistantResult.actionLink,
      actionText: assistantResult.actionText,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputQuery('');

    // Automatically speak the assistant response aloud
    speak(assistantResult.text, preferences.language);
  }, [inputQuery, preferences.language, speak]);

  // When speech recognition produces a final transcript
  useEffect(() => {
    if (transcript && !isListening) {
      handleSend(transcript);
      setTranscript('');
    }
  }, [isListening, transcript, handleSend, setTranscript]);

  const handleClearHistory = () => {
    stop();
    setMessages([
      {
        id: Date.now(),
        sender: 'assistant',
        text: isHi
          ? 'बातचीत रीसेट हो गई है। आप कोई भी नया सवाल पूछ सकते हैं!'
          : 'Conversation cleared. You can ask me any new question!',
        timestamp: 'Just now',
        suggestions: [
          isHi ? 'वीडियो कॉल कैसे करें?' : 'How to make a video call?',
          isHi ? 'UPI PIN क्या है?' : 'What is a UPI PIN?',
        ],
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 flex flex-col h-[calc(100vh-100px)]">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b-2 border-[#D7E4DD] shrink-0">
        <div className="flex items-center gap-3">
          <MascotAvatar
            size="md"
            mood={isListening ? 'listening' : isSpeaking ? 'speaking' : 'happy'}
            isSpeaking={isSpeaking}
            isListening={isListening}
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#005B46]">
              {isHi ? 'साथी — आपका वॉइस पार्टनर' : 'Sathi — Your Voice Partner'}
            </h1>
            <p className="text-xs sm:text-sm text-[#526B65] font-semibold">
              {isHi
                ? 'अपने फोन के बारे में कुछ भी पूछें। मैं आपकी पूरी मदद करूँगा।'
                : "Ask me anything about your phone. I'm here to help!"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language toggle for assistant */}
          <button
            type="button"
            onClick={() => setLanguage(isHi ? 'en' : 'hi')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#D7E4DD] bg-white text-xs sm:text-sm font-bold text-[#005B46] hover:border-[#16845B]"
          >
            <Globe className="w-4 h-4 text-[#16845B]" />
            <span>{isHi ? 'English' : 'हिन्दी'}</span>
          </button>

          {/* Clear chat */}
          <button
            type="button"
            onClick={handleClearHistory}
            className="p-2 rounded-xl border border-[#D7E4DD] bg-white text-slate-500 hover:text-red-600 hover:border-red-300 transition-colors"
            title="Clear Chat"
            aria-label="Clear chat conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mic Error Banner if any */}
      {micError && (
        <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-2xl text-xs sm:text-sm text-amber-900 mt-2 flex items-center justify-between shrink-0">
          <span>⚠️ {micError}</span>
          <button
            type="button"
            onClick={clearError}
            className="text-xs font-bold text-amber-800 underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Conversation Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 shadow-sm text-base sm:text-lg font-medium leading-relaxed ${
                  isUser
                    ? 'bg-[#005B46] text-white rounded-br-none'
                    : 'bg-white border-2 border-[#D7E4DD] text-[#153B35] rounded-bl-none'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-[#16845B] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Digital Sathi
                    </span>

                    {/* Audio replay button */}
                    <button
                      type="button"
                      onClick={() => speak(msg.text, preferences.language)}
                      className="p-1.5 rounded-lg bg-[#E8F6F0] text-[#005B46] hover:bg-[#d6f0e4] transition-colors focus-visible:ring-2 focus-visible:ring-[#005B46]"
                      title="Replay Audio"
                      aria-label="Replay audio of this message"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Optional Action Button Link (e.g. Try Sandbox) */}
                {msg.actionLink && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <Link
                      to={msg.actionLink}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#E1F3E3] hover:bg-[#cbeacf] text-[#005B46] font-extrabold text-sm sm:text-base rounded-xl transition-all shadow-sm"
                    >
                      <span>{msg.actionText || (isHi ? 'यहाँ देखें' : 'View Lesson')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Suggested Questions below the latest assistant message */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2.5 max-w-[85%]">
                  {msg.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(suggestion)}
                      className="text-xs sm:text-sm font-bold bg-[#FAF9F3] hover:bg-[#E8F6F0] text-[#005B46] border-2 border-[#D7E4DD] hover:border-[#16845B] px-3.5 py-1.5 rounded-2xl transition-all active:scale-95 shadow-sm text-left"
                    >
                      💬 {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Live Listening transcript feedback */}
        {isListening && transcript && (
          <div className="flex justify-end">
            <div className="bg-red-50 border-2 border-red-300 text-red-900 rounded-3xl p-4 max-w-[80%] text-sm font-semibold animate-pulse">
              🎤 {transcript} ...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Controls (Voice and Text) */}
      <div className="pt-3 border-t-2 border-[#D7E4DD] bg-[#FAF9F3] shrink-0 space-y-3">
        {/* Large Centered Microphone for seniors */}
        <div className="flex justify-center -mt-2">
          <MicrophoneButton
            isListening={isListening}
            hasSupport={hasMicSupport}
            onStart={startListening}
            onStop={stopListening}
          />
        </div>

        {/* Text Input Row as fully functional accessible alternative */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              isHi
                ? 'या यहाँ अपना सवाल लिखें (उदा. मैसेज कैसे भेजें)...'
                : 'Or type your question here (e.g., How to make a call)...'
            }
            className="flex-1 px-4 py-3.5 text-base sm:text-lg rounded-2xl border-2 border-[#D7E4DD] focus:border-[#005B46] bg-white text-[#153B35] font-medium focus:outline-none focus:ring-4 focus:ring-[#005B46]/20 shadow-sm"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="px-5 py-3.5 bg-[#005B46] hover:bg-[#16845B] disabled:bg-slate-300 text-white font-extrabold rounded-2xl shadow-sm transition-all active:scale-95 flex items-center justify-center focus-visible:ring-4 focus-visible:ring-[#005B46]"
            aria-label="Send question"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};
