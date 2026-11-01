import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SCAM_EXAMPLES, SAFETY_QUIZ_QUESTIONS } from '../data/scamData';
import { VoicePlaybackButton } from '../components/VoicePlaybackButton';
import {
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Bot,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SafetyCorner = () => {
  const { preferences } = useApp();
  const isHi = preferences.language === 'hi';

  const [expandedId, setExpandedId] = useState(SCAM_EXAMPLES[0].id);

  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const activeQuestion = SAFETY_QUIZ_QUESTIONS[currentQuizIdx];

  const handleOptionSelect = (option) => {
    if (selectedOption !== null) return; // prevent re-answering
    setSelectedOption(option);
    if (option.isCorrect) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuizIdx < SAFETY_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
    } else {
      setShowResult(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setQuizScore(0);
    setShowResult(false);
  };

  const safetySpeechEn =
    'Safety Tips: Stay alert. Stay safe. Scammers may use fake calls, lottery messages, and links. Never share your secret UPI PIN or OTP with anyone, not even someone claiming to be a bank manager.';
  const safetySpeechHi =
    'सुरक्षा सुझाव: सतर्क रहें, सुरक्षित रहें। धोखेबाज फर्जी कॉल, लॉटरी संदेश और लिंक का उपयोग करते हैं। अपना गुप्त UPI PIN या OTP कभी किसी को न बताएं।';

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs sm:text-sm font-extrabold text-[#16845B] uppercase tracking-wider">
            {isHi ? 'डिजिटल सुरक्षा' : 'Digital Defense'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#005B46] mt-1">
            {isHi ? 'सुरक्षा कॉर्नर (Safety Tips)' : 'Safety Tips & Scam Awareness'}
          </h1>
          <p className="text-base sm:text-lg text-[#526B65] font-medium mt-1">
            {isHi ? 'सतर्क रहें। सुरक्षित रहें।' : 'Stay alert. Stay safe.'}
          </p>
        </div>

        <div>
          <VoicePlaybackButton
            text={safetySpeechEn}
            textHi={safetySpeechHi}
            label="Listen Safety Rule"
            labelHi="नियम सुनें"
          />
        </div>
      </div>

      {/* 2. Prominent Warning Card */}
      <div className="bg-[#FAF9F3] border-3 border-[#C83D35] rounded-3xl p-6 sm:p-7 shadow-sm flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#C83D35] text-white flex items-center justify-center shrink-0 shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <div className="inline-block bg-red-100 text-[#C83D35] text-xs font-extrabold px-3 py-1 rounded-full uppercase mb-1">
            {isHi ? 'महत्वपूर्ण चेतावनी' : 'Important Warning'}
          </div>
          <h2 className="text-2xl font-extrabold text-[#C83D35]">
            {isHi ? 'धोखाधड़ी (Scams) से सावधान रहें' : 'Watch Out for Scams'}
          </h2>
          <p className="text-base sm:text-lg text-[#153B35] font-medium mt-2 leading-relaxed">
            {isHi
              ? 'धोखेबाज फर्जी कॉल, झूठे लॉटरी मैसेज और खतरनाक नीले लिंक का इस्तेमाल करते हैं। किसी भी अनजान व्यक्ति के साथ अपनी गोपनीय जानकारी या UPI PIN कभी साझा न करें।'
              : 'Scammers may use fake calls, urgent messages, and suspicious links. Never share confidential information, UPI PINs, or OTPs with someone you do not trust.'}
          </p>
        </div>
      </div>

      {/* 3. "Ask Sathi if Unsure" Banner */}
      <div className="bg-[#E8F6F0] border-2 border-[#16845B] rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#005B46] text-white flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-[#005B46]">
              {isHi ? 'कोई संदेह हो तो साथी से पूछें' : 'Received a suspicious message or call?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#526B65] font-semibold">
              {isHi
                ? 'साथी आपकी तुरंत मदद करेगा और सही सलाह देगा।'
                : 'Ask Sathi before clicking any unknown link or replying.'}
            </p>
          </div>
        </div>

        <Link
          to="/assistant"
          className="w-full sm:w-auto px-6 py-3 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-sm text-base transition-all active:scale-95 whitespace-nowrap"
        >
          <span>{isHi ? 'साथी से पूछें' : 'Ask Sathi If Unsure'}</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* 4. Common Scam Examples (Expandable Cards) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-[#153B35]">
          {isHi ? 'आम ऑनलाइन धोखाधड़ी के उदाहरण' : 'Common Scam Examples in India'}
        </h2>

        <div className="space-y-4">
          {SCAM_EXAMPLES.map((scam) => {
            const isExpanded = expandedId === scam.id;

            return (
              <div
                key={scam.id}
                className="elder-card bg-white rounded-3xl border-2 border-[#D7E4DD] overflow-hidden transition-all shadow-sm"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : scam.id)}
                  aria-expanded={isExpanded}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#FAF9F3] transition-colors focus-visible:ring-4 focus-visible:ring-[#005B46]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold bg-red-100 text-[#C83D35] px-3 py-1 rounded-full uppercase">
                      {scam.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#153B35]">
                      {isHi ? scam.titleHi : scam.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#E8F6F0] text-[#005B46] flex items-center justify-center shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 space-y-5 bg-white">
                    {/* Simulated Scam Message */}
                    <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 text-rose-950 font-serif italic text-base sm:text-lg">
                      {isHi ? scam.sampleMessageHi : scam.sampleMessage}
                    </div>

                    {/* Explanation */}
                    <div>
                      <h4 className="font-extrabold text-[#005B46] text-base mb-1">
                        {isHi ? 'यह क्या है और क्यों होता है?' : 'Why is this a scam?'}
                      </h4>
                      <p className="text-base text-[#153B35] font-medium leading-relaxed">
                        {isHi ? scam.explanationHi : scam.explanation}
                      </p>
                    </div>

                    {/* Red Flags */}
                    <div className="bg-[#FAF9F3] p-4 rounded-2xl border border-[#D7E4DD]">
                      <h4 className="font-extrabold text-[#C83D35] text-base mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        <span>{isHi ? 'पहचान के लक्षण (Red Flags):' : 'Red Flags to Notice:'}</span>
                      </h4>
                      <ul className="space-y-1.5 list-disc pl-5 text-sm sm:text-base text-[#153B35] font-medium">
                        {(isHi ? scam.redFlagsHi : scam.redFlags).map((flag, idx) => (
                          <li key={idx}>{flag}</li>
                        ))}
                      </ul>
                    </div>

                    {/* What Should I Do? */}
                    <div className="bg-[#E8F6F0] p-4 rounded-2xl border-2 border-[#16845B]">
                      <h4 className="font-extrabold text-[#005B46] text-base mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-[#16845B]" />
                        <span>{isHi ? 'मुझे क्या करना चाहिए? (Action Steps)' : 'What Should I Do?'}</span>
                      </h4>
                      <ul className="space-y-1.5 list-disc pl-5 text-sm sm:text-base text-[#153B35] font-medium">
                        {(isHi ? scam.actionStepsHi : scam.actionSteps).map((step, idx) => (
                          <li key={idx} className="font-semibold">{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Interactive Scam Awareness Quiz */}
      <section className="elder-card p-6 sm:p-8 bg-white rounded-3xl border-2 border-[#16845B] shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold bg-[#E1F3E3] text-[#005B46] px-3 py-1 rounded-full uppercase">
              {isHi ? 'अभ्यास प्रश्नोत्तरी' : 'Interactive Quiz'}
            </span>
            <span className="text-xs font-bold text-[#526B65]">
              Question {currentQuizIdx + 1} of {SAFETY_QUIZ_QUESTIONS.length}
            </span>
          </div>
          <span className="text-sm font-extrabold text-[#005B46]">
            Score: {quizScore}
          </span>
        </div>

        {!showResult ? (
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#153B35] leading-snug">
              {isHi ? activeQuestion.questionHi : activeQuestion.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {activeQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                let optStyle = 'border-[#D7E4DD] bg-[#FAF9F3] text-[#153B35] hover:border-[#16845B]';

                if (selectedOption !== null) {
                  if (opt.isCorrect) {
                    optStyle = 'border-[#16845B] bg-[#E1F3E3] text-[#005B46] font-extrabold';
                  } else if (isSelected && !opt.isCorrect) {
                    optStyle = 'border-[#C83D35] bg-red-50 text-[#C83D35] font-extrabold';
                  } else {
                    optStyle = 'opacity-50 border-slate-200 bg-white';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOptionSelect(opt)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left font-bold text-base sm:text-lg transition-all flex items-center justify-between gap-3 ${optStyle}`}
                  >
                    <span>{opt.text}</span>
                    {selectedOption !== null && (
                      opt.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-[#16845B] shrink-0" />
                      ) : isSelected ? (
                        <XCircle className="w-6 h-6 text-[#C83D35] shrink-0" />
                      ) : null
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate Educational Feedback */}
            {selectedOption !== null && (
              <div
                className={`p-4 rounded-2xl border-2 ${
                  selectedOption.isCorrect
                    ? 'bg-[#E1F3E3] border-[#16845B] text-[#005B46]'
                    : 'bg-red-50 border-[#C83D35] text-[#C83D35]'
                }`}
              >
                <p className="font-extrabold text-base sm:text-lg">
                  {selectedOption.isCorrect ? '✅ ' : '❌ '}
                  {selectedOption.feedback}
                </p>
              </div>
            )}

            {/* Next Question Button */}
            {selectedOption !== null && (
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-8 py-3.5 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold text-lg rounded-2xl flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <span>
                    {currentQuizIdx < SAFETY_QUIZ_QUESTIONS.length - 1
                      ? isHi ? 'अगला सवाल (Next)' : 'Next Question'
                      : isHi ? 'परिणाम देखें' : 'View Quiz Result'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Completion Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E1F3E3] text-[#005B46] mx-auto flex items-center justify-center font-extrabold text-2xl">
              🏆
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#005B46]">
              {isHi ? 'सुरक्षा क्विज समाप्त!' : 'Scam Safety Quiz Completed!'}
            </h3>
            <p className="text-lg text-[#153B35] font-semibold">
              {isHi
                ? `आपका स्कोर: ${SAFETY_QUIZ_QUESTIONS.length} में से ${quizScore}`
                : `Your score: ${quizScore} out of ${SAFETY_QUIZ_QUESTIONS.length}`}
            </p>
            <p className="text-sm sm:text-base text-[#526B65] max-w-md mx-auto">
              {quizScore === SAFETY_QUIZ_QUESTIONS.length
                ? isHi ? 'अद्भुत! आप डिजिटल दुनिया में पूरी तरह सुरक्षित रहने के लिए तैयार हैं।' : 'Flawless! You understand the key rules of avoiding digital traps.'
                : isHi ? 'बहुत अच्छा प्रयास! याद रखें: कभी किसी को गुप्त पिन न बताएं और अनजान लिंक न दबाएं।' : 'Good practice! Always keep your PIN secret and never tap unknown links.'}
            </p>
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="px-6 py-3 bg-[#005B46] hover:bg-[#16845B] text-white font-bold rounded-2xl shadow-sm text-base"
            >
              {isHi ? 'दोबारा क्विज खेलें' : 'Retake Quiz'}
            </button>
          </div>
        )}
      </section>

      {/* 6. Official Indian Helplines Info Box */}
      <div className="bg-[#FAF9F3] border-2 border-[#D7E4DD] rounded-2xl p-5 text-xs sm:text-sm text-[#526B65] space-y-2">
        <h4 className="font-extrabold text-[#153B35] text-base">
          {isHi ? '📞 महत्वपूर्ण राष्ट्रीय हेल्पलाइन नंबर:' : '📞 Official Emergency Helplines in India:'}
        </h4>
        <p>
          <strong className="text-[#005B46]">1930:</strong> {isHi ? 'राष्ट्रीय साइबर अपराध हेल्पलाइन (National Cyber Crime)' : 'National Cyber Crime Reporting Helpline'}
        </p>
        <p>
          <strong className="text-[#005B46]">112:</strong> {isHi ? 'अखिल भारतीय आपातकालीन पुलिस सेवा' : 'All-India National Emergency Helpline'}
        </p>
        <p className="text-[11px] text-slate-500 pt-1">
          * Digital Sathi provides simulated education. It does not directly verify phone numbers or inspect private SMS without user consent.
        </p>
      </div>
    </div>
  );
};
