import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Type,
  Globe,
  CheckCircle2,
} from 'lucide-react';

export const SettingsPage = () => {
  const {
    profile,
    updateProfile,
    preferences,
    setTextSize,
    setLanguage,
    setSpeechRate,
    resetProgress,
  } = useApp();

  const isHi = preferences.language === 'hi';

  const [name, setName] = useState(profile?.name || '');
  const [age, setAge] = useState(profile?.age || '');
  const [occupation, setOccupation] = useState(profile?.occupation || 'Retired');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      ...profile,
      name: name.trim() || profile?.name || 'Friend',
      age: parseInt(age, 10) || profile?.age || 60,
      occupation,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleResetProgress = () => {
    resetProgress();
    setResetConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-xs sm:text-sm font-extrabold text-[#16845B] uppercase tracking-wider">
            {isHi ? 'अनुकूलन' : 'Preferences'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#005B46] mt-1">
            {isHi ? 'सेटिंग्स व प्रोफाइल' : 'Settings & Profile'}
          </h1>
          <p className="text-base text-[#526B65] font-medium mt-1">
            {isHi ? 'अपनी सुविधा अनुसार ऐप को अनुकूलित करें।' : 'Adjust font size, voice speed, and profile.'}
          </p>
        </div>
      </div>

      {/* 1. Accessibility Preferences Card */}
      <div className="elder-card p-6 sm:p-8 bg-white rounded-3xl space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-[#E1F3E3] text-[#005B46] flex items-center justify-center">
            <Type className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#153B35]">
              {isHi ? 'अक्षर का आकार (Text Size)' : 'Text Size Adjustment'}
            </h2>
            <p className="text-xs sm:text-sm text-[#526B65]">
              {isHi ? 'बड़े अक्षरों में पढ़ना अधिक आसान होता है।' : 'Choose comfortable reading size'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'standard', label: 'Standard (100%)', labelHi: 'साधारण (A)', preview: 'text-base' },
            { id: 'large', label: 'Large (115%)', labelHi: 'बड़ा (A+)', preview: 'text-lg' },
            { id: 'xlarge', label: 'Extra Large (130%)', labelHi: 'बहुत बड़ा (A++)', preview: 'text-xl' },
          ].map((item) => {
            const isSelected = preferences.textSize === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTextSize(item.id)}
                className={`p-4 rounded-2xl border-2 font-bold text-center transition-all ${
                  isSelected
                    ? 'border-[#005B46] bg-[#E8F6F0] text-[#005B46] shadow-sm ring-4 ring-[#005B46]/20'
                    : 'border-[#D7E4DD] bg-[#FAF9F3] text-[#153B35] hover:border-[#16845B]'
                }`}
              >
                <div className={`${item.preview} font-extrabold mb-1`}>
                  {isHi ? item.labelHi : item.label}
                </div>
                <span className="text-xs text-slate-500 font-medium">Digital Sathi</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Voice & Language Settings */}
      <div className="elder-card p-6 sm:p-8 bg-white rounded-3xl space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-[#DFF2FC] text-[#1E40AF] flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#153B35]">
              {isHi ? 'भाषा और आवाज गति' : 'Language & Voice Speed'}
            </h2>
            <p className="text-xs sm:text-sm text-[#526B65]">
              {isHi ? 'आवाज की गति और भाषा चुनें' : 'Choose app language and spoken narration speed'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-extrabold text-[#153B35] mb-2">
              {isHi ? 'एप्लिकेशन की भाषा:' : 'Application Language:'}
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`flex-1 py-3 px-4 rounded-2xl font-bold border-2 transition-all ${
                  preferences.language === 'en'
                    ? 'border-[#005B46] bg-[#E8F6F0] text-[#005B46] ring-4 ring-[#005B46]/20'
                    : 'border-[#D7E4DD] bg-[#FAF9F3] text-[#153B35]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`flex-1 py-3 px-4 rounded-2xl font-bold border-2 transition-all ${
                  preferences.language === 'hi'
                    ? 'border-[#005B46] bg-[#E8F6F0] text-[#005B46] ring-4 ring-[#005B46]/20'
                    : 'border-[#D7E4DD] bg-[#FAF9F3] text-[#153B35]'
                }`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#153B35] mb-2">
              {isHi ? 'साथी के बोलने की गति (Voice Speed):' : 'Speech Narration Speed:'}
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSpeechRate(0.85)}
                className={`flex-1 py-3 px-4 rounded-2xl font-bold border-2 transition-all ${
                  preferences.speechRate <= 0.88
                    ? 'border-[#005B46] bg-[#E8F6F0] text-[#005B46] ring-4 ring-[#005B46]/20'
                    : 'border-[#D7E4DD] bg-[#FAF9F3] text-[#153B35]'
                }`}
              >
                🐢 {isHi ? 'धीमी (बुजुर्गों के लिए उत्तम)' : 'Slow & Clear (Recommended)'}
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(1.0)}
                className={`flex-1 py-3 px-4 rounded-2xl font-bold border-2 transition-all ${
                  preferences.speechRate > 0.88
                    ? 'border-[#005B46] bg-[#E8F6F0] text-[#005B46] ring-4 ring-[#005B46]/20'
                    : 'border-[#D7E4DD] bg-[#FAF9F3] text-[#153B35]'
                }`}
              >
                🚶 {isHi ? 'सामान्य (Normal)' : 'Normal Pace'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Edit Profile Card */}
      <div className="elder-card p-6 sm:p-8 bg-white rounded-3xl space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-[#EDE5FC] text-[#5B21B6] flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#153B35]">
              {isHi ? 'प्रोफाइल विवरण' : 'User Profile'}
            </h2>
            <p className="text-xs sm:text-sm text-[#526B65]">
              {isHi ? 'अपना नाम या पेशा बदलें' : 'Update your display name and occupation'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              {isHi ? 'नाम:' : 'Name:'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-[#D7E4DD] focus:border-[#005B46] bg-[#FAF9F3] text-base font-bold text-[#153B35]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                {isHi ? 'उम्र:' : 'Age:'}
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#D7E4DD] focus:border-[#005B46] bg-[#FAF9F3] text-base font-bold text-[#153B35]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                {isHi ? 'पेशा:' : 'Occupation:'}
              </label>
              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-[#D7E4DD] focus:border-[#005B46] bg-[#FAF9F3] text-base font-bold text-[#153B35]"
              >
                <option value="Retired">Retired</option>
                <option value="Homemaker">Homemaker</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="px-6 py-3 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold rounded-2xl shadow-sm transition-all active:scale-95"
            >
              {isHi ? 'बदलाव सुरक्षित करें' : 'Save Changes'}
            </button>

            {saveSuccess && (
              <span className="text-sm font-bold text-[#16845B] flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 className="w-5 h-5" />
                <span>{isHi ? 'सफलतापूर्वक सुरक्षित हुआ!' : 'Saved successfully!'}</span>
              </span>
            )}
          </div>
        </form>
      </div>

      {/* 4. Reset Progress Card */}
      <div className="elder-card p-6 bg-white rounded-3xl border-2 border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-[#C83D35]">
            {isHi ? 'सीखने की प्रगति रीसेट करें' : 'Reset Learning Progress'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {isHi
              ? 'यदि आप सभी पाठ दोबारा शुरुआत से पढ़ना चाहते हैं।'
              : 'Clears completed lesson badges so you can start fresh.'}
          </p>
        </div>

        {!resetConfirm ? (
          <button
            type="button"
            onClick={() => setResetConfirm(true)}
            className="px-4 py-2.5 bg-rose-50 border border-rose-300 text-[#C83D35] hover:bg-rose-100 font-bold rounded-xl text-sm transition-colors"
          >
            {isHi ? 'प्रगति रीसेट करें' : 'Reset Progress'}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetProgress}
              className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-sm hover:bg-red-700"
            >
              {isHi ? 'हाँ, रीसेट करें' : 'Yes, Reset'}
            </button>
            <button
              type="button"
              onClick={() => setResetConfirm(false)}
              className="px-3 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-sm"
            >
              {isHi ? 'रद्द करें' : 'Cancel'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
