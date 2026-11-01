import React from 'react';
import { Mic, MicOff, Square } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MicrophoneButton = ({
  isListening,
  onStart,
  onStop,
  hasSupport = true,
  disabled = false,
  className = '',
}) => {
  const { preferences } = useApp();
  const isHi = preferences.language === 'hi';

  const handleClick = () => {
    if (disabled) return;
    if (isListening) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="relative">
        {/* Ripple effect rings when active */}
        {isListening && (
          <>
            <span className="absolute -inset-3 rounded-full bg-red-400 opacity-30 animate-ping" />
            <span className="absolute -inset-1.5 rounded-full bg-red-500 opacity-20 animate-pulse" />
          </>
        )}

        <button
          type="button"
          onClick={handleClick}
          disabled={disabled || !hasSupport}
          aria-label={
            isListening
              ? isHi ? 'सुनना बंद करें' : 'Stop listening'
              : isHi ? 'बोलने के लिए माइक दबाएं' : 'Tap microphone to speak'
          }
          className={`relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all transform active:scale-90 shadow-soft-lg focus-visible:ring-4 focus-visible:ring-[#005B46] ${
            isListening
              ? 'bg-[#C83D35] text-white hover:bg-red-700 ring-4 ring-red-200'
              : !hasSupport
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-300'
              : 'bg-[#16845B] hover:bg-[#005B46] text-white border-4 border-[#E1F3E3]'
          }`}
        >
          {isListening ? (
            <Square className="w-8 h-8 fill-current" />
          ) : !hasSupport ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-10 h-10" />
          )}
        </button>
      </div>

      <div className="text-center">
        <span
          className={`inline-block font-bold text-base sm:text-lg px-3 py-1 rounded-full ${
            isListening
              ? 'bg-red-100 text-[#C83D35] animate-pulse font-semibold'
              : 'text-[#153B35]'
          }`}
        >
          {isListening
            ? isHi ? '🎤 साथी सुन रहा है... बोलिए' : '🎤 Sathi is listening... speak now'
            : !hasSupport
            ? isHi ? 'माइक उपलब्ध नहीं है' : 'Microphone unavailable'
            : isHi ? 'बोलने के लिए टैप करें' : 'Tap to Speak'}
        </span>
      </div>
    </div>
  );
};
