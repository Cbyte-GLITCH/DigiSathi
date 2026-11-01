import React from 'react';

export const MascotAvatar = ({ size = 'md', mood = 'happy', isSpeaking = false, isListening = false, className = '' }) => {
  // Size mapping
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  }[size] || 'w-14 h-14';

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}>
      {/* Pulse ring when speaking or listening */}
      {(isSpeaking || isListening) && (
        <span
          className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
            isListening ? 'bg-red-400' : 'bg-[#16845B]'
          }`}
        />
      )}

      {/* Main SVG Avatar */}
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-sm select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Digital Sathi Robot Mascot"
      >
        {/* Background circle */}
        <circle cx="60" cy="60" r="56" fill="#E1F3E3" stroke="#005B46" strokeWidth="4" />

        {/* Antenna */}
        <line x1="60" y1="28" x2="60" y2="14" stroke="#005B46" strokeWidth="4" strokeLinecap="round" />
        <circle cx="60" cy="12" r="6" fill={isListening ? '#C83D35' : '#16845B'} />
        <circle cx="60" cy="12" r="3" fill="#FFE8D1" />

        {/* Robot Head Body */}
        <rect x="26" y="28" width="68" height="56" rx="20" fill="#005B46" />
        <rect x="32" y="34" width="56" height="44" rx="14" fill="#FAF9F3" />

        {/* Ears / Headphones */}
        <rect x="18" y="44" width="8" height="24" rx="4" fill="#16845B" />
        <rect x="94" y="44" width="8" height="24" rx="4" fill="#16845B" />

        {/* Eyes */}
        {mood === 'wink' ? (
          <>
            <path d="M41 52 Q46 47 51 52" stroke="#005B46" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <ellipse cx="74" cy="52" rx="5" ry="6" fill="#005B46" />
            <circle cx="76" cy="50" r="2" fill="#FFFFFF" />
          </>
        ) : (
          <>
            <ellipse cx="46" cy="52" rx="5" ry="6" fill="#005B46" />
            <circle cx="48" cy="50" r="2" fill="#FFFFFF" />
            <ellipse cx="74" cy="52" rx="5" ry="6" fill="#005B46" />
            <circle cx="76" cy="50" r="2" fill="#FFFFFF" />
          </>
        )}

        {/* Rosy Cheeks */}
        <circle cx="39" cy="60" r="4" fill="#FFE8D1" />
        <circle cx="81" cy="60" r="4" fill="#FFE8D1" />

        {/* Mouth */}
        {isSpeaking ? (
          // Animated / open speaking mouth
          <ellipse cx="60" cy="64" rx="7" ry="5" fill="#005B46" />
        ) : isListening ? (
          // Listening mouth (o-shape)
          <circle cx="60" cy="64" r="4" fill="#005B46" />
        ) : (
          // Warm smiling mouth
          <path d="M50 62 Q60 72 70 62" stroke="#005B46" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        )}

        {/* Body hint / friendly collar */}
        <path d="M40 88 C40 84 48 84 60 84 C72 84 80 84 80 88 L86 106 C86 109 82 110 60 110 C38 110 34 109 34 106 Z" fill="#16845B" />
        <circle cx="60" cy="98" r="4" fill="#FFE8D1" />
      </svg>

      {/* Status indicator pip */}
      {isListening && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
          <span className="w-2 h-2 bg-white rounded-full animate-ping" />
        </span>
      )}
    </div>
  );
};
