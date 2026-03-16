import React, { useState, useEffect } from 'react';
import { TrendingUp, Medal, X, ChevronRight } from 'lucide-react';

const PLAYER_NAMES = ['Rafi_BD', 'Lucky_K', 'Sultan99', 'Mim_Pro', 'Asha_Win', 'Hasan_G', 'Nadia_V', 'Karim_X', 'Priya_S', 'Arif_T'];
const GAMES = ['Mega Slots', 'Live Roulette', 'Baccarat', 'Blackjack', 'Football Bet', 'Crazy Time', 'Dragon Tiger'];

function randomWin() {
  return {
    id: Math.random(),
    player: PLAYER_NAMES[Math.floor(Math.random() * PLAYER_NAMES.length)],
    game: GAMES[Math.floor(Math.random() * GAMES.length)],
    amount: Math.floor(Math.random() * 50000) + 500,
    time: 'just now',
  };
}

const INITIAL_WINS = Array.from({ length: 8 }, randomWin);

const LEADERBOARD = [
  { rank: 1, player: 'Sultan_VIP', winnings: 245000 },
  { rank: 2, player: 'Lucky_Karim', winnings: 198500 },
  { rank: 3, player: 'Pro_Rafi', winnings: 175200 },
  { rank: 4, player: 'BigWin_Asha', winnings: 142800 },
  { rank: 5, player: 'CardShark_M', winnings: 128000 },
  { rank: 6, player: 'Neon_Hasan', winnings: 115500 },
  { rank: 7, player: 'VIP_Priya', winnings: 98700 },
  { rank: 8, player: 'Sharp_Arif', winnings: 87300 },
  { rank: 9, player: 'Gold_Nadia', winnings: 76200 },
  { rank: 10, player: 'Ace_Karim', winnings: 65100 },
];

interface LiveSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LiveSidebar({ isOpen, onClose }: LiveSidebarProps) {
  const [wins, setWins] = useState(INITIAL_WINS);
  const [tab, setTab] = useState<'wins' | 'leaderboard'>('wins');

  useEffect(() => {
    const interval = setInterval(() => {
      setWins(prev => [randomWin(), ...prev.slice(0, 9)]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const rankColor = (rank: number) => {
    if (rank === 1) return 'text-gold';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-amber-600';
    return 'text-gray-500';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
          fixed right-0 top-[88px] bottom-0 w-72 z-30 flex flex-col
          border-l border-charcoal-border transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
        style={{ background: '#111111' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-charcoal-border">
          <div className="flex items-center gap-2">
            <div className="live-dot" />
            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Live Feed</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-charcoal-border">
          <button
            onClick={() => setTab('wins')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors duration-150 ${tab === 'wins' ? 'text-gold border-b-2 border-gold' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <TrendingUp size={13} /> Recent Wins
          </button>
          <button
            onClick={() => setTab('leaderboard')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-colors duration-150 ${tab === 'leaderboard' ? 'text-gold border-b-2 border-gold' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Medal size={13} /> Leaderboard
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {tab === 'wins' ? (
            <div className="divide-y divide-charcoal-border">
              {wins.map((win) => (
                <div key={win.id} className="px-4 py-2.5 hover:bg-charcoal-mid transition-colors duration-150 fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-charcoal-mid flex items-center justify-center text-xs font-bold text-gold">
                        {win.player[0]}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{win.player}</p>
                        <p className="text-xs text-gray-500">{win.game}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-green-400">+৳{win.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">{win.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3">
              <div className="space-y-1">
                {LEADERBOARD.map((entry) => (
                  <div
                    key={entry.rank}
                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-charcoal-mid transition-colors duration-150"
                  >
                    <span className={`w-5 text-center text-xs font-bold ${rankColor(entry.rank)}`}>
                      {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : `#${entry.rank}`}
                    </span>
                    <span className="flex-1 text-xs text-gray-300 font-medium truncate">{entry.player}</span>
                    <span className="text-xs font-bold text-gold">৳{entry.winnings.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View all */}
        <div className="p-3 border-t border-charcoal-border">
          <button className="w-full flex items-center justify-center gap-1 text-xs text-neon-blue hover:text-white transition-colors duration-150 py-1.5">
            View All <ChevronRight size={12} />
          </button>
        </div>
      </aside>
    </>
  );
}
