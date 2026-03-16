import React, { useState } from 'react';
import { Dices, Monitor, Trophy, Table2 } from 'lucide-react';
import GameCard from './GameCard';

const CATEGORIES = [
  { id: 'All', label: 'All Games', icon: null },
  { id: 'Slots', label: 'Slots', icon: Dices },
  { id: 'Live Casino', label: 'Live Casino', icon: Monitor },
  { id: 'Sports', label: 'Sports', icon: Trophy },
  { id: 'Table Games', label: 'Table Games', icon: Table2 },
];

const GAMES = [
  { id: 1, title: 'Mega Fortune Slots', category: 'Slots', image: '/assets/generated/game-thumb-slots.dim_400x300.jpg', provider: 'NetEnt', isHot: true },
  { id: 2, title: 'Book of Ra Deluxe', category: 'Slots', image: '/assets/generated/game-thumb-slots.dim_400x300.jpg', provider: 'Novomatic', isNew: true },
  { id: 3, title: 'Starburst XXXtreme', category: 'Slots', image: '/assets/generated/game-thumb-slots.dim_400x300.jpg', provider: 'NetEnt' },
  { id: 4, title: 'Gates of Olympus', category: 'Slots', image: '/assets/generated/game-thumb-slots.dim_400x300.jpg', provider: 'Pragmatic', isHot: true },
  { id: 5, title: 'Live Roulette VIP', category: 'Live Casino', image: '/assets/generated/game-thumb-livecasino.dim_400x300.jpg', provider: 'Evolution', isHot: true },
  { id: 6, title: 'Speed Baccarat', category: 'Live Casino', image: '/assets/generated/game-thumb-livecasino.dim_400x300.jpg', provider: 'Evolution', isNew: true },
  { id: 7, title: 'Lightning Roulette', category: 'Live Casino', image: '/assets/generated/game-thumb-livecasino.dim_400x300.jpg', provider: 'Evolution' },
  { id: 8, title: 'Crazy Time', category: 'Live Casino', image: '/assets/generated/game-thumb-livecasino.dim_400x300.jpg', provider: 'Evolution', isHot: true },
  { id: 9, title: 'Football Betting', category: 'Sports', image: '/assets/generated/game-thumb-sports.dim_400x300.jpg', provider: 'SportsBook', isHot: true },
  { id: 10, title: 'Cricket Live', category: 'Sports', image: '/assets/generated/game-thumb-sports.dim_400x300.jpg', provider: 'SportsBook', isNew: true },
  { id: 11, title: 'Tennis Open', category: 'Sports', image: '/assets/generated/game-thumb-sports.dim_400x300.jpg', provider: 'SportsBook' },
  { id: 12, title: 'Basketball NBA', category: 'Sports', image: '/assets/generated/game-thumb-sports.dim_400x300.jpg', provider: 'SportsBook' },
  { id: 13, title: 'Texas Hold\'em', category: 'Table Games', image: '/assets/generated/game-thumb-tablegames.dim_400x300.jpg', provider: 'Microgaming', isHot: true },
  { id: 14, title: 'Blackjack Classic', category: 'Table Games', image: '/assets/generated/game-thumb-tablegames.dim_400x300.jpg', provider: 'Microgaming' },
  { id: 15, title: 'Dragon Tiger', category: 'Table Games', image: '/assets/generated/game-thumb-tablegames.dim_400x300.jpg', provider: 'Playtech', isNew: true },
  { id: 16, title: 'Andar Bahar', category: 'Table Games', image: '/assets/generated/game-thumb-tablegames.dim_400x300.jpg', provider: 'Playtech' },
];

interface GameGridProps {
  initialCategory?: string;
}

export default function GameGrid({ initialCategory = 'All' }: GameGridProps) {
  const [activeTab, setActiveTab] = useState(initialCategory);

  const filtered = activeTab === 'All' ? GAMES : GAMES.filter(g => g.category === activeTab);

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl font-bold text-white">
          <span className="text-gold">POPULAR</span> GAMES
        </h2>
        <span className="text-xs text-gray-500">{filtered.length} games</span>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin">
        {CATEGORIES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-heading font-semibold tracking-wide whitespace-nowrap transition-all duration-150
              ${activeTab === id
                ? 'bg-gold text-black glow-gold'
                : 'bg-charcoal-mid text-gray-400 border border-charcoal-border hover:border-neon-blue hover:text-neon-blue'
              }
            `}
          >
            {Icon && <Icon size={14} />}
            {label}
          </button>
        ))}
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4">
        {filtered.map(game => (
          <GameCard
            key={game.id}
            image={game.image}
            title={game.title}
            category={game.category}
            provider={game.provider}
            isHot={game.isHot}
            isNew={game.isNew}
          />
        ))}
      </div>
    </section>
  );
}
