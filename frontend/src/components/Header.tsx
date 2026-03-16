import React, { useState } from 'react';
import { Menu, X, Bell, ChevronDown, Wallet, User, LogOut, History, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSidebarContext } from '../context/SidebarContext';
import { Link, useNavigate } from '@tanstack/react-router';

const WINNERS = [
  '🏆 Player_Rafi won ৳12,500 on Mega Slots',
  '🎰 Lucky_Karim won ৳8,200 on Live Roulette',
  '⚽ SportsFan99 won ৳5,000 on Football Bet',
  '🃏 CardShark_Mim won ৳15,000 on Baccarat',
  '🎲 BigWinner_Asha won ৳22,000 on Jackpot Slots',
  '🏅 Pro_Gamer_Hasan won ৳9,800 on Blackjack',
  '💰 VIP_Sultan won ৳45,000 on Live Casino',
  '🎯 Sharp_Shooter won ৳3,500 on Sports Bet',
];

export default function Header() {
  const { mockUser, openAuthModal, logout } = useAuth();
  const { toggleLeftSidebar } = useSidebarContext();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifCount] = useState(3);
  const navigate = useNavigate();

  const marqueeText = WINNERS.join('   •   ') + '   •   ' + WINNERS.join('   •   ');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col" style={{ background: '#0d0d0d', borderBottom: '1px solid #2a2a2a' }}>
      {/* Main nav bar */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLeftSidebar}
            className="p-2 rounded text-gray-400 hover:text-gold transition-colors duration-150 md:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
          <button
            onClick={toggleLeftSidebar}
            className="p-2 rounded text-gray-400 hover:text-gold transition-colors duration-150 hidden md:flex"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Trophy size={24} className="text-gold" />
              <span className="font-heading text-2xl font-bold text-gold glow-text-gold tracking-wider">ASIF</span>
              <span className="font-heading text-2xl font-bold text-neon-blue glow-text-blue">969</span>
            </div>
          </Link>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-6">
          {['Slots', 'Live Casino', 'Sports', 'Table Games', 'Promotions'].map(item => (
            <Link
              key={item}
              to={item === 'Promotions' ? '/promo' : '/'}
              className="text-sm font-medium text-gray-300 hover:text-gold transition-colors duration-150 font-heading tracking-wide uppercase"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right: Auth / User */}
        <div className="flex items-center gap-3">
          {mockUser ? (
            <>
              {/* Balance */}
              <div className="hidden sm:flex items-center gap-2 bg-charcoal-mid px-3 py-1.5 rounded border border-charcoal-border">
                <Wallet size={14} className="text-gold" />
                <span className="text-gold font-heading font-bold text-sm">৳{mockUser.balance.toLocaleString()}</span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-neon-blue transition-colors duration-150">
                <Bell size={20} />
                {notifCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-gold text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {notifCount}
                  </span>
                )}
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(p => !p)}
                  className="flex items-center gap-2 bg-charcoal-mid px-3 py-1.5 rounded border border-charcoal-border hover:border-gold transition-colors duration-150"
                >
                  <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                    <span className="text-black text-xs font-bold">{mockUser.username[0].toUpperCase()}</span>
                  </div>
                  <span className="hidden sm:block text-sm text-gray-200 font-medium">{mockUser.username}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-charcoal-border shadow-xl z-50 overflow-hidden"
                    style={{ background: '#1a1a1a' }}
                  >
                    <div className="px-4 py-3 border-b border-charcoal-border">
                      <p className="text-sm font-semibold text-white">{mockUser.username}</p>
                      <p className="text-xs text-gray-400">{mockUser.phone}</p>
                    </div>
                    <button
                      onClick={() => { setProfileOpen(false); navigate({ to: '/wallet' }); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-charcoal-mid hover:text-gold transition-colors duration-150"
                    >
                      <Wallet size={15} /> Wallet
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); navigate({ to: '/wallet' }); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-charcoal-mid hover:text-gold transition-colors duration-150"
                    >
                      <History size={15} /> Transaction History
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-charcoal-mid hover:text-gold transition-colors duration-150"
                    >
                      <User size={15} /> My Profile
                    </button>
                    <div className="border-t border-charcoal-border">
                      <button
                        onClick={() => { setProfileOpen(false); logout(); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-charcoal-mid transition-colors duration-150"
                      >
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-1.5 text-sm font-semibold text-gray-200 border border-gray-600 rounded hover:border-neon-blue hover:text-neon-blue transition-all duration-150"
              >
                Login
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="btn-gold text-sm px-4 py-1.5 rounded"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Winners marquee */}
      <div className="marquee-container py-1.5 border-t border-charcoal-border" style={{ background: '#0a0a0a' }}>
        <div className="marquee-track text-xs text-gray-400">
          <span className="text-gold font-semibold mr-3">🔴 LIVE WINNERS:</span>
          {marqueeText}
        </div>
      </div>
    </header>
  );
}
