import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  PROFILE: 'digisathi_profile',
  GOAL: 'digisathi_selected_goal',
  COMPLETED_LESSONS: 'digisathi_completed_lessons',
  LAST_LESSON: 'digisathi_last_lesson',
  PREFERENCES: 'digisathi_preferences',
};

export const AppProvider = ({ children }) => {
  // 1. Profile State
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 2. Learning Goal
  const [selectedGoal, setSelectedGoal] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.GOAL) || 'call';
    } catch {
      return 'call';
    }
  });

  // 3. Completed Lessons
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return saved ? JSON.parse(saved) : ['call-1']; // Give 1 starter completion or empty
    } catch {
      return ['call-1'];
    }
  });

  // 4. Last Opened Lesson
  const [lastOpenedLesson, setLastOpenedLesson] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.LAST_LESSON) || 'videocall-1';
    } catch {
      return 'videocall-1';
    }
  });

  // 5. Accessibility Preferences
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return saved ? JSON.parse(saved) : {
        textSize: 'standard', // 'standard' | 'large' | 'xlarge'
        language: 'en',       // 'en' | 'hi'
        speechRate: 0.9,      // slightly slower for seniors
        voiceEnabled: true,
      };
    } catch {
      return {
        textSize: 'standard',
        language: 'en',
        speechRate: 0.9,
        voiceEnabled: true,
      };
    }
  });

  // Synchronize Text Size to document root
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-text-size', preferences.textSize);
    }
  }, [preferences.textSize]);

  // Persist Profile
  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  };

  // Persist Learning Goal
  const selectGoal = (goalId) => {
    setSelectedGoal(goalId);
    try {
      localStorage.setItem(STORAGE_KEYS.GOAL, goalId);
    } catch (e) {
      console.warn(e);
    }
  };

  // Mark lesson as completed
  const markLessonCompleted = (lessonId) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) return prev;
      const updated = [...prev, lessonId];
      try {
        localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const recordLessonAccess = (lessonId) => {
    setLastOpenedLesson(lessonId);
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_LESSON, lessonId);
    } catch (e) {
      console.warn(e);
    }
  };

  // Accessibility setters
  const setTextSize = (textSize) => {
    setPreferences((prev) => {
      const updated = { ...prev, textSize };
      try {
        localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const setLanguage = (language) => {
    setPreferences((prev) => {
      const updated = { ...prev, language };
      try {
        localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const setSpeechRate = (speechRate) => {
    setPreferences((prev) => {
      const updated = { ...prev, speechRate };
      try {
        localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const resetProgress = () => {
    setCompletedLessons([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_LESSONS);
    } catch (e) {
      console.warn(e);
    }
  };

  const value = {
    profile,
    updateProfile,
    selectedGoal,
    selectGoal,
    completedLessons,
    markLessonCompleted,
    isLessonCompleted,
    lastOpenedLesson,
    recordLessonAccess,
    preferences,
    setTextSize,
    setLanguage,
    setSpeechRate,
    resetProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
