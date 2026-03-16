import React, { useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import GameGrid from '../components/GameGrid';
import LiveSidebar from '../components/LiveSidebar';
import { useSidebarContext } from '../context/SidebarContext';
import { TrendingUp } from 'lucide-react';

export default function Home() {
  const [liveSidebarOpen, setLiveSidebarOpen] = useState(false);
  const { isLeftSidebarCollapsed } = useSidebarContext();

  const leftOffset = isLeftSidebarCollapsed ? 'md:ml-16' : 'md:ml-56';

  return (
    <div className={`transition-all duration-300 ${leftOffset} lg:mr-72`}>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Main content */}
      <div className="px-4 md:px-6 pb-24 md:pb-8">
        {/* Stats bar */}
        <div className="flex flex-wrap gap-3 py-4 border-b border-charcoal-border mb-6">
          {[
            { label: 'Online Players', value: '12,847', color: 'text-green-400' },
            { label: 'Today\'s Winners', value: '3,291', color: 'text-gold' },
            { label: 'Total Paid Out', value: '৳2.4M', color: 'text-neon-blue' },
            { label: 'Live Games', value: '248', color: 'text-purple-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center gap-2 bg-charcoal-mid px-4 py-2 rounded border border-charcoal-border">
              <span className={`font-heading font-bold text-sm ${color}`}>{value}</span>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Game Grid */}
        <GameGrid />
      </div>

      {/* Mobile live sidebar toggle */}
      <button
        onClick={() => setLiveSidebarOpen(true)}
        className="fixed right-4 bottom-20 md:bottom-6 lg:hidden z-20 flex items-center gap-2 bg-charcoal-mid border border-neon-blue text-neon-blue px-3 py-2 rounded-full text-xs font-semibold shadow-blue"
      >
        <TrendingUp size={14} />
        Live Feed
      </button>

      {/* Live Sidebar */}
      <LiveSidebar isOpen={liveSidebarOpen} onClose={() => setLiveSidebarOpen(false)} />
    </div>
  );
}
