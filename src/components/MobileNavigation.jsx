import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, CreditCard, Bot, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileNavigation = () => {
  const { preferences } = useApp();
  const isHi = preferences.language === 'hi';

  const navItems = [
    { to: '/dashboard', label: isHi ? 'होम' : 'Home', icon: Home },
    { to: '/goals', label: isHi ? 'सीखें' : 'Learn', icon: BookOpen },
    { to: '/upi-sandbox', label: isHi ? 'UPI' : 'UPI Safe', icon: CreditCard },
    { to: '/assistant', label: isHi ? 'साथी' : 'Sathi', icon: Bot },
    { to: '/safety', label: isHi ? 'सुरक्षा' : 'Safety', icon: ShieldAlert },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F3]/95 backdrop-blur-md border-t-2 border-[#D7E4DD] px-2 py-2 safe-area-pb"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl min-h-[48px] min-w-[56px] transition-all ${
                  isActive
                    ? 'bg-[#005B46] text-white font-bold shadow-sm'
                    : 'text-[#153B35] hover:bg-[#E8F6F0]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-6 h-6 transition-transform ${
                      isActive ? 'text-white scale-110' : 'text-[#16845B]'
                    }`}
                  />
                  <span className="text-xs font-bold mt-0.5 tracking-tight">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
