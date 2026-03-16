import React from 'react';
import { Home, Wallet, Gift, User } from 'lucide-react';
import { Link, useRouterState } from '@tanstack/react-router';

const NAV_ITEMS = [
  { label: 'Home', icon: Home, to: '/' },
  { label: 'Wallet', icon: Wallet, to: '/wallet' },
  { label: 'Promo', icon: Gift, to: '/promo' },
  { label: 'Profile', icon: User, to: '/profile' },
];

export default function BottomNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-charcoal-border"
      style={{ background: '#0d0d0d' }}
    >
      {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
        const isActive = currentPath === to;
        return (
          <Link
            key={label}
            to={to}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors duration-150 ${isActive ? 'bottom-nav-active' : 'bottom-nav-inactive'}`}
          >
            <Icon size={20} className={isActive ? 'text-gold' : 'text-gray-500'} />
            <span className={`text-xs font-medium font-heading ${isActive ? 'text-gold' : 'text-gray-500'}`}>{label}</span>
            {isActive && <div className="absolute bottom-0 w-8 h-0.5 bg-gold rounded-full" />}
          </Link>
        );
      })}
    </nav>
  );
}
