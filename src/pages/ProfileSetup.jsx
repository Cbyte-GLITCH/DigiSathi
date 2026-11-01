import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MascotAvatar } from '../components/MascotAvatar';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2, Heart } from 'lucide-react';

const OCCUPATION_OPTIONS = [
  { id: 'Retired', labelEn: 'Retired', labelHi: 'सेवानिवृत्त (Retired)' },
  { id: 'Homemaker', labelEn: 'Homemaker', labelHi: 'गृहणी (Homemaker)' },
  { id: 'Working Professional', labelEn: 'Working Professional', labelHi: 'नौकरीपेशा (Working)' },
  { id: 'Self-employed', labelEn: 'Self-employed / Business', labelHi: 'स्वरोजगार / व्यवसाय' },
  { id: 'Student', labelEn: 'Student', labelHi: 'विद्यार्थी (Student)' },
  { id: 'Other', labelEn: 'Other', labelHi: 'अन्य (Other)' },
];

export const ProfileSetup = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, preferences } = useApp();
  const isHi = preferences.language === 'hi';

  const [name, setName] = useState(profile?.name || '');
  const [age, setAge] = useState(profile?.age || '');
  const [occupation, setOccupation] = useState(profile?.occupation || 'Retired');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) {
      errs.name = isHi ? 'कृपया अपना नाम दर्ज करें।' : 'Please enter your name.';
    } else if (name.trim().length < 2) {
      errs.name = isHi ? 'नाम कम से कम 2 अक्षरों का होना चाहिए।' : 'Name must be at least 2 characters.';
    }

    const numAge = parseInt(age, 10);
    if (!age) {
      errs.age = isHi ? 'कृपया अपनी उम्र दर्ज करें।' : 'Please enter your age.';
    } else if (isNaN(numAge) || numAge < 10 || numAge > 120) {
      errs.age = isHi ? 'कृपया सही उम्र दर्ज करें (10 से 120)।' : 'Please enter a valid age between 10 and 120.';
    }

    if (!occupation) {
      errs.occupation = isHi ? 'कृपया अपना पेशा चुनें।' : 'Please select your occupation.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    updateProfile({
      name: name.trim(),
      age: parseInt(age, 10),
      occupation,
      setupDate: new Date().toISOString(),
    });

    navigate('/goals');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F3] py-8 px-4 sm:px-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-xl">
        {/* Welcome Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <MascotAvatar size="xl" mood="happy" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#005B46] tracking-tight">
            Digital Sathi
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#16845B] mt-1">
            {isHi ? 'सीखें • जुड़ें • आत्मनिर्भर बनें' : 'Learn • Connect • Be Confident'}
          </p>

          <p className="text-sm sm:text-base text-[#526B65] mt-2 max-w-md mx-auto leading-relaxed">
            {isHi
              ? 'नमस्ते! हम आपके अनुकूल सीखने का अनुभव तैयार करने के लिए बस आपकी थोड़ी सी जानकारी चाहते हैं। कोई पासवर्ड या गुप्त जानकारी की जरूरत नहीं है।'
              : 'Welcome! Tell us a little about yourself so Sathi can guide you with patience and care. No passwords or account numbers needed.'}
          </p>
        </div>

        {/* Existing Profile Fast-Track Banner */}
        {profile?.name && (
          <div className="bg-[#E8F6F0] border-2 border-[#16845B] rounded-2xl p-4 mb-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm font-bold text-[#005B46]">
                {isHi ? `नमस्ते ${profile.name} जी!` : `Welcome back, ${profile.name}!`}
              </p>
              <p className="text-xs text-[#526B65]">
                {isHi ? 'आप सीधे डैशबोर्ड पर भी जा सकते हैं।' : 'You can jump straight into your dashboard.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-[#005B46] hover:bg-[#16845B] text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
            >
              {isHi ? 'डैशबोर्ड पर जाएं' : 'Go to Dashboard'}
            </button>
          </div>
        )}

        {/* Profile Card Form */}
        <div className="elder-card p-6 sm:p-8 bg-white border-2 border-[#D7E4DD] rounded-3xl shadow-soft">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Field 1: Name */}
            <div>
              <label htmlFor="user-name" className="block text-lg font-extrabold text-[#153B35] mb-1.5">
                {isHi ? '1. आपका शुभ नाम क्या है?' : '1. What is your name?'}
                <span className="text-[#C83D35] ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  id="user-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  placeholder={isHi ? 'उदा. सुरेश कुमार या मीना शर्मा' : 'Enter your name (e.g., Ramesh or Shanti)'}
                  className={`w-full px-4 py-3.5 text-lg font-medium rounded-2xl border-2 transition-all focus:outline-none focus:ring-4 focus:ring-[#005B46]/20 ${
                    errors.name
                      ? 'border-[#C83D35] bg-red-50 text-[#C83D35]'
                      : 'border-[#D7E4DD] focus:border-[#005B46] bg-[#FAF9F3] text-[#153B35]'
                  }`}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="text-sm font-bold text-[#C83D35] mt-1.5 flex items-center gap-1">
                  <span>⚠️</span> {errors.name}
                </p>
              )}
            </div>

            {/* Field 2: Age */}
            <div>
              <label htmlFor="user-age" className="block text-lg font-extrabold text-[#153B35] mb-1.5">
                {isHi ? '2. आपकी उम्र (वर्षों में)?' : '2. What is your age?'}
                <span className="text-[#C83D35] ml-1">*</span>
              </label>
              <input
                id="user-age"
                type="number"
                min="10"
                max="120"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  if (errors.age) setErrors({ ...errors, age: null });
                }}
                placeholder={isHi ? 'उदा. 65' : 'Enter your age (e.g. 62)'}
                className={`w-full px-4 py-3.5 text-lg font-medium rounded-2xl border-2 transition-all focus:outline-none focus:ring-4 focus:ring-[#005B46]/20 ${
                  errors.age
                    ? 'border-[#C83D35] bg-red-50 text-[#C83D35]'
                    : 'border-[#D7E4DD] focus:border-[#005B46] bg-[#FAF9F3] text-[#153B35]'
                }`}
                aria-describedby={errors.age ? 'age-error' : undefined}
              />
              {errors.age && (
                <p id="age-error" className="text-sm font-bold text-[#C83D35] mt-1.5 flex items-center gap-1">
                  <span>⚠️</span> {errors.age}
                </p>
              )}
            </div>

            {/* Field 3: Occupation */}
            <div>
              <label className="block text-lg font-extrabold text-[#153B35] mb-2">
                {isHi ? '3. आपका पेशा (Occupation)?' : '3. What describes you best?'}
                <span className="text-[#C83D35] ml-1">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {OCCUPATION_OPTIONS.map((item) => {
                  const isSelected = occupation === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOccupation(item.id)}
                      className={`p-3.5 rounded-2xl text-left border-2 font-bold text-base transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#16845B] bg-[#E8F6F0] text-[#005B46] shadow-sm'
                          : 'border-[#D7E4DD] bg-[#FAF9F3] text-[#153B35] hover:border-[#16845B]/50'
                      }`}
                    >
                      <span>{isHi ? item.labelHi : item.labelEn}</span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-[#16845B]" />}
                    </button>
                  );
                })}
              </div>
              {errors.occupation && (
                <p className="text-sm font-bold text-[#C83D35] mt-1.5">{errors.occupation}</p>
              )}
            </div>

            {/* Privacy Promise */}
            <div className="bg-[#FAF9F3] rounded-2xl p-3 border border-[#D7E4DD] flex items-center gap-2 text-xs text-[#526B65]">
              <Heart className="w-4 h-4 text-[#16845B] shrink-0" />
              <span>
                {isHi
                  ? 'आपकी जानकारी केवल आपके इसी फोन/कंप्यूटर पर सुरक्षित रहती है।'
                  : 'Your information stays securely inside this browser. No ads, no spam calls.'}
              </span>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold text-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-3 focus-visible:ring-4 focus-visible:ring-[#005B46]"
            >
              <span>{isHi ? 'आगे बढ़ें (Continue)' : 'Continue'}</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
