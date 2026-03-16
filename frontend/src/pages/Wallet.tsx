import React, { useState } from 'react';
import { Wallet as WalletIcon, ArrowDownCircle, ArrowUpCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSidebarContext } from '../context/SidebarContext';
import { toast } from 'sonner';

interface LocalTransaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method: string;
}

const INITIAL_TRANSACTIONS: LocalTransaction[] = [
  { id: '1', type: 'deposit', amount: 5000, status: 'completed', date: '2026-02-24 14:32', method: 'bKash' },
  { id: '2', type: 'withdrawal', amount: 2000, status: 'completed', date: '2026-02-23 10:15', method: 'Nagad' },
  { id: '3', type: 'deposit', amount: 10000, status: 'completed', date: '2026-02-22 18:45', method: 'Rocket' },
  { id: '4', type: 'withdrawal', amount: 3000, status: 'pending', date: '2026-02-21 09:00', method: 'bKash' },
];

export default function WalletPage() {
  const { mockUser, updateBalance } = useAuth();
  const { isLeftSidebarCollapsed } = useSidebarContext();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transactions, setTransactions] = useState<LocalTransaction[]>(INITIAL_TRANSACTIONS);
  const [depositLoading, setDepositLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [activeMethod, setActiveMethod] = useState('bKash');

  const leftOffset = isLeftSidebarCollapsed ? 'md:ml-16' : 'md:ml-56';

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) { toast.error('Enter a valid amount'); return; }
    if (amount < 100) { toast.error('Minimum deposit is ৳100'); return; }
    setDepositLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const newBalance = (mockUser?.balance ?? 0) + amount;
    updateBalance(newBalance);
    setTransactions(prev => [{
      id: Date.now().toString(),
      type: 'deposit',
      amount,
      status: 'completed',
      date: new Date().toLocaleString('en-BD'),
      method: activeMethod,
    }, ...prev]);
    setDepositAmount('');
    setDepositLoading(false);
    toast.success(`৳${amount.toLocaleString()} deposited successfully!`);
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) { toast.error('Enter a valid amount'); return; }
    if (amount < 500) { toast.error('Minimum withdrawal is ৳500'); return; }
    if (!mockUser || amount > mockUser.balance) { toast.error('Insufficient balance'); return; }
    setWithdrawLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    updateBalance(mockUser.balance - amount);
    setTransactions(prev => [{
      id: Date.now().toString(),
      type: 'withdrawal',
      amount,
      status: 'pending',
      date: new Date().toLocaleString('en-BD'),
      method: activeMethod,
    }, ...prev]);
    setWithdrawAmount('');
    setWithdrawLoading(false);
    toast.success(`Withdrawal of ৳${amount.toLocaleString()} submitted!`);
  };

  const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000];
  const METHODS = ['bKash', 'Nagad', 'Rocket', 'VISA', 'Mastercard'];

  const statusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle size={14} className="text-green-400" />;
    if (status === 'pending') return <Clock size={14} className="text-yellow-400" />;
    return <XCircle size={14} className="text-red-400" />;
  };

  return (
    <div className={`transition-all duration-300 ${leftOffset} px-4 md:px-6 py-6 pb-24 md:pb-8`}>
      <h1 className="font-heading text-3xl font-bold text-white mb-6">
        <span className="text-gold">MY</span> WALLET
      </h1>

      {/* Balance card */}
      <div className="rounded-lg p-6 mb-6 border border-gold/30 glow-gold" style={{ background: 'linear-gradient(135deg, #1a1500 0%, #1a1a00 100%)' }}>
        <div className="flex items-center gap-3 mb-2">
          <WalletIcon size={20} className="text-gold" />
          <span className="text-gray-400 text-sm">Available Balance</span>
        </div>
        <p className="font-heading text-4xl font-bold text-gold">
          ৳{(mockUser?.balance ?? 0).toLocaleString()}
        </p>
        {!mockUser && (
          <p className="text-xs text-gray-500 mt-2">Please login to view your balance</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Deposit */}
        <div className="rounded-lg p-5 border border-charcoal-border" style={{ background: '#1a1a1a' }}>
          <div className="flex items-center gap-2 mb-4">
            <ArrowDownCircle size={18} className="text-green-400" />
            <h2 className="font-heading font-bold text-white text-lg">Deposit</h2>
          </div>

          {/* Payment method */}
          <div className="flex flex-wrap gap-2 mb-4">
            {METHODS.map(m => (
              <button
                key={m}
                onClick={() => setActiveMethod(m)}
                className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all duration-150 ${activeMethod === m ? 'border-gold text-gold bg-gold/10' : 'border-charcoal-border text-gray-400 hover:border-gray-500'}`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Quick amounts */}
          <div className="flex flex-wrap gap-2 mb-3">
            {QUICK_AMOUNTS.map(a => (
              <button
                key={a}
                onClick={() => setDepositAmount(a.toString())}
                className="px-3 py-1 text-xs bg-charcoal-mid border border-charcoal-border text-gray-300 rounded hover:border-gold hover:text-gold transition-colors duration-150"
              >
                ৳{a.toLocaleString()}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Enter amount (min ৳100)"
            value={depositAmount}
            onChange={e => setDepositAmount(e.target.value)}
            className="w-full bg-charcoal-mid border border-charcoal-border rounded px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors duration-150 mb-3"
          />
          <button
            onClick={handleDeposit}
            disabled={depositLoading || !mockUser}
            className="w-full btn-gold py-3 rounded-sm font-heading tracking-wider disabled:opacity-50"
          >
            {depositLoading ? 'Processing...' : 'Deposit Now'}
          </button>
        </div>

        {/* Withdrawal */}
        <div className="rounded-lg p-5 border border-charcoal-border" style={{ background: '#1a1a1a' }}>
          <div className="flex items-center gap-2 mb-4">
            <ArrowUpCircle size={18} className="text-red-400" />
            <h2 className="font-heading font-bold text-white text-lg">Withdraw</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {METHODS.map(m => (
              <button
                key={m}
                onClick={() => setActiveMethod(m)}
                className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all duration-150 ${activeMethod === m ? 'border-gold text-gold bg-gold/10' : 'border-charcoal-border text-gray-400 hover:border-gray-500'}`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {QUICK_AMOUNTS.map(a => (
              <button
                key={a}
                onClick={() => setWithdrawAmount(a.toString())}
                className="px-3 py-1 text-xs bg-charcoal-mid border border-charcoal-border text-gray-300 rounded hover:border-red-400 hover:text-red-400 transition-colors duration-150"
              >
                ৳{a.toLocaleString()}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Enter amount (min ৳500)"
            value={withdrawAmount}
            onChange={e => setWithdrawAmount(e.target.value)}
            className="w-full bg-charcoal-mid border border-charcoal-border rounded px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-400 transition-colors duration-150 mb-3"
          />
          <button
            onClick={handleWithdraw}
            disabled={withdrawLoading || !mockUser}
            className="w-full py-3 rounded-sm font-heading tracking-wider border border-red-500 text-red-400 hover:bg-red-500/10 transition-all duration-150 disabled:opacity-50"
          >
            {withdrawLoading ? 'Processing...' : 'Withdraw Now'}
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="rounded-lg border border-charcoal-border overflow-hidden" style={{ background: '#1a1a1a' }}>
        <div className="px-5 py-4 border-b border-charcoal-border">
          <h2 className="font-heading font-bold text-white text-lg">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal-border">
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">Method</th>
                <th className="text-right px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">Amount</th>
                <th className="text-center px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-border">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-charcoal-mid transition-colors duration-150">
                  <td className="px-5 py-3 text-xs text-gray-400">{tx.date}</td>
                  <td className="px-5 py-3">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'deposit' ? <ArrowDownCircle size={12} /> : <ArrowUpCircle size={12} />}
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400">{tx.method}</td>
                  <td className={`px-5 py-3 text-xs font-bold text-right ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type === 'deposit' ? '+' : '-'}৳{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {statusIcon(tx.status)}
                      <span className={`text-xs capitalize ${tx.status === 'completed' ? 'text-green-400' : tx.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {tx.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
