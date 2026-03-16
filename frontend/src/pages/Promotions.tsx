import React from 'react';
import { Gift, Clock, CheckCircle } from 'lucide-react';
import { useSidebarContext } from '../context/SidebarContext';
import { toast } from 'sonner';

const PROMOS = [
  {
    id: 1,
    image: '/assets/generated/promo-welcome.dim_800x400.jpg',
    title: 'Welcome Bonus',
    badge: '🎁 NEW PLAYER',
    description: 'Get a 200% bonus on your first deposit up to ৳50,000. Start your journey with a massive boost!',
    expiry: 'Ongoing',
    highlight: 'Up to ৳50,000',
    color: '#FFD700',
  },
  {
    id: 2,
    image: '/assets/generated/promo-reload.dim_800x400.jpg',
    title: 'Reload Bonus',
    badge: '🔄 WEEKLY',
    description: 'Get 50% bonus every week on your deposits. Keep playing and keep winning with our reload offer.',
    expiry: 'Every Monday',
    highlight: '50% Bonus',
    color: '#00BFFF',
  },
  {
    id: 3,
    image: '/assets/generated/promo-welcome.dim_800x400.jpg',
    title: 'Cashback Offer',
    badge: '💰 DAILY',
    description: 'Get 10% cashback on all your losses every day. We\'ve got your back even on bad days!',
    expiry: 'Daily Reset',
    highlight: '10% Cashback',
    color: '#00ff88',
  },
  {
    id: 4,
    image: '/assets/generated/promo-reload.dim_800x400.jpg',
    title: 'Referral Bonus',
    badge: '👥 REFER & EARN',
    description: 'Invite your friends and earn ৳500 for each friend who registers and makes their first deposit.',
    expiry: 'No Expiry',
    highlight: '৳500 Per Referral',
    color: '#FF6B35',
  },
  {
    id: 5,
    image: '/assets/generated/promo-welcome.dim_800x400.jpg',
    title: 'VIP Exclusive',
    badge: '👑 VIP ONLY',
    description: 'Exclusive bonuses, personal account manager, and priority withdrawals for our VIP members.',
    expiry: 'VIP Members Only',
    highlight: 'Exclusive Perks',
    color: '#9B59B6',
  },
  {
    id: 6,
    image: '/assets/generated/promo-reload.dim_800x400.jpg',
    title: 'Sports Free Bet',
    badge: '⚽ SPORTS',
    description: 'Get a free ৳200 bet every week on sports. No deposit required for existing players.',
    expiry: 'Every Friday',
    highlight: '৳200 Free Bet',
    color: '#E74C3C',
  },
];

export default function Promotions() {
  const { isLeftSidebarCollapsed } = useSidebarContext();
  const leftOffset = isLeftSidebarCollapsed ? 'md:ml-16' : 'md:ml-56';

  const handleClaim = (title: string) => {
    toast.success(`🎉 ${title} claimed successfully! Check your wallet.`, {
      duration: 3000,
    });
  };

  return (
    <div className={`transition-all duration-300 ${leftOffset} px-4 md:px-6 py-6 pb-24 md:pb-8`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Gift size={28} className="text-gold" />
          <h1 className="font-heading text-3xl font-bold text-white">
            <span className="text-gold">PROMOTIONS</span> & BONUSES
          </h1>
        </div>
        <p className="text-gray-400 text-sm">Claim your bonuses and maximize your winnings</p>
      </div>

      {/* Promo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {PROMOS.map(promo => (
          <div
            key={promo.id}
            className="rounded-lg overflow-hidden border border-charcoal-border hover:border-gold/50 transition-all duration-200 group"
            style={{ background: '#1a1a1a' }}
          >
            {/* Banner image */}
            <div className="relative overflow-hidden" style={{ height: '160px' }}>
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)' }} />
              <span
                className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full border"
                style={{ color: promo.color, borderColor: promo.color + '60', background: promo.color + '15' }}
              >
                {promo.badge}
              </span>
              <div className="absolute bottom-3 left-3">
                <span className="font-heading text-xl font-bold" style={{ color: promo.color }}>
                  {promo.highlight}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-heading font-bold text-white text-lg mb-2">{promo.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">{promo.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{promo.expiry}</span>
                </div>
              </div>

              <button
                onClick={() => handleClaim(promo.title)}
                className="w-full btn-gold py-2.5 rounded-sm font-heading tracking-wider text-sm"
              >
                Claim Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Terms note */}
      <div className="mt-8 p-4 rounded-lg border border-charcoal-border bg-charcoal-mid">
        <p className="text-xs text-gray-500 text-center">
          <CheckCircle size={12} className="inline mr-1 text-green-400" />
          All bonuses are subject to wagering requirements. Please read the{' '}
          <a href="#" className="text-neon-blue hover:underline">Terms & Conditions</a>{' '}
          before claiming. 18+ only. Play responsibly.
        </p>
      </div>
    </div>
  );
}
