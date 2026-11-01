import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LEARNING_GOALS } from '../data/lessonsData';
import { VoicePlaybackButton } from '../components/VoicePlaybackButton';
import {
  IndianRupee,
  Phone,
  MessageSquare,
  Video,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const ICON_MAP = {
  IndianRupee,
  Phone,
  MessageSquare,
  Video,
  ShieldCheck,
};

export const LearningGoals = () => {
  const navigate = useNavigate();
  const { selectedGoal, selectGoal, preferences } = useApp();
  const isHi = preferences.language === 'hi';

  const handleSelectGoal = (goal) => {
    selectGoal(goal.id);
    navigate(goal.route);
  };

  const narrationTextEn =
    'Choose your learning goal. What would you like to learn today? You can learn UPI payments safely, make phone calls, send messages, use video calls to see your family, or learn how to stay safe from phone frauds.';
  const narrationTextHi =
    'अपना सीखने का लक्ष्य चुनें। आज आप क्या सीखना चाहते हैं? आप सुरक्षित UPI भुगतान, फोन कॉल करना, संदेश भेजना, परिवार से वीडियो कॉल करना या धोखाधड़ी से बचना सीख सकते हैं।';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
      {/* Page Title & Voice Prompt */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-sm font-extrabold text-[#16845B] uppercase tracking-wider">
            {isHi ? 'कदम 2: लक्ष्य का चयन' : 'Step 2: Choose Your Path'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#005B46] mt-1">
            {isHi ? 'आज आप क्या सीखना चाहते हैं?' : 'Choose Your Learning Goal'}
          </h1>
          <p className="text-lg text-[#526B65] mt-1 font-medium">
            {isHi ? 'अपनी पसंद का कोई भी विषय चुनें। आप कभी भी बदल सकते हैं।' : 'What would you like to learn today? Tap any card below to begin.'}
          </p>
        </div>

        <div>
          <VoicePlaybackButton
            text={narrationTextEn}
            textHi={narrationTextHi}
            label="Listen Options"
            labelHi="विकल्प सुनें"
          />
        </div>
      </div>

      {/* Grid of Learning Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {LEARNING_GOALS.map((goal) => {
          const Icon = ICON_MAP[goal.iconName] || Phone;
          const isSelected = selectedGoal === goal.id;

          return (
            <div
              key={goal.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSelectGoal(goal)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectGoal(goal);
                }
              }}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group shadow-sm hover:shadow-card-hover hover:-translate-y-1 ${
                goal.bgColor
              } ${isSelected ? 'border-[#005B46] ring-4 ring-[#005B46]/20' : goal.borderColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/90 border border-black/5 shadow-sm flex items-center justify-center">
                    <Icon className={`w-9 h-9 ${goal.textColor}`} />
                  </div>

                  {isSelected && (
                    <span className="inline-flex items-center gap-1 bg-[#005B46] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{isHi ? 'चुना हुआ' : 'Active Goal'}</span>
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-extrabold text-[#153B35] mb-2 group-hover:text-[#005B46] transition-colors">
                  {isHi ? goal.titleHi : goal.title}
                </h2>

                <p className="text-base sm:text-lg text-[#526B65] font-medium leading-relaxed">
                  {isHi ? goal.descriptionHi : goal.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                <span className="font-extrabold text-[#005B46] text-base group-hover:underline">
                  {isHi ? 'शुरू करें' : goal.label}
                </span>
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-[#005B46] group-hover:text-white transition-all text-[#005B46]">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skip to Dashboard link */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="text-base font-bold text-[#526B65] hover:text-[#005B46] underline focus-visible:ring-2 focus-visible:ring-[#005B46] p-2"
        >
          {isHi ? 'सीधे डैशबोर्ड पर जाएं' : 'Or skip directly to Home Dashboard'}
        </button>
      </div>
    </div>
  );
};
