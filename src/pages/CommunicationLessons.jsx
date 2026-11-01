import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LESSONS } from '../data/lessonsData';
import { VoicePlaybackButton } from '../components/VoicePlaybackButton';
import {
  Phone,
  PhoneCall,
  PhoneIncoming,
  UserPlus,
  MessageSquare,
  Image as ImageIcon,
  Mic,
  Video,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const ICON_LOOKUP = {
  'call-1': Phone,
  'call-2': PhoneIncoming,
  'call-3': UserPlus,
  'msg-1': MessageSquare,
  'msg-2': ImageIcon,
  'msg-3': Mic,
  'videocall-1': Video,
};

export const CommunicationLessons = () => {
  const { isLessonCompleted, preferences } = useApp();
  const isHi = preferences.language === 'hi';

  const callingLessons = ['call-1', 'call-2', 'call-3', 'videocall-1'].map((id) => LESSONS[id]);
  const messagingLessons = ['msg-1', 'msg-2', 'msg-3'].map((id) => LESSONS[id]);

  const callingCompletedCount = callingLessons.filter((l) => isLessonCompleted(l.id)).length;
  const messagingCompletedCount = messagingLessons.filter((l) => isLessonCompleted(l.id)).length;

  const audioSummaryEn =
    'Calling and Messaging Lessons. Learn to dial phone numbers, answer calls, save contacts, send WhatsApp messages, share photos, and make video calls at your own pace.';
  const audioSummaryHi =
    'कॉल और संदेश पाठ। अपनी गति से फोन डायल करना, कॉल उठाना, नया नंबर सेव करना, व्हाट्सएप संदेश भेजना, फोटो भेजना और वीडियो कॉल करना सीखें।';

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs sm:text-sm font-extrabold text-[#16845B] uppercase tracking-wider">
            {isHi ? 'संचार कौशल' : 'Communication Library'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#005B46] mt-1">
            {isHi ? 'कॉल और संदेश (Calling & Messaging)' : 'Calling & Messaging'}
          </h1>
          <p className="text-base sm:text-lg text-[#526B65] font-medium mt-1">
            {isHi
              ? 'अपनी गति से सीखें, जितनी बार चाहें अभ्यास करें।'
              : 'Learn step by step, at your own pace.'}
          </p>
        </div>

        <div>
          <VoicePlaybackButton
            text={audioSummaryEn}
            textHi={audioSummaryHi}
            label="Listen Summary"
            labelHi="विवरण सुनें"
          />
        </div>
      </div>

      {/* Category 1: Calling & Video Calls */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DFF2FC] text-[#1E40AF] flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#153B35]">
                {isHi ? '1. फोन और वीडियो कॉलिंग' : '1. Calling & Video Calls'}
              </h2>
              <span className="text-xs sm:text-sm font-bold text-[#526B65]">
                {callingCompletedCount} of {callingLessons.length} {isHi ? 'पूरे हुए' : 'completed'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {callingLessons.map((lesson) => {
            const Icon = ICON_LOOKUP[lesson.id] || Phone;
            const completed = isLessonCompleted(lesson.id);

            return (
              <Link
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between group shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 ${
                  completed
                    ? 'bg-white border-[#16845B]/40'
                    : 'bg-white border-[#D7E4DD] hover:border-[#16845B]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#DFF2FC] text-[#1E40AF] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>

                    {completed ? (
                      <span className="inline-flex items-center gap-1 bg-[#E1F3E3] text-[#005B46] text-xs font-bold px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isHi ? 'सीख लिया' : 'Completed'}</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-[#526B65] bg-slate-100 px-2.5 py-1 rounded-full">
                        {lesson.totalSteps} {isHi ? 'कदम' : 'Steps'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-[#153B35] group-hover:text-[#005B46] transition-colors">
                    {isHi ? lesson.titleHi : lesson.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#526B65] font-medium mt-1 leading-relaxed">
                    {lesson.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[#005B46] group-hover:underline">
                    {completed
                      ? isHi ? 'दोबारा देखें' : 'Practice Again'
                      : isHi ? 'शुरू करें' : 'Start Learning'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#E8F6F0] text-[#005B46] flex items-center justify-center group-hover:bg-[#005B46] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Category 2: WhatsApp & Messaging */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EDE5FC] text-[#5B21B6] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#153B35]">
                {isHi ? '2. व्हाट्सएप व संदेश' : '2. WhatsApp & Messaging'}
              </h2>
              <span className="text-xs sm:text-sm font-bold text-[#526B65]">
                {messagingCompletedCount} of {messagingLessons.length} {isHi ? 'पूरे हुए' : 'completed'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {messagingLessons.map((lesson) => {
            const Icon = ICON_LOOKUP[lesson.id] || MessageSquare;
            const completed = isLessonCompleted(lesson.id);

            return (
              <Link
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between group shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 ${
                  completed
                    ? 'bg-white border-[#16845B]/40'
                    : 'bg-white border-[#D7E4DD] hover:border-[#16845B]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#EDE5FC] text-[#5B21B6] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>

                    {completed ? (
                      <span className="inline-flex items-center gap-1 bg-[#E1F3E3] text-[#005B46] text-xs font-bold px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isHi ? 'सीख लिया' : 'Completed'}</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-[#526B65] bg-slate-100 px-2.5 py-1 rounded-full">
                        {lesson.totalSteps} {isHi ? 'कदम' : 'Steps'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-[#153B35] group-hover:text-[#5B21B6] transition-colors">
                    {isHi ? lesson.titleHi : lesson.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#526B65] font-medium mt-1 leading-relaxed">
                    {lesson.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[#005B46] group-hover:underline">
                    {completed
                      ? isHi ? 'दोबारा देखें' : 'Practice Again'
                      : isHi ? 'शुरू करें' : 'Start Learning'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#E8F6F0] text-[#005B46] flex items-center justify-center group-hover:bg-[#005B46] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
