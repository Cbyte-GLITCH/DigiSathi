import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MascotAvatar } from './MascotAvatar';
import { Award, ArrowRight, Home, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CompletionModal = ({
  isOpen,
  title = 'Lesson Completed!',
  titleHi = 'पाठ पूरा हुआ! बधाई!',
  subtitle = 'You learned a new digital skill today. You are becoming more confident!',
  subtitleHi = 'आपने आज एक नया डिजिटल कौशल सीखा है। आपका आत्मविश्वास बढ़ रहा है!',
  onRestart,
  nextLessonPath,
  nextLessonLabel = 'Next Lesson',
  nextLessonLabelHi = 'अगला पाठ सीखें',
}) => {
  const { preferences } = useApp();
  const isHi = preferences.language === 'hi';

  useEffect(() => {
    if (isOpen) {
      // Trigger joyful celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#005B46', '#16845B', '#FFE8D1', '#60A5FA', '#FBBF24'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#16845B] text-center transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="completion-title"
      >
        <div className="flex justify-center mb-4">
          <MascotAvatar size="xl" mood="happy" />
        </div>

        <div className="inline-flex items-center gap-1.5 bg-[#E1F3E3] text-[#005B46] px-4 py-1.5 rounded-full font-bold text-sm mb-3">
          <Award className="w-5 h-5 text-[#16845B]" />
          <span>{isHi ? 'शाबाश! आपने कर दिखाया' : 'Well Done! Achievement Unlocked'}</span>
        </div>

        <h2 id="completion-title" className="text-2xl sm:text-3xl font-extrabold text-[#005B46] mb-3">
          {isHi ? titleHi : title}
        </h2>

        <p className="text-base sm:text-lg text-[#153B35] font-medium leading-relaxed mb-6">
          {isHi ? subtitleHi : subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {nextLessonPath && (
            <Link
              to={nextLessonPath}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-lg"
            >
              <span>{isHi ? nextLessonLabelHi : nextLessonLabel}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}

          {onRestart && (
            <button
              type="button"
              onClick={onRestart}
              className="w-full sm:w-auto px-5 py-3.5 bg-white border-2 border-[#D7E4DD] hover:border-[#16845B] text-[#153B35] font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 text-base"
            >
              <RotateCcw className="w-5 h-5 text-[#16845B]" />
              <span>{isHi ? 'दोबारा अभ्यास करें' : 'Practice Again'}</span>
            </button>
          )}

          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-5 py-3.5 bg-[#E8F6F0] hover:bg-[#d6f0e4] text-[#005B46] font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 text-base"
          >
            <Home className="w-5 h-5 text-[#005B46]" />
            <span>{isHi ? 'मुख्य पृष्ठ (Home)' : 'Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
