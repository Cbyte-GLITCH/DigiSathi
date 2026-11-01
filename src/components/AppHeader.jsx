import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MascotAvatar } from './MascotAvatar';
import { useApp } from '../context/AppContext';
import { User, Globe } from 'lucide-react';

export const AppHeader = () => {
  const { profile, preferences, setTextSize, setLanguage } = useApp();
  const location = useLocation();

  const isHindi = preferences.language === 'hi';

  const toggleLanguage = () => {
    setLanguage(isHindi ? 'en' : 'hi');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F3]/95 backdrop-blur-md border-b-2 border-[#D7E4DD] px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Name */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 group focus-visible:ring-4 focus-visible:ring-[#005B46] rounded-2xl p-1"
          aria-label="Digital Sathi Home"
        >
          <MascotAvatar size="md" mood="happy" />
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#005B46] tracking-tight group-hover:text-[#16845B] transition-colors">
              Digital Sathi
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#526B65] hidden sm:inline-block">
              {isHindi ? 'सीखें. जुड़ें. आत्मनिर्भर बनें।' : 'Learn. Connect. Be Confident.'}
            </span>
          </div>
        </Link>

        {/* Accessibility & Profile Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Text Size Control */}
          <div
            className="flex items-center bg-white border-2 border-[#D7E4DD] rounded-2xl p-1 shadow-sm"
            role="group"
            aria-label="Text size adjustment"
          >
            <span className="text-xs font-bold text-[#526B65] px-2 hidden md:inline">
              {isHindi ? 'अक्षर आकार:' : 'Text:'}
            </span>
            <button
              type="button"
              onClick={() => setTextSize('standard')}
              className={`px-2.5 py-1 text-sm font-bold rounded-xl transition-all ${
                preferences.textSize === 'standard'
                  ? 'bg-[#005B46] text-white shadow-sm'
                  : 'text-[#153B35] hover:bg-[#E1F3E3]'
              }`}
              title="Standard Text Size"
              aria-label="Set standard text size"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setTextSize('large')}
              className={`px-2.5 py-1 text-base font-bold rounded-xl transition-all ${
                preferences.textSize === 'large'
                  ? 'bg-[#005B46] text-white shadow-sm'
                  : 'text-[#153B35] hover:bg-[#E1F3E3]'
              }`}
              title="Large Text Size"
              aria-label="Set large text size"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setTextSize('xlarge')}
              className={`px-2.5 py-1 text-lg font-bold rounded-xl transition-all ${
                preferences.textSize === 'xlarge'
                  ? 'bg-[#005B46] text-white shadow-sm'
                  : 'text-[#153B35] hover:bg-[#E1F3E3]'
              }`}
              title="Extra Large Text Size"
              aria-label="Set extra large text size"
            >
              A++
            </button>
          </div>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border-2 border-[#D7E4DD] hover:border-[#16845B] rounded-2xl text-sm sm:text-base font-bold text-[#005B46] transition-colors focus-visible:ring-4 focus-visible:ring-[#005B46] shadow-sm"
            title="Switch Language"
            aria-label="Toggle language between English and Hindi"
          >
            <Globe className="w-4 h-4 text-[#16845B]" />
            <span>{isHindi ? 'English' : 'हिन्दी'}</span>
          </button>

          {/* Profile / Settings link */}
          <Link
            to="/settings"
            className={`flex items-center gap-2 px-3 py-2 rounded-2xl border-2 transition-colors focus-visible:ring-4 focus-visible:ring-[#005B46] shadow-sm ${
              location.pathname === '/settings'
                ? 'bg-[#E1F3E3] border-[#16845B] text-[#005B46]'
                : 'bg-white border-[#D7E4DD] hover:border-[#16845B] text-[#153B35]'
            }`}
            aria-label="User Profile and Settings"
          >
            <div className="w-7 h-7 rounded-full bg-[#E8F6F0] flex items-center justify-center text-[#005B46]">
              <User className="w-4 h-4" />
            </div>
            {profile?.name ? (
              <span className="font-bold text-sm sm:text-base hidden sm:inline max-w-[120px] truncate">
                {profile.name}
              </span>
            ) : (
              <span className="font-bold text-sm sm:text-base hidden sm:inline">
                {isHindi ? 'प्रोफाइल' : 'Profile'}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
