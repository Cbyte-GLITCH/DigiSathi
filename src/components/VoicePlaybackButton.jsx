import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { useApp } from '../context/AppContext';

export const VoicePlaybackButton = ({
  text,
  textHi,
  label = 'Hear Instructions',
  labelHi = 'निर्देश सुनें',
  size = 'md',
  className = '',
}) => {
  const { preferences } = useApp();
  const { speak, stop, isSpeaking, hasSupport } = useSpeechSynthesis();

  const activeText = preferences.language === 'hi' ? (textHi || text) : text;
  const activeLabel = preferences.language === 'hi' ? labelHi : label;

  const handleToggle = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(activeText, preferences.language);
    }
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    stop();
    setTimeout(() => {
      speak(activeText, preferences.language);
    }, 150);
  };

  if (!hasSupport) {
    return null;
  }

  const isSmall = size === 'sm';

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isSpeaking ? 'Stop speaking instructions' : 'Listen to instructions aloud'}
        className={`inline-flex items-center gap-2 font-bold rounded-2xl transition-all shadow-sm active:scale-95 focus-visible:ring-4 focus-visible:ring-[#005B46] ${
          isSpeaking
            ? 'bg-[#C83D35] hover:bg-red-700 text-white animate-pulse'
            : 'bg-[#E1F3E3] hover:bg-[#cdecd0] text-[#005B46] border-2 border-[#16845B]'
        } ${isSmall ? 'px-3 py-2 text-base' : 'px-4 py-3 text-lg sm:text-xl'}`}
      >
        {isSpeaking ? (
          <>
            <VolumeX className={isSmall ? 'w-5 h-5' : 'w-6 h-6'} />
            <span>{preferences.language === 'hi' ? 'रोकें' : 'Stop Voice'}</span>
            {/* Visual sound bar wave */}
            <span className="flex items-center gap-1 ml-1">
              <span className="w-1 h-3 bg-white rounded animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-5 bg-white rounded animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2 bg-white rounded animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </>
        ) : (
          <>
            <Volume2 className={isSmall ? 'w-5 h-5 text-[#005B46]' : 'w-6 h-6 text-[#005B46]'} />
            <span>{activeLabel}</span>
          </>
        )}
      </button>

      {/* Repeat button */}
      <button
        type="button"
        onClick={handleReplay}
        title={preferences.language === 'hi' ? 'दोबारा सुनें' : 'Repeat voice'}
        aria-label={preferences.language === 'hi' ? 'दोबारा सुनें' : 'Repeat instruction voice'}
        className="p-3 rounded-2xl bg-white border-2 border-[#D7E4DD] text-[#153B35] hover:border-[#16845B] hover:bg-[#FAF9F3] transition-colors focus-visible:ring-4 focus-visible:ring-[#005B46]"
      >
        <RotateCcw className="w-5 h-5 text-[#16845B]" />
      </button>
    </div>
  );
};
