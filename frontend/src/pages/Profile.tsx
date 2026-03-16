import React from 'react';
import { User, Wallet, Trophy, LogOut, Settings, Phone, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSidebarContext } from '../context/SidebarContext';
import { Link, useNavigate } from '@tanstack/react-router';

export default function Profile() {
  const { mockUser, openAuthModal, logout } = useAuth();
  const { isLeftSidebarCollapsed } = useSidebarContext();
  const navigate = useNavigate();

  const leftOffset = isLeftSidebarCollapsed ? 'md:ml-16' : 'md:ml-56';

  if (!mockUser) {
    return (
      <div className={`transition-all duration-300 ${leftOffset} px-4 md:px-6 py-12 pb-24 md:pb-8 flex flex-col items-center justify-center min-h-[60vh]`}>
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-charcoal-mid border border-charcoal-border flex items-center justify-center mx-auto mb-6">
            <User size={36} className="text-gray-500" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-white mb-3">
            <span className="text-gold">LOGIN</span> REQUIRED
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Please login or create an account to view your profile.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => openAuthModal('login')}
              className="px-6 py-2.5 border border-neon-blue text-neon-blue font-heading font-semibold rounded-sm hover:bg-neon-blue/10 transition-all duration-150"
            >
              Login
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="btn-gold px-6 py-2.5 rounded-sm"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  const MENU_ITEMS = [
    { icon: Wallet, label: 'My Wallet', desc: 'Deposits, withdrawals & balance', to: '/wallet' },
    { icon: Trophy, label: 'My Bets', desc: 'Betting history & statistics', to: '/' },
    { icon: Star, label: 'Promotions', desc: 'Available bonuses & offers', to: '/promo' },
    { icon: Settings, label: 'Settings', desc: 'Account preferences', to: '/' },
  ];

  return (
    <div className={`transition-all duration-300 ${leftOffset} px-4 md:px-6 py-6 pb-24 md:pb-8`}>
      <h1 className="font-heading text-3xl font-bold text-white mb-6">
        <span className="text-gold">MY</span> PROFILE
      </h1>

      {/* Profile card */}
      <div
        className="rounded-lg p-6 mb-6 border border-charcoal-border"
        style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #1a1500 100%)' }}
      >
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center flex-shrink-0">
            <span className="font-heading text-2xl font-bold text-gold">
              {mockUser.username[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-heading text-xl font-bold text-white truncate">{mockUser.username}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Phone size={12} className="text-gray-500" />
              <span className="text-xs text-gray-400">{mockUser.phone}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Star size={12} className="text-gold" />
              <span className="text-xs text-gold font-semibold">Standard Member</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-500 mb-1">Balance</p>
            <p className="font-heading text-xl font-bold text-gold">৳{mockUser.balance.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Total Bets', value: '142' },
          { label: 'Win Rate', value: '54%' },
          { label: 'Total Won', value: '৳28K' },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg p-4 border border-charcoal-border text-center" style={{ background: '#1a1a1a' }}>
            <p className="font-heading text-lg font-bold text-gold">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Menu items */}
      <div className="rounded-lg border border-charcoal-border overflow-hidden mb-6" style={{ background: '#1a1a1a' }}>
        {MENU_ITEMS.map(({ icon: Icon, label, desc, to }, idx) => (
          <Link
            key={label}
            to={to}
            className={`flex items-center gap-4 px-5 py-4 hover:bg-charcoal-mid transition-colors duration-150 ${idx < MENU_ITEMS.length - 1 ? 'border-b border-charcoal-border' : ''}`}
          >
            <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
              <Icon size={18} className="text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
            <span className="text-gray-600 text-lg">›</span>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={() => { logout(); navigate({ to: '/' }); }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-all duration-150 font-heading font-semibold"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}
