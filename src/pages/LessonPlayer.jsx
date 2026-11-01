import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LESSONS } from '../data/lessonsData';
import { PhoneSimulator } from '../components/PhoneSimulator';
import { VoicePlaybackButton } from '../components/VoicePlaybackButton';
import { CompletionModal } from '../components/CompletionModal';
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

export const LessonPlayer = () => {
  const { lessonId } = useParams();
  const { markLessonCompleted, preferences } = useApp();
  const isHi = preferences.language === 'hi';

  const lesson = LESSONS[lessonId] || LESSONS['videocall-1'];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  const step = lesson.steps[currentStepIndex] || lesson.steps[0];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === lesson.steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      markLessonCompleted(lesson.id);
      setIsCompletedModalOpen(true);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsCompletedModalOpen(false);
  };

  // Find next lesson to recommend
  const allLessonIds = Object.keys(LESSONS);
  const currentIndex = allLessonIds.indexOf(lesson.id);
  const nextLessonId = allLessonIds[(currentIndex + 1) % allLessonIds.length];

  return (
    <div key={lesson.id} className="max-w-6xl mx-auto px-4 py-6 sm:px-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          to="/communication"
          className="inline-flex items-center gap-2 font-bold text-base sm:text-lg text-[#005B46] hover:text-[#16845B] bg-white border-2 border-[#D7E4DD] px-4 py-2 rounded-2xl shadow-sm focus-visible:ring-4 focus-visible:ring-[#005B46]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{isHi ? 'पाठों की सूची' : 'Back to Lessons'}</span>
        </Link>

        {/* Step Progress Tracker */}
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-extrabold text-[#005B46] bg-[#E1F3E3] border border-[#16845B]/30 px-3.5 py-1.5 rounded-full">
            {isHi
              ? `कदम ${currentStepIndex + 1} / ${lesson.steps.length}`
              : `Step ${currentStepIndex + 1} of ${lesson.steps.length}`}
          </span>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#005B46] tracking-tight">
          {isHi ? lesson.titleHi : lesson.title}
        </h1>
        <p className="text-base sm:text-lg text-[#526B65] font-medium mt-1">
          {lesson.subtitle}
        </p>

        {/* Step dots */}
        <div className="flex items-center gap-2 mt-4">
          {lesson.steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentStepIndex
                  ? 'w-10 bg-[#005B46]'
                  : idx < currentStepIndex
                  ? 'w-6 bg-[#16845B]'
                  : 'w-3 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main 2-Column Split: Step Instructions on Left, Phone Simulator on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Big readable instruction, voice playback, next/prev */}
        <div className="lg:col-span-6 space-y-6">
          <div className="elder-card p-6 sm:p-8 bg-white rounded-3xl border-2 border-[#D7E4DD] shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-extrabold text-[#16845B] uppercase tracking-wider bg-[#E8F6F0] px-3 py-1 rounded-full">
                {isHi ? `चरण ${step.stepNumber}` : `Instruction ${step.stepNumber}`}
              </span>

              {/* Voice playback button */}
              <VoicePlaybackButton
                text={step.voiceTextEn}
                textHi={step.voiceTextHi}
                label="Hear Instructions"
                labelHi="निर्देश सुनें"
              />
            </div>

            {/* Instruction Headline */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153B35] leading-snug">
              {isHi ? step.titleHi : step.title}
            </h2>

            {/* Instruction Body */}
            <p className="text-lg sm:text-xl text-[#153B35] font-medium leading-relaxed mt-4 bg-[#FAF9F3] p-4 rounded-2xl border border-[#D7E4DD]">
              {isHi ? step.instructionHi : step.instruction}
            </p>

            {/* Senior Friendly Tip */}
            {step.tip && (
              <div className="mt-5 flex items-start gap-3 bg-[#FFE8D1]/70 border border-[#FBBF24] p-4 rounded-2xl">
                <Lightbulb className="w-6 h-6 text-[#9A3412] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-[#7C2D12] font-semibold leading-relaxed">
                  <span className="font-extrabold">{isHi ? 'सलाह: ' : 'Helpful Tip: '}</span>
                  {step.tip}
                </p>
              </div>
            )}

            {/* Action Bar: Previous, Next, Replay */}
            <div className="mt-8 pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={isFirstStep}
                className={`w-full sm:w-auto px-5 py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 border-2 transition-all ${
                  isFirstStep
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-[#D7E4DD] hover:border-[#16845B] text-[#153B35] active:scale-95'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{isHi ? 'पिछला (Previous)' : 'Previous'}</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 focus-visible:ring-4 focus-visible:ring-[#005B46]"
              >
                <span>
                  {isLastStep
                    ? isHi ? 'समाप्त करें (Complete)' : 'Complete Lesson'
                    : isHi ? 'अगला कदम (Next)' : 'Next Step'}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Practice reassurance card */}
          <div className="bg-[#E8F6F0] p-4 rounded-2xl border border-[#16845B]/30 flex items-center gap-3 text-sm text-[#005B46] font-semibold">
            <CheckCircle2 className="w-5 h-5 text-[#16845B] shrink-0" />
            <span>
              {isHi
                ? 'आप स्क्रीन पर बने फोन में भी टैप करके अभ्यास कर सकते हैं।'
                : 'Tip: You can also tap directly on the simulated phone on the right to practice!'}
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Phone Simulator */}
        <div className="lg:col-span-6 flex justify-center">
          <PhoneSimulator
            step={step}
            onNextStep={handleNext}
          />
        </div>
      </div>

      {/* Completion Modal */}
      <CompletionModal
        isOpen={isCompletedModalOpen}
        title={isHi ? `आपने "${lesson.titleHi}" सीख लिया!` : `You mastered "${lesson.title}"!`}
        subtitle={
          isHi
            ? 'शानदार काम! आप हर दिन और अधिक आत्मनिर्भर बन रहे हैं।'
            : 'Outstanding job! With each step you take, digital tasks become easier and more natural.'
        }
        onRestart={handleRestart}
        nextLessonPath={`/lesson/${nextLessonId}`}
        nextLessonLabel="Next Lesson"
        nextLessonLabelHi="अगला पाठ सीखें"
      />
    </div>
  );
};
