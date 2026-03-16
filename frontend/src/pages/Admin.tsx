import React, { useState } from 'react';
import { Shield, Users, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useSidebarContext } from '../context/SidebarContext';

const MOCK_USERS = [
  { id: 1, username: 'Sultan_VIP', phone: '01711-234567', balance: 245000, status: 'active', joined: '2025-01-15' },
  { id: 2, username: 'Lucky_Karim', phone: '01812-345678', balance: 198500, status: 'active', joined: '2025-02-20' },
  { id: 3, username: 'Pro_Rafi', phone: '01913-456789', balance: 175200, status: 'active', joined: '2025-03-10' },
  { id: 4, username: 'BigWin_Asha', phone: '01614-567890', balance: 142800, status: 'suspended', joined: '2025-04-05' },
  { id: 5, username: 'CardShark_M', phone: '01515-678901', balance: 128000, status: 'active', joined: '2025-05-12' },
  { id: 6, username: 'Neon_Hasan', phone: '01716-789012', balance: 115500, status: 'active', joined: '2025-06-18' },
];

const MOCK_BETS = [
  { id: 1, player: 'Sultan_VIP', game: 'Live Roulette', amount: 5000, outcome: 'win', profit: 4750, date: '2026-02-25 14:32' },
  { id: 2, player: 'Lucky_Karim', game: 'Mega Slots', amount: 2000, outcome: 'loss', profit: -2000, date: '2026-02-25 14:28' },
  { id: 3, player: 'Pro_Rafi', game: 'Blackjack', amount: 10000, outcome: 'win', profit: 9500, date: '2026-02-25 14:15' },
  { id: 4, player: 'BigWin_Asha', game: 'Baccarat', amount: 3000, outcome: 'loss', profit: -3000, date: '2026-02-25 13:55' },
  { id: 5, player: 'CardShark_M', game: 'Football Bet', amount: 1500, outcome: 'win', profit: 1350, date: '2026-02-25 13:40' },
  { id: 6, player: 'Neon_Hasan', game: 'Dragon Tiger', amount: 8000, outcome: 'win', profit: 7600, date: '2026-02-25 13:22' },
  { id: 7, player: 'Sultan_VIP', game: 'Crazy Time', amount: 20000, outcome: 'win', profit: 60000, date: '2026-02-25 12:58' },
  { id: 8, player: 'Lucky_Karim', game: 'Sports Bet', amount: 500, outcome: 'loss', profit: -500, date: '2026-02-25 12:30' },
  { id: 9, player: 'Pro_Rafi', game: 'Starburst', amount: 1000, outcome: 'win', profit: 2500, date: '2026-02-25 12:10' },
  { id: 10, player: 'CardShark_M', game: 'Texas Hold\'em', amount: 5000, outcome: 'loss', profit: -5000, date: '2026-02-25 11:45' },
];

interface WithdrawalRequest {
  id: number;
  player: string;
  amount: number;
  method: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  { id: 1, player: 'Sultan_VIP', amount: 50000, method: 'bKash', date: '2026-02-25 15:00', status: 'pending' },
  { id: 2, player: 'Lucky_Karim', amount: 25000, method: 'Nagad', date: '2026-02-25 14:45', status: 'pending' },
  { id: 3, player: 'Pro_Rafi', amount: 15000, method: 'Rocket', date: '2026-02-25 14:20', status: 'pending' },
  { id: 4, player: 'CardShark_M', amount: 8000, method: 'bKash', date: '2026-02-25 13:50', status: 'pending' },
];

type AdminTab = 'users' | 'bets' | 'withdrawals';

