import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VoicePlaybackButton } from '../components/VoicePlaybackButton';
import {
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  IndianRupee,
  Store,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const DEMO_CONTACTS = [
  {
    id: 'suresh',
    name: 'Suresh Kumar',
    nameHi: 'सुरेश कुमार (मित्र)',
    tag: 'Friend',
    phone: '+91 98765 00001',
    upiId: 'suresh@demoupi',
    avatarBg: 'bg-emerald-600',
    type: 'person',
  },
  {
    id: 'meena',
    name: 'Meena Sharma',
    nameHi: 'मीना शर्मा (बहन)',
    tag: 'Sister',
    phone: '+91 98765 00002',
    upiId: 'meena@demoupi',
    avatarBg: 'bg-purple-600',
    type: 'person',
  },
  {
    id: 'kirana',
    name: 'Sharma General Kirana Store',
    nameHi: 'शर्मा किराना एवं राशन स्टोर',
    tag: 'Local Grocery',
    phone: '+91 98765 00003',
    upiId: 'sharmakirana@demoupi',
    avatarBg: 'bg-blue-600',
    type: 'merchant',
  },
];

export const UPISandbox = () => {
  const { preferences, markLessonCompleted } = useApp();
  const isHi = preferences.language === 'hi';

  const [currentStep, setCurrentStep] = useState(1); // 1 to 5
  const [selectedContact, setSelectedContact] = useState(DEMO_CONTACTS[0]);
  const [amount, setAmount] = useState('150');
  const [amountError, setAmountError] = useState('');
  const [enteredPin, setEnteredPin] = useState('');
  const [demoBalance, setDemoBalance] = useState(5000);
  const [txReference, setTxReference] = useState('DEMO-123456');

  // Step 1: Contact selection
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  // Step 2: Validate Amount
  const handleAmountNext = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      setAmountError(isHi ? 'कृपया एक मान्य राशि दर्ज करें।' : 'Please enter a valid amount greater than 0.');
      return;
    }
    if (val > demoBalance) {
      setAmountError(isHi ? 'डमी बैलेंस से अधिक राशि नहीं डाल सकते।' : 'Amount exceeds dummy balance.');
      return;
    }
    setAmountError('');
    setCurrentStep(3);
  };

  // Step 4: Confirm Payment Simulation
  const handleSimulatePayment = () => {
    // Generate new dummy transaction id
    const randomRef = 'DEMO-' + Math.floor(100000 + Math.random() * 900000);
    setTxReference(randomRef);
    setDemoBalance((prev) => Math.max(0, prev - parseFloat(amount)));
    markLessonCompleted('upi-1');
    setCurrentStep(5);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setSelectedContact(DEMO_CONTACTS[0]);
    setAmount('150');
    setEnteredPin('');
    setAmountError('');
  };

  // Audio instructions for each step
  const speechGuide = {
    1: {
      en: 'Step 1: Choose a dummy recipient. Tap on Suresh Kumar, Meena Sharma, or Sharma Kirana Store.',
      hi: 'पहला कदम: एक डमी संपर्क चुनें। सुरेश कुमार, मीना शर्मा या शर्मा किराना स्टोर पर टैप करें।',
    },
    2: {
      en: `Step 2: Enter dummy practice money. You have ₹${demoBalance} practice balance. Type an amount like 150 rupees.`,
      hi: `दूसरा कदम: डमी अभ्यास राशि लिखें। आपके पास ₹${demoBalance} डमी बैलेंस है। उदाहरण के लिए 150 रुपये लिखें।`,
    },
    3: {
      en: 'Step 3: Review the details. Always verify the recipient name and amount before paying in real life.',
      hi: 'तीसरा कदम: विवरण की जांच करें। असली जीवन में हमेशा पैसे भेजने से पहले प्राप्तकर्ता का नाम और राशि जांचें।',
    },
    4: {
      en: 'Step 4: Enter dummy 4-digit PIN. Remember, you only enter your secret PIN to send money, never to receive.',
      hi: 'चौथा कदम: 4 अंकों का डमी पिन दर्ज करें। याद रखें, गुप्त पिन केवल पैसे भेजने के लिए होता है, पाने के लिए कभी नहीं।',
    },
    5: {
      en: 'Congratulations! You successfully simulated a digital payment with dummy money. No real money was touched.',
      hi: 'बधाई हो! आपने डमी पैसों से डिजिटल भुगतान का सुरक्षित अभ्यास पूरा कर लिया है। कोई भी असली पैसा खर्च नहीं हुआ।',
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 space-y-6">
      {/* 1. MANDATORY SAFETY BANNER */}
      <div className="bg-[#FFE8D1] border-3 border-[#FBBF24] rounded-3xl p-4 sm:p-5 shadow-sm flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#9A3412] text-white flex items-center justify-center shrink-0">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 bg-[#9A3412] text-white text-xs font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider mb-1">
            <span>🛡️ {isHi ? 'अभ्यास केवल — कोई असली पैसा नहीं' : 'Practice Only — No Real Money Is Used'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#7C2D12]">
            {isHi ? 'सुरक्षित UPI अभ्यास सैंडबॉक्स' : 'Safe UPI Practice Sandbox'}
          </h1>
          <p className="text-sm sm:text-base text-[#9A3412] font-semibold mt-0.5 leading-relaxed">
            {isHi
              ? 'यह एक 100% सुरक्षित अभ्यास वातावरण है। आप नकली (डमी) पैसों से बिना किसी डर के डिजिटल भुगतान सीख सकते हैं।'
              : 'This is a completely safe practice environment. Learn each step using dummy money without risking a single rupee.'}
          </p>
        </div>
      </div>

      {/* Top Controls: Voice Guide + Dummy Balance Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border-2 border-[#D7E4DD] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#526B65] uppercase">
            {isHi ? 'डमी वॉलेट बैलेंस:' : 'Dummy Balance:'}
          </span>
          <span className="text-xl font-extrabold text-[#005B46] bg-[#E1F3E3] px-3 py-1 rounded-xl">
            ₹{demoBalance.toLocaleString('en-IN')} (Dummy)
          </span>
        </div>

        <VoicePlaybackButton
          text={speechGuide[currentStep]?.en}
          textHi={speechGuide[currentStep]?.hi}
          label="Listen Guide"
          labelHi="निर्देश सुनें"
        />
      </div>

      {/* Progress Tracker (5 Steps) */}
      <div className="bg-white p-4 rounded-2xl border-2 border-[#D7E4DD] shadow-sm">
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
          {[
            { step: 1, label: isHi ? '1. संपर्क' : '1. Contact' },
            { step: 2, label: isHi ? '2. राशि' : '2. Amount' },
            { step: 3, label: isHi ? '3. जांचें' : '3. Review' },
            { step: 4, label: isHi ? '4. पिन' : '4. PIN' },
            { step: 5, label: isHi ? '5. रसीद' : '5. Receipt' },
          ].map((item) => (
            <div
              key={item.step}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                currentStep === item.step
                  ? 'bg-[#005B46] text-white shadow-sm'
                  : currentStep > item.step
                  ? 'bg-[#E1F3E3] text-[#005B46]'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {currentStep > item.step ? (
                <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
              ) : (
                <span>●</span>
              )}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: SELECT CONTACT */}
      {currentStep === 1 && (
        <div className="elder-card p-6 sm:p-8 bg-white rounded-3xl space-y-6">
          <div>
            <span className="text-xs font-extrabold text-[#16845B] uppercase tracking-wider">
              {isHi ? 'चरण 1 / 5' : 'Step 1 of 5'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153B35] mt-1">
              {isHi ? 'किसको पैसे भेजने का अभ्यास करना है?' : 'Select a Demo Contact'}
            </h2>
            <p className="text-base text-[#526B65] font-medium mt-1">
              {isHi
                ? 'नीचे दिए गए किसी भी काल्पनिक (डमी) संपर्क पर टैप करें।'
                : 'Tap any fictional contact below to practice sending money.'}
            </p>
          </div>

          <div className="space-y-3">
            {DEMO_CONTACTS.map((contact) => {
              const isSelected = selectedContact.id === contact.id;
              return (
                <div
                  key={contact.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectContact(contact)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleSelectContact(contact);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#005B46] bg-[#E8F6F0] ring-4 ring-[#005B46]/20 shadow-sm'
                      : 'border-[#D7E4DD] bg-[#FAF9F3] hover:border-[#16845B]/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl ${contact.avatarBg} text-white flex items-center justify-center font-extrabold text-xl shadow-sm`}
                    >
                      {contact.type === 'merchant' ? (
                        <Store className="w-7 h-7" />
                      ) : (
                        contact.name[0]
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg sm:text-xl font-extrabold text-[#153B35]">
                          {isHi ? contact.nameHi : contact.name}
                        </span>
                        <span className="text-xs bg-white border border-slate-300 px-2 py-0.5 rounded-full font-bold text-slate-600">
                          {contact.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#526B65] font-semibold mt-0.5">
                        {contact.phone} • {contact.upiId}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-8 h-8 rounded-full bg-[#005B46] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="w-full sm:w-auto px-8 py-4 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-md transition-all active:scale-95"
            >
              <span>{isHi ? 'आगे बढ़ें (Next)' : 'Continue to Amount'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: ENTER DUMMY AMOUNT */}
      {currentStep === 2 && (
        <div className="elder-card p-6 sm:p-8 bg-white rounded-3xl space-y-6">
          <div>
            <span className="text-xs font-extrabold text-[#16845B] uppercase tracking-wider">
              {isHi ? 'चरण 2 / 5' : 'Step 2 of 5'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153B35] mt-1">
              {isHi ? 'डमी अभ्यास राशि दर्ज करें' : 'Enter Dummy Amount'}
            </h2>
            <p className="text-base text-[#526B65] font-medium mt-1">
              {isHi
                ? `प्राप्तकर्ता: ${selectedContact.name}। आप कोई भी छोटी राशि दर्ज कर सकते हैं।`
                : `Paying to: ${selectedContact.name}. Enter dummy rupees to simulate payment.`}
            </p>
          </div>

          {/* Amount Input with big ₹ sign */}
          <div>
            <label className="block text-sm font-extrabold text-[#526B65] uppercase mb-2">
              {isHi ? 'डमी राशि (रुपये में)' : 'Simulated Practice Amount (₹)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#005B46]">
                <IndianRupee className="w-8 h-8" />
              </div>
              <input
                type="number"
                min="1"
                max={demoBalance}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="w-full pl-14 pr-4 py-4 text-3xl font-extrabold text-[#005B46] bg-[#FAF9F3] border-2 border-[#16845B] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#005B46]/20"
              />
            </div>
            {amountError && (
              <p className="text-sm font-bold text-[#C83D35] mt-2">⚠️ {amountError}</p>
            )}
          </div>

          {/* Quick preset buttons */}
          <div>
            <span className="text-xs font-bold text-[#526B65] block mb-2">
              {isHi ? 'त्वरित चयन:' : 'Quick Select:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {['50', '100', '250', '500'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className="px-4 py-2 bg-[#E8F6F0] hover:bg-[#d6f0e4] text-[#005B46] border border-[#16845B]/40 rounded-xl font-bold text-base transition-colors"
                >
                  ₹{preset}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-full sm:w-auto px-6 py-3.5 border-2 border-[#D7E4DD] text-[#153B35] font-bold rounded-2xl flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isHi ? 'पिछला (Back)' : 'Back'}</span>
            </button>

            <button
              type="button"
              onClick={handleAmountNext}
              className="w-full sm:w-auto px-8 py-4 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
            >
              <span>{isHi ? 'जांचें (Review)' : 'Review Details'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: REVIEW DETAILS */}
      {currentStep === 3 && (
        <div className="elder-card p-6 sm:p-8 bg-white rounded-3xl space-y-6">
          <div>
            <span className="text-xs font-extrabold text-[#16845B] uppercase tracking-wider">
              {isHi ? 'चरण 3 / 5' : 'Step 3 of 5'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153B35] mt-1">
              {isHi ? 'विवरण की जांच करें' : 'Review Details Before Sending'}
            </h2>
            <p className="text-base text-[#526B65] font-medium mt-1">
              {isHi
                ? 'हमेशा प्राप्तकर्ता का नाम और राशि दो बार जांचें।'
                : 'Golden safety habit: Double check the recipient name and amount.'}
            </p>
          </div>

          {/* Verification Box */}
          <div className="bg-[#FAF9F3] border-2 border-[#D7E4DD] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D7E4DD]">
              <span className="text-sm font-bold text-[#526B65]">{isHi ? 'भेज रहे हैं (Paying to):' : 'Paying To:'}</span>
              <span className="text-lg font-extrabold text-[#153B35]">{selectedContact.name}</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-[#D7E4DD]">
              <span className="text-sm font-bold text-[#526B65]">{isHi ? 'UPI आईडी:' : 'UPI ID / Number:'}</span>
              <span className="text-sm font-semibold text-slate-700">{selectedContact.upiId}</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-[#D7E4DD]">
              <span className="text-sm font-bold text-[#526B65]">{isHi ? 'अभ्यास राशि:' : 'Simulated Amount:'}</span>
              <span className="text-2xl font-extrabold text-[#005B46]">₹{amount} (Dummy)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#526B65]">{isHi ? 'खाते से कटौती:' : 'Source:'}</span>
              <span className="text-sm font-semibold text-[#16845B]">Safe Sandbox Wallet</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="w-full sm:w-auto px-6 py-3.5 border-2 border-[#D7E4DD] text-[#153B35] font-bold rounded-2xl flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isHi ? 'बदलाव करें (Edit)' : 'Change Amount'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="w-full sm:w-auto px-8 py-4 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
            >
              <span>{isHi ? 'पिन दर्ज करें (Proceed to PIN)' : 'Proceed to Practice PIN'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ENTER DUMMY PIN & CONFIRM SIMULATION */}
      {currentStep === 4 && (
        <div className="elder-card p-6 sm:p-8 bg-white rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-xs font-extrabold text-[#16845B] uppercase tracking-wider">
              {isHi ? 'चरण 4 / 5' : 'Step 4 of 5'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153B35] mt-1">
              {isHi ? 'डमी UPI PIN दर्ज करें' : 'Enter 4-Digit Practice PIN'}
            </h2>
            <p className="text-base text-[#526B65] font-medium mt-1">
              {isHi
                ? 'अभ्यास के लिए कोई भी 4 अंक दबाएं (उदा. 1 2 3 4)। यह कभी किसी के साथ शेयर न करें।'
                : 'For practice, enter any 4 digits (e.g. 1 2 3 4). In real life, never share this secret PIN.'}
            </p>
          </div>

          {/* Golden Reminder Alert */}
          <div className="bg-[#E8F6F0] border-2 border-[#16845B] rounded-2xl p-4 text-center">
            <p className="text-sm font-extrabold text-[#005B46]">
              {isHi
                ? '⚠️ नियम: PIN केवल पैसे भेजने के लिए डाला जाता है। पैसे पाने के लिए कभी PIN नहीं डालते।'
                : '⚠️ Golden Rule: You only enter your PIN to SEND money, NEVER to receive money.'}
            </p>
          </div>

          {/* PIN Dots Display */}
          <div className="flex justify-center gap-3 my-4">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  enteredPin.length > idx
                    ? 'bg-[#005B46] border-[#005B46] scale-110'
                    : 'bg-slate-100 border-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Simulated PIN Pad */}
          <div className="max-w-xs mx-auto grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '✓'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (key === 'C') {
                    setEnteredPin('');
                  } else if (key === '✓') {
                    if (enteredPin.length === 4) handleSimulatePayment();
                  } else {
                    if (enteredPin.length < 4) setEnteredPin((prev) => prev + key);
                  }
                }}
                className={`h-14 rounded-2xl font-extrabold text-xl flex items-center justify-center transition-all active:scale-90 ${
                  key === '✓'
                    ? 'bg-[#16845B] text-white shadow-sm hover:bg-[#005B46]'
                    : key === 'C'
                    ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 hover:bg-[#E8F6F0]'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Confirm Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="w-full sm:w-auto px-6 py-3.5 border-2 border-[#D7E4DD] text-[#153B35] font-bold rounded-2xl flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{isHi ? 'पिछला (Back)' : 'Back'}</span>
            </button>

            <button
              type="button"
              onClick={handleSimulatePayment}
              className="w-full sm:w-auto px-8 py-4 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all"
            >
              <Lock className="w-5 h-5" />
              <span>{isHi ? 'सिम्युलेट भुगतान करें' : 'Simulate Payment (Practice)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: COMPLETION RECEIPT */}
      {currentStep === 5 && (
        <div className="elder-card p-6 sm:p-8 bg-white rounded-3xl space-y-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#E1F3E3] border-4 border-[#16845B] mx-auto flex items-center justify-center text-[#005B46] shadow-sm animate-bounce">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div>
            <div className="inline-block bg-[#E1F3E3] text-[#005B46] text-xs font-extrabold px-3 py-1 rounded-full uppercase mb-2">
              {isHi ? 'डमी अभ्यास सफल' : 'Simulated Payment Successful'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#005B46]">
              ₹{amount} (Dummy)
            </h2>
            <p className="text-lg text-[#153B35] font-bold mt-1">
              {isHi
                ? `${selectedContact.name} को डमी अभ्यास भुगतान भेजा गया`
                : `Simulated payment sent to ${selectedContact.name}`}
            </p>
          </div>

          {/* Receipt Card */}
          <div className="max-w-md mx-auto bg-[#FAF9F3] border-2 border-[#D7E4DD] rounded-2xl p-4 text-left space-y-2 text-sm font-semibold">
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="font-mono text-[#005B46] font-bold">{txReference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date & Time:</span>
              <span className="text-slate-800">21 Oct 2026, 09:41 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Practice Wallet Balance:</span>
              <span className="font-bold text-slate-800">₹{demoBalance.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-[#E8F6F0] border border-[#16845B]/40 rounded-2xl p-4 text-left max-w-md mx-auto">
            <h3 className="font-extrabold text-[#005B46] text-base mb-1">
              {isHi ? 'आपने क्या सीखा?' : 'What You Learned:'}
            </h3>
            <ul className="text-xs sm:text-sm text-[#153B35] space-y-1.5 list-disc pl-4 font-medium">
              <li>{isHi ? 'प्राप्तकर्ता का नाम हमेशा भुगतान से पहले जांचें।' : 'Always verify the recipient name before paying.'}</li>
              <li>{isHi ? 'पिन हमेशा गुप्त रखें, किसी को न बताएं।' : 'Never disclose your secret UPI PIN to anyone.'}</li>
              <li>{isHi ? 'पैसे पाने के लिए कभी पिन नहीं डालना होता।' : 'You never enter your PIN to receive money.'}</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#005B46] hover:bg-[#16845B] text-white font-extrabold text-base rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{isHi ? 'दोबारा अभ्यास करें' : 'Practice Again'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
