import React from 'react';
import { Shield, Heart, Trophy } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'asif969-gaming');

  return (
    <footer className="border-t border-charcoal-border mt-12" style={{ background: '#0a0a0a' }}>
      {/* Trust badges bar */}
      <div className="border-b border-charcoal-border py-3 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="px-2 py-0.5 rounded border border-red-500/60 text-red-400 font-bold text-xs">18+</span>
            <span>Only</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Shield size={14} className="text-green-400" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-green-400">✓</span>
            <span>Certified &amp; Licensed</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="text-gold">🔒</span>
            <span>Responsible Gaming</span>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={22} className="text-gold" />
              <span className="font-heading text-2xl font-bold text-gold">ASIF</span>
              <span className="font-heading text-2xl font-bold text-neon-blue">969</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Your premier destination for online gaming and entertainment. Play responsibly and enjoy the thrill.
            </p>
            <div className="flex gap-3">
              {['FB', 'TW', 'IG', 'YT'].map(s => (
                <div key={s} className="w-8 h-8 rounded-full bg-charcoal-mid border border-charcoal-border flex items-center justify-center text-xs text-gray-400 hover:border-gold hover:text-gold cursor-pointer transition-colors duration-150">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Promotions', to: '/promo' },
                { label: 'VIP Club', to: '/' },
                { label: 'Contact Us', to: '/' },
                { label: 'About Us', to: '/' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-xs text-gray-400 hover:text-gold transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-gold">Legal</h4>
            <ul className="space-y-2">
              {['Terms & Conditions', 'Privacy Policy', 'Responsible Gaming', 'Cookie Policy', 'AML Policy'].map(item => (
                <li key={item}>
                  <a href="#" className="text-xs text-gray-400 hover:text-gold transition-colors duration-150">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-gold">Payment Methods</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { name: 'bKash', color: '#E2136E', bg: '#1a0a10' },
                { name: 'Nagad', color: '#F7941D', bg: '#1a1000' },
                { name: 'Rocket', color: '#8B1A8B', bg: '#150a15' },
                { name: 'VISA', color: '#1A1F71', bg: '#0a0d1a' },
                { name: 'MC', color: '#EB001B', bg: '#1a0a0a' },
              ].map(({ name, color, bg }) => (
                <div
                  key={name}
                  className="px-2.5 py-1 rounded text-xs font-bold border"
                  style={{ color, borderColor: color + '60', background: bg }}
                >
                  {name}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Fast &amp; secure deposits and withdrawals with your preferred payment method.
            </p>
          </div>
        </div>

        {/* Responsible gaming disclaimer */}
        <div className="mt-8 pt-6 border-t border-charcoal-border">
          <div className="bg-charcoal-mid rounded-lg p-4 mb-6 border border-charcoal-border">
            <p className="text-xs text-gray-500 leading-relaxed text-center">
              <span className="text-red-400 font-bold">⚠️ RESPONSIBLE GAMING:</span>{' '}
              Gambling can be addictive. Please play responsibly. This site is intended for users 18 years and older only.
              If you feel you have a gambling problem, please seek help at{' '}
              <a href="#" className="text-neon-blue hover:underline">Responsible Gaming</a>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <p>© {year} ASIF969. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with <Heart size={12} className="text-gold fill-gold" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
