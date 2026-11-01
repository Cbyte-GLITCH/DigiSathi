import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppHeader } from './components/AppHeader';
import { DesktopSidebar } from './components/DesktopSidebar';
import { MobileNavigation } from './components/MobileNavigation';

import { ProfileSetup } from './pages/ProfileSetup';
import { LearningGoals } from './pages/LearningGoals';
import { Dashboard } from './pages/Dashboard';
import { LessonPlayer } from './pages/LessonPlayer';
import { VoiceAssistant } from './pages/VoiceAssistant';
import { UPISandbox } from './pages/UPISandbox';
import { CommunicationLessons } from './pages/CommunicationLessons';
import { SafetyCorner } from './pages/SafetyCorner';
import { SettingsPage } from './pages/SettingsPage';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isWelcome = location.pathname === '/welcome';

  if (isWelcome) {
    return <main className="min-h-screen bg-[#FAF9F3]">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-[#FAF9F3] flex flex-col text-[#153B35]">
      {/* Shared Accessible Header */}
      <AppHeader />

      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar Navigation */}
        <DesktopSidebar />

        {/* Primary Page Content Area */}
        <main className="flex-1 pb-24 lg:pb-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Accessible Mobile Bottom Navigation */}
      <MobileNavigation />
    </div>
  );
};

const RootRedirect = () => {
  const { profile } = useApp();
  // If user hasn't set up profile yet, send to /welcome; otherwise /dashboard
  return profile?.name ? <Navigate to="/dashboard" replace /> : <Navigate to="/welcome" replace />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/welcome" element={<ProfileSetup />} />
            <Route path="/goals" element={<LearningGoals />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lesson/:lessonId" element={<LessonPlayer />} />
            <Route path="/assistant" element={<VoiceAssistant />} />
            <Route path="/upi-sandbox" element={<UPISandbox />} />
            <Route path="/communication" element={<CommunicationLessons />} />
            <Route path="/safety" element={<SafetyCorner />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppLayout>
      </Router>
    </AppProvider>
  );
}

export default App;
