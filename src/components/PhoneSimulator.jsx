import React, { useState } from 'react';
import {
  Wifi,
  Battery,
  Phone,
  Video,
  Camera,
  Image as ImageIcon,
  MessageSquare,
  Search,
  User,
  Play,
  Pause,
  Send,
  Check,
  CheckCheck,
  ShieldCheck,
  PhoneOff,
  Mic,
  ArrowLeft,
  CreditCard,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PhoneSimulator = ({
  step,
  onTargetAction,
  onNextStep,
}) => {
  const { preferences } = useApp();
  const isHi = preferences.language === 'hi';

  const [dialedNumber, setDialedNumber] = useState('98765 43210');
  const [typedMessage, setTypedMessage] = useState('Namaste Rohan, are you coming home today?');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [contactName, setContactName] = useState('Dr. Sharma (Cardiologist)');
  const [contactPhone, setContactPhone] = useState('98200 12345');
  const [tappedSuccess, setTappedSuccess] = useState(false);

  const screenType = step?.screenType || 'app_grid';

  const triggerAction = () => {
    setTappedSuccess(true);
    if (onTargetAction) onTargetAction();
    setTimeout(() => {
      setTappedSuccess(false);
      if (onNextStep) onNextStep();
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Phone Outer Shell */}
      <div className="relative w-[320px] sm:w-[350px] h-[580px] sm:h-[620px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700 select-none">
        {/* Notch / Speaker bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-800 rounded-full flex items-center justify-center gap-3 z-30">
          <div className="w-10 h-1 bg-slate-600 rounded-full" />
          <div className="w-2.5 h-2.5 bg-slate-700 rounded-full" />
        </div>

        {/* Screen Bezel */}
        <div className="relative w-full h-full bg-[#FAF9F3] rounded-[34px] overflow-hidden flex flex-col border border-slate-300">
          {/* Top Status Bar */}
          <div className="h-8 bg-slate-100/90 text-slate-800 flex items-center justify-between px-5 text-xs font-bold pt-1 z-20">
            <span>09:41</span>
            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px]">98%</span>
                <Battery className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>

          {/* Screen Content Body */}
          <div className="flex-1 flex flex-col overflow-y-auto relative bg-[#F7F6F0]">
            {/* 1. App Grid (Step 1 of Video call or messages) */}
            {screenType === 'app_grid' && (
              <div className="p-4 flex flex-col h-full justify-between">
                <div>
                  <div className="text-center my-4">
                    <span className="text-xs font-semibold text-slate-500">Wednesday, 21 Oct</span>
                    <h3 className="text-3xl font-extrabold text-[#005B46]">09:41</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8 px-2">
                    {/* Highlighted WhatsApp Icon */}
                    <button
                      type="button"
                      onClick={triggerAction}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white border-2 border-[#16845B] shadow-md transition-transform hover:scale-105 active:scale-95 group focus:outline-none ring-4 ring-[#16845B]/30"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md relative">
                        <MessageSquare className="w-8 h-8 fill-current" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                          2
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-[#005B46]">WhatsApp</span>
                      <span className="text-[10px] font-bold text-[#16845B] bg-[#E1F3E3] px-2 py-0.5 rounded-full animate-bounce">
                        👆 {isHi ? 'यहाँ टैप करें' : 'Tap Here'}
                      </span>
                    </button>

                    {/* Other dummy apps */}
                    <div className="flex flex-col items-center gap-1.5 p-2 opacity-60">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center">
                        <Phone className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">Phone</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 p-2 opacity-60">
                      <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white flex items-center justify-center">
                        <Camera className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">Camera</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 p-2 opacity-60">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
                        <ImageIcon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">Photos</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 p-2 opacity-60">
                      <div className="w-14 h-14 rounded-2xl bg-[#005B46] text-white flex items-center justify-center">
                        <CreditCard className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">Pay</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 p-2 opacity-60">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center">
                        <ShieldCheck className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">Safe</span>
                    </div>
                  </div>
                </div>

                <div className="text-center pb-2">
                  <p className="text-xs font-bold text-[#16845B] bg-[#E1F3E3] p-2 rounded-xl">
                    {isHi ? 'हरे व्हाट्सएप आइकन पर टैप करें।' : 'Tap the green WhatsApp app icon.'}
                  </p>
                </div>
              </div>
            )}

            {/* 2. Contact Picker (WhatsApp / Contacts List) */}
            {screenType === 'contact_picker' && (
              <div className="flex flex-col h-full bg-white">
                <div className="bg-[#005B46] text-white p-3 flex items-center justify-between shadow-sm">
                  <span className="font-bold text-base">Select Contact</span>
                  <Search className="w-5 h-5" />
                </div>

                <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
                  {/* Highlighted contact */}
                  <button
                    type="button"
                    onClick={triggerAction}
                    className="w-full text-left p-3.5 flex items-center gap-3 bg-[#E8F6F0] border-2 border-[#16845B] hover:bg-[#d6f0e4] transition-colors ring-4 ring-[#16845B]/30"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#16845B] text-white flex items-center justify-center font-bold text-lg">
                      R
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[#005B46] text-base">Rohan (Son)</span>
                        <span className="text-[10px] bg-[#005B46] text-white font-bold px-2 py-0.5 rounded-full animate-bounce">
                          👆 {isHi ? 'चुनें' : 'Tap to Pick'}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#526B65]">Online • Family</p>
                    </div>
                  </button>

                  {/* Other contacts */}
                  <div className="p-3.5 flex items-center gap-3 opacity-60">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      P
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 text-sm">Priya (Daughter)</span>
                      <p className="text-xs text-slate-500">Yesterday: Namaste Papa</p>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center gap-3 opacity-60">
                    <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                      D
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 text-sm">Dr. Sharma</span>
                      <p className="text-xs text-slate-500">Clinic open at 5 PM</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
                  <span className="text-xs font-bold text-[#005B46]">
                    {isHi ? '“Rohan (Son)” पर टैप करें।' : 'Tap on “Rohan (Son)” to start.'}
                  </span>
                </div>
              </div>
            )}

            {/* 3. Chat Screen with Video Call Icon Highlighted */}
            {screenType === 'chat_screen_call' && (
              <div className="flex flex-col h-full bg-[#E5DDD5]">
                {/* Chat Top Bar */}
                <div className="bg-[#005B46] text-white p-3 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="w-5 h-5" />
                    <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-sm">
                      R
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-tight">Rohan (Son)</p>
                      <p className="text-[10px] text-emerald-200">Online</p>
                    </div>
                  </div>

                  {/* Pulsing Video Camera Icon */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={triggerAction}
                      className="p-2 rounded-xl bg-white text-[#005B46] shadow-md border-2 border-emerald-300 ring-4 ring-emerald-300/60 animate-bounce active:scale-95"
                      title="Tap to Video Call"
                    >
                      <Video className="w-6 h-6 fill-current text-[#005B46]" />
                    </button>
                    <Phone className="w-5 h-5 text-emerald-200 opacity-60" />
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-3 flex flex-col justify-end gap-2">
                  <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-sm max-w-[80%] self-start border border-slate-200">
                    <p className="text-xs text-slate-800">Namaste Papa! Are you free for a quick video call?</p>
                    <span className="text-[9px] text-slate-400 block text-right mt-1">09:39</span>
                  </div>

                  <div className="bg-[#E8F6F0] border-2 border-[#16845B] rounded-2xl p-2.5 text-center my-2 shadow-sm">
                    <p className="text-xs font-extrabold text-[#005B46]">
                      👆 {isHi ? 'ऊपर वीडियो कैमरा आइकन पर टैप करें!' : 'Tap the Video Camera icon at top right!'}
                    </p>
                  </div>
                </div>

                {/* Dummy Input bar */}
                <div className="bg-white p-2 flex items-center gap-2 border-t border-slate-200">
                  <div className="flex-1 bg-slate-100 rounded-full px-3 py-1.5 text-xs text-slate-400">
                    Message
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#16845B] text-white flex items-center justify-center">
                    <Mic className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {/* 4. Dialer Home / Keypad Active (Making a Call) */}
            {(screenType === 'dialer_home' || screenType === 'keypad_active') && (
              <div className="flex flex-col h-full bg-white">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase">Number to dial</span>
                  <div className="text-2xl font-extrabold text-[#005B46] tracking-wider mt-1">
                    {dialedNumber}
                  </div>
                </div>

                {/* Keypad Grid */}
                <div className="flex-1 grid grid-cols-3 gap-2 p-4 text-center">
                  {[
                    ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
                    ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
                    ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
                    ['*', ''], ['0', '+'], ['#', '']
                  ].map(([digit, sub]) => (
                    <button
                      key={digit}
                      type="button"
                      onClick={() => setDialedNumber((prev) => (prev.length < 13 ? prev + digit : prev))}
                      className="flex flex-col items-center justify-center h-12 bg-slate-50 hover:bg-[#E8F6F0] rounded-2xl border border-slate-200 font-extrabold text-lg text-slate-800 active:scale-95 transition-colors"
                    >
                      <span>{digit}</span>
                      {sub && <span className="text-[8px] text-slate-400 font-medium -mt-1">{sub}</span>}
                    </button>
                  ))}
                </div>

                {/* Big Green Call Button */}
                <div className="p-4 flex flex-col items-center gap-2 bg-slate-50 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={triggerAction}
                    className="w-20 h-20 rounded-full bg-[#16845B] hover:bg-[#005B46] text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-300 animate-pulse active:scale-90 transition-all"
                    title="Tap to Call"
                  >
                    <Phone className="w-10 h-10 fill-current" />
                  </button>
                  <span className="text-xs font-extrabold text-[#005B46] bg-[#E1F3E3] px-3 py-1 rounded-full">
                    👆 {isHi ? 'हरे कॉल बटन को दबाएं' : 'Tap Green Call Button'}
                  </span>
                </div>
              </div>
            )}

            {/* 5. Calling Connected Screen */}
            {screenType === 'calling_screen' && (
              <div className="flex flex-col h-full bg-slate-900 text-white p-6 justify-between items-center text-center">
                <div className="pt-8">
                  <div className="w-24 h-24 rounded-full bg-[#16845B] mx-auto flex items-center justify-center text-3xl font-extrabold text-white shadow-lg ring-4 ring-emerald-500/50">
                    R
                  </div>
                  <h3 className="text-xl font-bold mt-4">Rohan (Son)</h3>
                  <p className="text-sm text-emerald-400 font-medium animate-pulse mt-1">
                    Connected • 00:08
                  </p>
                </div>

                <div className="w-full bg-slate-800/80 rounded-2xl p-4 text-xs text-slate-300">
                  <p className="font-bold text-white text-sm mb-1">
                    {isHi ? 'कॉल चालू है!' : 'Call in progress!'}
                  </p>
                  {isHi
                    ? 'फोन को कान के पास रखें या लाउडस्पीकर दबाएं।'
                    : 'Hold phone to your ear, or tap speaker for loud voice.'}
                </div>

                <button
                  type="button"
                  onClick={triggerAction}
                  className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg active:scale-95"
                  title="End Call"
                >
                  <PhoneOff className="w-8 h-8" />
                </button>
              </div>
            )}

            {/* 6. Incoming Ringing Screen (Answer Incoming Call) */}
            {(screenType === 'incoming_ringing' || screenType === 'incoming_swipe') && (
              <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-emerald-950 text-white p-6 justify-between items-center text-center">
                <div className="pt-6">
                  <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest">
                    Incoming Call
                  </span>
                  <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mt-4 flex items-center justify-center ring-4 ring-emerald-400/50 animate-pulse">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold mt-3">Rohan (Son)</h3>
                  <p className="text-sm text-slate-300">+91 98765 43210</p>
                </div>

                <div className="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-xs text-emerald-100">
                  {isHi ? 'कॉल उठाने के लिए हरा बटन दबाएं' : 'Tap Green Button to Answer'}
                </div>

                {/* Call buttons: Red (Decline) and Green (Accept) */}
                <div className="flex items-center justify-around w-full pb-4">
                  <div className="flex flex-col items-center gap-1 opacity-70">
                    <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center">
                      <PhoneOff className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] text-slate-300">Decline</span>
                  </div>

                  <button
                    type="button"
                    onClick={triggerAction}
                    className="flex flex-col items-center gap-1 group active:scale-95"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#16845B] text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-400 animate-bounce">
                      <Phone className="w-9 h-9 fill-current" />
                    </div>
                    <span className="text-xs font-extrabold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500">
                      👆 {isHi ? 'उत्तर दें (Answer)' : 'Answer Call'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* 7. Contacts Form (Saving a Contact) */}
            {(screenType === 'contacts_plus' || screenType === 'contacts_form' || screenType === 'contacts_saved') && (
              <div className="flex flex-col h-full bg-white">
                <div className="bg-[#005B46] text-white p-3 flex items-center justify-between">
                  <span className="font-bold text-sm">New Contact</span>
                  <button
                    type="button"
                    onClick={triggerAction}
                    className="bg-[#16845B] hover:bg-emerald-600 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 ring-2 ring-white"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>

                <div className="p-4 space-y-4 flex-1">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#E8F6F0] border-2 border-[#16845B] flex items-center justify-center text-[#005B46]">
                      <User className="w-10 h-10" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border-2 border-[#16845B] bg-[#FAF9F3] text-sm font-bold text-[#005B46]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border-2 border-[#16845B] bg-[#FAF9F3] text-sm font-bold text-[#005B46]"
                    />
                  </div>

                  <div className="bg-[#E1F3E3] p-3 rounded-2xl border border-[#16845B]">
                    <p className="text-xs font-bold text-[#005B46] text-center">
                      👆 {isHi ? 'ऊपर "Save" बटन पर टैप करें।' : 'Tap "Save" button at the top right.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 8. WhatsApp Message Typing */}
            {(screenType === 'whatsapp_home' || screenType === 'chat_select' || screenType === 'chat_typing') && (
              <div className="flex flex-col h-full bg-[#E5DDD5]">
                <div className="bg-[#005B46] text-white p-3 flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-sm">
                    R
                  </div>
                  <span className="font-bold text-sm">Rohan (Son)</span>
                </div>

                <div className="flex-1 p-3 flex flex-col justify-end gap-2">
                  <div className="bg-[#E8F6F0] p-2.5 rounded-2xl border border-[#16845B] text-center text-xs font-bold text-[#005B46]">
                    {isHi ? 'नीचे हरे तीर वाले बटन पर टैप करें।' : 'Tap the green arrow button to send.'}
                  </div>
                </div>

                {/* Message input bar with green arrow button */}
                <div className="bg-white p-2 flex items-center gap-2 border-t border-slate-200">
                  <input
                    type="text"
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                    className="flex-1 bg-slate-100 rounded-2xl px-3 py-2 text-xs font-medium text-slate-800 border border-slate-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={triggerAction}
                    className="w-10 h-10 rounded-full bg-[#16845B] hover:bg-[#005B46] text-white flex items-center justify-center shadow-md ring-4 ring-emerald-300 animate-bounce active:scale-90"
                    title="Send Message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* 9. Photo Attachment / Preview */}
            {(screenType === 'chat_attachment' || screenType === 'photo_preview') && (
              <div className="flex flex-col h-full bg-slate-900 text-white p-3 justify-between">
                <div className="flex items-center justify-between text-xs font-bold p-1">
                  <span>Photo Preview</span>
                  <span className="text-emerald-400">Rohan (Son)</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center my-2 bg-slate-800 rounded-2xl p-4 border border-slate-700">
                  <div className="w-full h-44 rounded-xl bg-gradient-to-tr from-amber-200 to-orange-300 flex flex-col items-center justify-center text-slate-800 p-4 text-center shadow-inner">
                    <span className="text-4xl">🌸</span>
                    <span className="font-extrabold text-sm mt-2">Family Diya & Flowers</span>
                    <span className="text-[10px] text-slate-600">Morning Greetings</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-3 font-medium text-center">
                    Photo ready to send to family
                  </p>
                </div>

                <div className="flex items-center justify-between bg-slate-800 p-2 rounded-2xl">
                  <span className="text-xs text-slate-400 px-2">Add a caption...</span>
                  <button
                    type="button"
                    onClick={triggerAction}
                    className="w-12 h-12 rounded-full bg-[#16845B] hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-400 animate-bounce"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}

            {/* 10. Voice Note Bubble */}
            {(screenType === 'voicenote_view' || screenType === 'voicenote_playing') && (
              <div className="flex flex-col h-full bg-[#E5DDD5] p-3 justify-end">
                <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-sm border border-slate-200 mb-6">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPlayingAudio(!isPlayingAudio);
                        triggerAction();
                      }}
                      className="w-12 h-12 rounded-full bg-[#16845B] text-white flex items-center justify-center shadow-md ring-4 ring-emerald-300 animate-bounce active:scale-95"
                    >
                      {isPlayingAudio ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 h-6">
                        {[40, 70, 90, 50, 80, 100, 60, 45, 90, 75, 40, 85].map((h, i) => (
                          <span
                            key={i}
                            className={`w-1 rounded-full transition-all ${
                              isPlayingAudio ? 'bg-[#16845B] animate-pulse' : 'bg-slate-300'
                            }`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                        <span>{isPlayingAudio ? '0:14 / 0:32' : '0:32'}</span>
                        <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#E8F6F0] p-3 rounded-2xl border-2 border-[#16845B] text-center mb-4">
                  <p className="text-xs font-extrabold text-[#005B46]">
                    👆 {isHi ? 'त्रिकोण प्ले बटन पर टैप करें।' : 'Tap the triangle Play button.'}
                  </p>
                </div>
              </div>
            )}

            {/* 11. UPI Golden Rule / Intro Screen */}
            {(screenType === 'upi_golden_rule' || screenType === 'qr_scanner' || screenType === 'upi_verify_name') && (
              <div className="flex flex-col h-full bg-[#FAF9F3] p-4 text-center justify-between">
                <div className="pt-4">
                  <div className="w-20 h-20 rounded-full bg-[#E1F3E3] border-4 border-[#005B46] mx-auto flex items-center justify-center text-[#005B46] shadow-sm">
                    <ShieldCheck className="w-12 h-12" />
                  </div>
                  <h4 className="text-lg font-extrabold text-[#005B46] mt-3">
                    {isHi ? 'UPI का सुनहरा नियम' : 'UPI Golden Rule'}
                  </h4>
                  <div className="bg-white border-2 border-[#16845B] rounded-2xl p-3 mt-4 text-xs font-bold text-[#153B35] leading-relaxed shadow-sm">
                    {isHi
                      ? 'पिन (PIN) केवल पैसे भेजने के लिए डाला जाता है। पैसे पाने के लिए कभी PIN न डालें।'
                      : 'You ONLY enter your PIN to SEND money. You NEVER enter a PIN to receive money.'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={triggerAction}
                  className="w-full py-3.5 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold text-sm rounded-2xl shadow-md ring-4 ring-emerald-300 active:scale-95 transition-all"
                >
                  {isHi ? 'मैंने समझ लिया (Continue)' : 'I Understand — Continue'}
                </button>
              </div>
            )}

            {/* Success overlay feedback */}
            {tappedSuccess && (
              <div className="absolute inset-0 bg-[#005B46]/85 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-white animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-white text-[#005B46] flex items-center justify-center shadow-lg">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>
                <p className="font-extrabold text-lg mt-3 text-center px-4">
                  {isHi ? 'बहुत बढ़िया! बिल्कुल सही।' : 'Great Job! Exactly Right.'}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Phone Bar */}
          <div className="h-6 bg-slate-100 flex items-center justify-center">
            <div className="w-28 h-1 bg-slate-400 rounded-full" />
          </div>
        </div>
      </div>

      <p className="text-xs font-semibold text-[#526B65] mt-2 text-center">
        {isHi
          ? 'यह एक सुरक्षित सिमुलेटर स्क्रीन है। आप बिना किसी झिझक के टैप कर सकते हैं।'
          : 'Interactive phone simulator. Safe to tap and practice!'}
      </p>
    </div>
  );
};