export default function Admin() {
  const { isLeftSidebarCollapsed } = useSidebarContext();
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(INITIAL_WITHDRAWALS);

  const leftOffset = isLeftSidebarCollapsed ? 'md:ml-16' : 'md:ml-56';

  const handleWithdrawal = (id: number, action: 'approved' | 'rejected') => {
    setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: action } : w));
  };

  const TABS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'users', label: 'User Management', icon: <Users size={15} /> },
    { id: 'bets', label: 'Bet Tracking', icon: <TrendingUp size={15} /> },
    { id: 'withdrawals', label: 'Withdrawals', icon: <Clock size={15} /> },
  ];

  return (
    <div className={`transition-all duration-300 ${leftOffset} px-4 md:px-6 py-6 pb-24 md:pb-8`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Shield size={28} className="text-gold" />
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">
            <span className="text-gold">ADMIN</span> DASHBOARD
          </h1>
          <p className="text-xs text-gray-500">Manage users, bets, and withdrawals</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Users', value: MOCK_USERS.length, color: 'text-neon-blue' },
          { label: 'Active Bets', value: MOCK_BETS.length, color: 'text-gold' },
          { label: 'Pending Withdrawals', value: withdrawals.filter(w => w.status === 'pending').length, color: 'text-yellow-400' },
          { label: 'Total Revenue', value: '৳2.4M', color: 'text-green-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-lg p-4 border border-charcoal-border" style={{ background: '#1a1a1a' }}>
            <p className={`font-heading text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 border-b border-charcoal-border pb-0">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-heading font-semibold border-b-2 transition-all duration-150 -mb-px ${activeTab === id ? 'border-gold text-gold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* User Management */}
      {activeTab === 'users' && (
        <div className="rounded-lg border border-charcoal-border overflow-hidden" style={{ background: '#1a1a1a' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal-border bg-charcoal-mid">
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Username</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Phone</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Balance</th>
                  <th className="text-center px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-border">
                {MOCK_USERS.map(user => (
                  <tr key={user.id} className="hover:bg-charcoal-mid transition-colors duration-150">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-xs font-bold text-gold">
                          {user.username[0]}
                        </div>
                        <span className="text-sm text-white font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{user.phone}</td>
                    <td className="px-4 py-3 text-xs font-bold text-gold text-right">৳{user.balance.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${user.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bet Tracking */}
      {activeTab === 'bets' && (
        <div className="rounded-lg border border-charcoal-border overflow-hidden" style={{ background: '#1a1a1a' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal-border bg-charcoal-mid">
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Player</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Game</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Bet</th>
                  <th className="text-center px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Outcome</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold uppercase">P&L</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-border">
                {MOCK_BETS.map(bet => (
                  <tr key={bet.id} className="hover:bg-charcoal-mid transition-colors duration-150">
                    <td className="px-4 py-3 text-sm text-white font-medium">{bet.player}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{bet.game}</td>
                    <td className="px-4 py-3 text-xs text-gray-300 text-right">৳{bet.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${bet.outcome === 'win' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                        {bet.outcome}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-xs font-bold text-right ${bet.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {bet.profit > 0 ? '+' : ''}৳{bet.profit.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{bet.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Withdrawal Approvals */}
      {activeTab === 'withdrawals' && (
        <div className="rounded-lg border border-charcoal-border overflow-hidden" style={{ background: '#1a1a1a' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal-border bg-charcoal-mid">
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Player</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Amount</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Method</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Date</th>
                  <th className="text-center px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Status</th>
                  <th className="text-center px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-border">
                {withdrawals.map(w => (
                  <tr key={w.id} className="hover:bg-charcoal-mid transition-colors duration-150">
                    <td className="px-4 py-3 text-sm text-white font-medium">{w.player}</td>
                    <td className="px-4 py-3 text-xs font-bold text-gold text-right">৳{w.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{w.method}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{w.date}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        w.status === 'approved' ? 'bg-green-400/10 text-green-400' :
                        w.status === 'rejected' ? 'bg-red-400/10 text-red-400' :
                        'bg-yellow-400/10 text-yellow-400'
                      }`}>
                        {w.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {w.status === 'pending' ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleWithdrawal(w.id, 'approved')}
                            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-green-400/10 text-green-400 border border-green-400/30 rounded hover:bg-green-400/20 transition-colors duration-150"
                          >
                            <CheckCircle size={12} /> Approve
                          </button>
                          <button
                            onClick={() => handleWithdrawal(w.id, 'rejected')}
                            className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-red-400/10 text-red-400 border border-red-400/30 rounded hover:bg-red-400/20 transition-colors duration-150"
                          >
                            <XCircle size={12} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-600 text-center block">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
