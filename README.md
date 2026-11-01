# Digital Sathi (डिजिटल साथी)

> **Learn. Connect. Be Confident.**  
> An elder-friendly, voice-guided digital literacy web application designed to empower senior citizens and first-time smartphone users to navigate digital services safely and independently.

---

## 🌟 Project Overview

**Digital Sathi** is an accessible, modern, and compassionate web application crafted specifically for senior citizens. Rather than merely enlarging icons or dumbing down conventional interfaces, Digital Sathi acts as a **patient, voice-guided companion** that teaches core smartphone tasks step-by-step through:
- **Interactive Simulated Smartphone Screens**: Safe, risk-free interactive phone mockups where seniors can practice tapping without fear of breaking anything or contacting real external apps.
- **Voice-Guided Interaction**: High-quality speech synthesis (Text-to-Speech) and voice speech recognition (Speech-to-Text) using the standard Web Speech API, with adjustable speeds (slow pace for elders) and full support for both English and हिन्दी (Hindi).
- **Safe UPI Practice Sandbox**: A 100% dummy money payment simulation that teaches the golden rule: *"You only enter your UPI PIN to SEND money, never to receive."*
- **Scam Awareness & Safety Corner**: Interactive guide covering real-world scams (fake lottery/prize calls, suspicious SMS links, electricity bill disconnection threats, fake bank manager OTP calls, digital arrest extortion) with an interactive safety quiz.

---

## 🎨 Visual Design System & Elder Accessibility

The interface is built around high-contrast, warm, comforting tones designed to reduce visual strain:

| Element | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Dark Green** | `#005B46` | Brand anchor, main buttons, focused headers |
| **Secondary Green** | `#16845B` | Active highlights, success states, accents |
| **Light Green** | `#E1F3E3` | Pastel learning cards, subtle badges |
| **Pale Mint** | `#E8F6F0` | Sidebar active states, soft cards |
| **Light Blue** | `#DFF2FC` | Phone call lesson categories |
| **Light Purple** | `#EDE5FC` | Messaging / WhatsApp categories |
| **Light Orange** | `#FFE8D1` | Video call category and warning notices |
| **Background Cream** | `#FAF9F3` | Soft, warm background (avoids blinding white glare) |
| **Main Text** | `#153B35` | High-contrast readable typography |
| **Secondary Text** | `#526B65` | Subtitles, meta-information |
| **Border** | `#D7E4DD` | Distinct visual boundaries between cards |
| **Warning / Alert** | `#C83D35` | Fraud warnings and stop buttons |

### Accessibility Features
- **Dynamic Text Scaling**: 3 distinct sizes (`A` Standard, `A+` Large, `A++` Extra Large) accessible instantly from the top header and settings.
- **Large Touch Targets**: Minimum 48 × 48 CSS pixels on all buttons and interactive cards.
- **Voice Narration ("Hear Instructions")**: Available on every lesson step, dashboard greeting, and safety tip.
- **Slow Pace Narration (0.85x)**: Spoken voice is paced deliberately for senior ear comprehension.
- **Bilingual (English & हिन्दी)**: One-click toggle between English and Hindi across the entire app.
- **Strict Data Privacy**: All progress, preferences, and basic profiles are stored locally in the browser's `localStorage`—no phone numbers, passwords, or bank credentials are ever required.

---

## 📱 Eight Primary Screens

1. **Welcome & Profile Setup (`/welcome`)**:
   - Personalized onboarding asking only for Name, Age, and Occupation.
   - Welcoming mascot Sathi, friendly inline validation, and fast-track to Dashboard for returning users.
2. **Learning Goal Selection (`/goals`)**:
   - 5 pastel cards: Learn UPI, Make a Call, Send a Message, Use Video Call, Stay Safe.
   - Full keyboard accessibility and spoken audio options.
3. **Home Dashboard (`/dashboard`)**:
   - Personalized greeting ("Hello, [Name]!"), encouraging daily tip, learning progress tracker.
   - Feature shortcuts: "Learn Something New", "Continue Learning", "Ask Sathi", "Safety Corner", and UPI sandbox callout.
4. **Step-by-Step Lessons (`/lesson/:lessonId`)**:
   - Visual step indicator ("Step 1 of 3").
   - Interactive `PhoneSimulator` with realistic phone bezel, WhatsApp/Dialer screens, and interactive hotspots.
   - Spoken audio playback, "Repeat Instruction", "Next Step", and celebratory completion dialog with confetti.
5. **Voice Assistant — Sathi (`/assistant`)**:
   - Conversational voice/text interface powered by Sathi mascot.
   - Large microphone button with animated listening pulses and Web Speech recognition.
   - Instant educational responses on phone volume, messages, video calls, slow phone fixes, and UPI rules.
6. **UPI Practice Sandbox (`/upi-sandbox`)**:
   - Prominent banner: *"Practice Only — No Real Money Is Used"*.
   - 5-step payment simulation: Select dummy contact (Suresh Kumar, Meena Sharma, Sharma Kirana) → Enter dummy amount (₹150) → Review details → Enter dummy PIN keypad → Simulated receipt with reference `DEMO-123456`.
7. **Calling & Messaging Library (`/communication`)**:
   - Making a regular call, answering incoming calls, saving a contact, sending text messages, sending photos, and playing voice notes.
   - Real-time progress badges for each skill.
8. **Safety Tips & Scam Awareness (`/safety`)**:
   - Expandable breakdowns of common frauds (Fake Lottery, Suspicious Links, Bank OTP Scam, Electricity Scam, Digital Arrest).
   - "What should I do?" actionable steps and official Indian helpline references (1930 Cyber Crime, 112 Emergency).
   - Interactive 4-question scam awareness quiz with instant explanations.

---

## 🛠️ Technology Stack

- **Framework**: React 19 with Vite 8
- **Language**: Modern JavaScript (ES Modules, JSX)
- **Styling**: Tailwind CSS v3 with customized elder-friendly palette & Atkinson/Plus Jakarta typography
- **Icons**: Lucide React
- **Routing**: React Router DOM (v7)
- **Voice Input**: Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`)
- **Voice Output**: Web Speech API (`SpeechSynthesis`)
- **Animations / Celebrations**: Canvas Confetti & subtle CSS micro-interactions
- **Persistence**: Safe `localStorage` wrapper with graceful in-memory fallback

---

## 🚀 Running the Project Locally

### 1. Prerequisites
Ensure you have **Node.js** (v18+ or v20+) installed on your machine.

Check with:
```bash
node -v
npm -v
```

### 2. Clone the Repository and Navigate to It
```bash
git clone https://github.com/<your-username>/DigiSathi.git
cd DigiSathi
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Development Server
```bash
npm run dev
```

Vite will start the local development server (typically at `http://localhost:5173`). Open this URL in Google Chrome, Microsoft Edge, or any modern web browser.

### 5. Build for Production
To build the optimized static production bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🛡️ Educational & Safety Disclaimer

*Digital Sathi is an educational literacy tool designed for demonstration and learning. It does not initiate real banking transactions, contact financial institutions, or access private smartphone operating system controls without user action. All payment simulations use dummy tokens and fictional contact data.*
