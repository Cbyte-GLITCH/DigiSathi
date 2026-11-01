import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MascotAvatar } from '../components/MascotAvatar';
import { LESSONS } from '../data/lessonsData';
import { VoicePlaybackButton } from '../components/VoicePlaybackButton';
import {
  BookOpen,
  PlayCircle,
  Bot,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Mic,
} from 'lucide-react';

export const Dashboard = () => {
  const { profile, completedLessons, lastOpenedLesson, preferences } = useApp();
  const isHi = preferences.language === 'hi';

  const userName = profile?.name || (isHi ? 'मित्र' : 'Friend');

  // Find last lesson details or fallback
  const currentLesson = LESSONS[lastOpenedLesson] || LESSONS['videocall-1'];
  const allLessonKeys = Object.keys(LESSONS);
  const totalLessonsCount = allLessonKeys.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.min(
    100,
    Math.round((completedCount / totalLessonsCount) * 100)
  );

  // Recommended next lesson (first incomplete one)
  const nextLessonKey = allLessonKeys.find((id) => !completedLessons.includes(id)) || 'videocall-1';
  const nextLesson = LESSONS[nextLessonKey];

  const greetingSpeechEn = `Hello ${userName}! Welcome to Digital Sathi. You are doing great! Keep learning step by step. You can continue your lesson, ask Sathi any question, or practice UPI safely.`;
  const greetingSpeechHi = `नमस्ते ${userName} जी! डिजिटल साथी में आपका स्वागत है। आप बहुत अच्छा कर रहे हैं! धीरे-धीरे सीखते रहिए। आप अपना पाठ जारी रख सकते हैं, साथी से सवाल पूछ सकते हैं, या सुरक्षित UPI अभ्यास कर सकते हैं।`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 space-y-6">
      {/* 1. Welcoming Hero Banner */}
      <div className="bg-gradient-to-r from-[#005B46] to-[#16845B] rounded-3xl p-6 sm:p-8 text-white shadow-soft-lg relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 sm:gap-6">
            <MascotAvatar size="lg" mood="happy" className="ring-4 ring-white/30 rounded-full" />
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-white mb-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isHi ? 'आपका डिजिटल साथी' : 'Your Digital Companion'}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {isHi ? `नमस्ते, ${userName} जी!` : `Hello, ${userName}!`}
              </h1>
              <p className="text-base sm:text-xl text-emerald-100 font-medium mt-1">
                {isHi
                  ? 'आप बहुत अच्छा कर रहे हैं! कदम दर कदम सीखते रहिए।'
                  : "You're doing great! Keep learning, step by step."}
              </p>
            </div>
          </div>

          <div className="self-stretch sm:self-auto flex items-center gap-3">
            <VoicePlaybackButton
              text={greetingSpeechEn}
              textHi={greetingSpeechHi}
              label="Listen Greeting"
              labelHi="सुनिए"
            />
          </div>
        </div>
      </div>

      {/* 2. Quick "Ask Sathi" Voice Helper Bar */}
      <div className="bg-[#FFE8D1] border-2 border-[#FBBF24] rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#9A3412] flex items-center justify-center shrink-0 shadow-sm">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#9A3412]">
              {isHi ? 'कोई भी शंका हो तो साथी से पूछें' : 'Have a question? Ask Sathi anytime'}
            </h2>
            <p className="text-xs sm:text-sm text-[#7C2D12] font-semibold">
              {isHi
                ? 'माइक दबाकर बोलिए या लिखकर सवाल पूछिए।'
                : 'Tap to speak your question aloud, or type a query.'}
            </p>
          </div>
        </div>

        <Link
          to="/assistant"
          className="w-full sm:w-auto px-5 py-3 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 text-base whitespace-nowrap"
        >
          <Mic className="w-5 h-5" />
          <span>{isHi ? 'माइक दबाकर पूछें' : 'Tap to Ask Sathi'}</span>
        </Link>
      </div>

      {/* 3. Four Main Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Learn Something New */}
        <Link
          to="/goals"
          className="p-6 bg-white border-2 border-[#D7E4DD] hover:border-[#16845B] rounded-3xl shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#E1F3E3] text-[#005B46] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-extrabold text-[#153B35] group-hover:text-[#005B46] transition-colors">
              {isHi ? 'कुछ नया सीखें' : 'Learn Something New'}
            </h2>
            <p className="text-sm text-[#526B65] mt-1.5 font-medium">
              {isHi ? 'कॉल, संदेश या UPI के नए लक्ष्य चुनें।' : 'Explore all beginner topics and tutorials.'}
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-extrabold text-[#005B46]">
            <span>{isHi ? 'विषय देखें' : 'Browse Topics'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 2: Continue Learning */}
        <Link
          to={`/lesson/${currentLesson.id}`}
          className="p-6 bg-[#DFF2FC] border-2 border-[#60A5FA] hover:border-blue-600 rounded-3xl shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-white text-[#1E40AF] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <PlayCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-extrabold text-[#153B35] group-hover:text-[#1E40AF] transition-colors">
              {isHi ? 'पढ़ाई जारी रखें' : 'Continue Learning'}
            </h2>
            <p className="text-sm text-[#1E40AF] mt-1.5 font-bold line-clamp-1">
              {isHi ? currentLesson.titleHi : currentLesson.title}
            </p>
            <p className="text-xs text-[#526B65] mt-0.5">
              {currentLesson.totalSteps} {isHi ? 'सरल कदम' : 'easy steps'}
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-blue-200 flex items-center justify-between text-sm font-extrabold text-[#1E40AF]">
            <span>{isHi ? 'पाठ खोलें' : 'Resume Lesson'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 3: Ask Sathi Voice Assistant */}
        <Link
          to="/assistant"
          className="p-6 bg-[#EDE5FC] border-2 border-[#A78BFA] hover:border-purple-600 rounded-3xl shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-white text-[#5B21B6] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Bot className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-extrabold text-[#153B35] group-hover:text-[#5B21B6] transition-colors">
              {isHi ? 'साथी से पूछें' : 'Ask Sathi'}
            </h2>
            <p className="text-sm text-[#526B65] mt-1.5 font-medium">
              {isHi ? 'आवाज या लिखकर फोन की हर बात समझें।' : 'Your voice-friendly partner for any phone doubt.'}
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-purple-200 flex items-center justify-between text-sm font-extrabold text-[#5B21B6]">
            <span>{isHi ? 'बातचीत शुरू करें' : 'Open Assistant'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 4: Safety Corner */}
        <Link
          to="/safety"
          className="p-6 bg-[#E8F6F0] border-2 border-[#10B981] hover:border-emerald-600 rounded-3xl shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-white text-[#065F46] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-extrabold text-[#153B35] group-hover:text-[#065F46] transition-colors">
              {isHi ? 'सुरक्षा कॉर्नर' : 'Safety Corner'}
            </h2>
            <p className="text-sm text-[#526B65] mt-1.5 font-medium">
              {isHi ? 'फर्जी कॉल और फ्रॉड से खुद को बचाएं।' : 'Learn to recognise frauds and protect your money.'}
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-emerald-200 flex items-center justify-between text-sm font-extrabold text-[#065F46]">
            <span>{isHi ? 'सुझाव देखें' : 'View Safety Tips'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* 4. Learning Progress & Recommended Next Lesson */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Card (1 Col) */}
        <div className="elder-card p-6 bg-white rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-[#16845B] uppercase tracking-wider">
                {isHi ? 'आपकी प्रगति' : 'Learning Progress'}
              </span>
              <Award className="w-6 h-6 text-[#16845B]" />
            </div>

            <h2 className="text-2xl font-extrabold text-[#005B46]">
              {completedCount} of {totalLessonsCount} {isHi ? 'कौशल सीखे' : 'Skills Mastered'}
            </h2>
            <p className="text-sm font-semibold text-[#526B65] mt-1">
              {progressPercent}% {isHi ? 'पाठ्यक्रम पूरा हुआ' : 'completed so far'}
            </p>

            {/* Progress bar */}
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mt-4 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-[#16845B] to-[#005B46] rounded-full transition-all duration-500"
                style={{ width: `${Math.max(12, progressPercent)}%` }}
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              to="/communication"
              className="text-sm font-extrabold text-[#005B46] hover:underline flex items-center gap-1.5"
            >
              <span>{isHi ? 'सभी पाठ देखें' : 'View full lessons library'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Recommended Next Lesson (2 Cols) */}
        <div className="elder-card p-6 bg-white rounded-3xl lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold bg-[#E1F3E3] text-[#005B46] px-3 py-1 rounded-full">
                {isHi ? '⭐ आपके लिए सुझाव' : '⭐ Recommended Next'}
              </span>
              <span className="text-xs font-bold text-[#526B65]">
                {nextLesson.totalSteps} {isHi ? 'कदम' : 'Steps'}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-[#153B35]">
              {isHi ? nextLesson.titleHi : nextLesson.title}
            </h2>
            <p className="text-base text-[#526B65] font-medium mt-2 leading-relaxed">
              {nextLesson.subtitle}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-bold text-[#16845B] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              {isHi ? 'आसान भाषा और बोलकर समझाया गया' : 'Easy voice-guided tutorial'}
            </span>
            <Link
              to={`/lesson/${nextLesson.id}`}
              className="w-full sm:w-auto px-6 py-3 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <span>{isHi ? 'यह पाठ शुरू करें' : 'Start This Lesson'}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Safe UPI Practice Invitation Callout */}
      <div className="bg-[#E1F3E3] border-2 border-[#16845B] rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#005B46] text-white flex items-center justify-center shrink-0 shadow-sm">
            <CreditCard className="w-9 h-9" />
          </div>
          <div>
            <div className="inline-block bg-[#005B46] text-white text-xs font-bold px-3 py-0.5 rounded-full mb-1">
              {isHi ? '100% सुरक्षित • कोई असली पैसा नहीं' : '100% Safe • Dummy Money Only'}
            </div>
            <h2 className="text-2xl font-extrabold text-[#005B46]">
              {isHi ? 'UPI अभ्यास सैंडबॉक्स' : 'Practice UPI Payments Without Fear'}
            </h2>
            <p className="text-sm sm:text-base text-[#153B35] font-medium mt-1">
              {isHi
                ? 'नकली पैसों से डिजिटल भुगतान सीखें। बिना किसी नुकसान के अभ्यास करें।'
                : 'Learn the exact steps of sending money using fictional contacts and zero financial risk.'}
            </p>
          </div>
        </div>

        <Link
          to="/upi-sandbox"
          className="w-full md:w-auto px-6 py-3.5 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-lg whitespace-nowrap"
        >
          <span>{isHi ? 'सुरक्षित अभ्यास करें' : 'Open UPI Sandbox'}</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};
