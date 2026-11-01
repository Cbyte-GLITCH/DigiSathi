import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  PhoneCall,
  CreditCard,
  Bot,
  ShieldAlert,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DesktopSidebar = () => {
  const { preferences, completedLessons } = useApp();
  const isHi = preferences.language === 'hi';

  const navItems = [
    {
      to: '/dashboard',
      label: isHi ? 'होम' : 'Home',
      icon: Home,
      badge: null,
    },
    {
      to: '/goals',
      label: isHi ? 'सीखें' : 'Learn Goals',
      icon: BookOpen,
      badge: null,
    },
    {
      to: '/communication',
      label: isHi ? 'कॉल और मैसेज' : 'Calling & Messaging',
      icon: PhoneCall,
      badge: `${completedLessons.length}`,
    },
    {
      to: '/upi-sandbox',
      label: isHi ? 'UPI अभ्यास (सुरक्षित)' : 'UPI Practice',
      icon: CreditCard,
      badge: '100% Safe',
      badgeColor: 'bg-[#E1F3E3] text-[#005B46]',
    },
    {
      to: '/assistant',
      label: isHi ? 'साथी से पूछें' : 'Ask Sathi',
      icon: Bot,
      badge: 'Voice',
      badgeColor: 'bg-[#FFE8D1] text-[#9A3412]',
    },
    {
      to: '/safety',
      label: isHi ? 'सुरक्षा कॉर्नर' : 'Safety Corner',
      icon: ShieldAlert,
      badge: null,
    },
    {
      to: '/settings',
      label: isHi ? 'सेटिंग्स व प्रोफाइल' : 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col w-72 shrink-0 bg-[#FAF9F3] border-r-2 border-[#D7E4DD] p-4 min-h-[calc(100vh-69px)] select-none"
      aria-label="Desktop Primary Navigation"
    >
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-lg transition-all focus-visible:ring-4 focus-visible:ring-[#005B46] ${
                  isActive
                    ? 'bg-[#005B46] text-white shadow-soft font-extrabold translate-x-1'
                    : 'text-[#153B35] hover:bg-[#E8F6F0] hover:text-[#005B46]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-6 h-6 transition-transform ${
                        isActive ? 'text-white scale-110' : 'text-[#16845B]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-[#E1F3E3] text-[#005B46]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Encouraging Senior Tip Card at bottom of sidebar */}
      <div className="mt-auto pt-6">
        <div className="bg-[#E8F6F0] border-2 border-[#16845B]/30 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#005B46] font-bold text-base mb-1">
            <Sparkles className="w-5 h-5 text-[#16845B]" />
            <span>{isHi ? 'आज की अच्छी बात' : 'Elder Tip'}</span>
          </div>
          <p className="text-sm font-medium text-[#153B35] leading-relaxed">
            {isHi
              ? 'जल्दबाजी बिल्कुल न करें। हर चीज धीरे-धीरे सीखी जाती है।'
              : 'Take your time. There is no rush, and you cannot break anything by tapping here!'}
          </p>
        </div>
      </div>
    </aside>
  );
};
