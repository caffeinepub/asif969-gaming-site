import React, { useState } from 'react';
import { X, Eye, EyeOff, Phone, User, Lock, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

type Step = 'form' | 'otp' | 'success';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, setMockUser } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>(authModalTab);
  const [step, setStep] = useState<Step>('form');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: '',
    phone: '',
    password: '',
  });

  // Sync tab with prop
  React.useEffect(() => {
    setTab(authModalTab);
    setStep('form');
    setForm({ username: '', phone: '', password: '' });
    setOtp('');
  }, [authModalTab, isAuthModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'register') {
      if (!form.username || !form.phone || !form.password) {
        toast.error('Please fill in all fields');
        return;
      }
      setStep('otp');
    } else {
      if (!form.phone || !form.password) {
        toast.error('Please fill in all fields');
        return;
      }
      setLoading(true);
      await new Promise(r => setTimeout(r, 800));
      setLoading(false);
      setMockUser({ username: form.phone.slice(-4) + '_User', phone: form.phone, balance: 5000 });
      toast.success('Welcome back! Login successful.');
      closeAuthModal();
    }
  };

  const handleOtpVerify = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setStep('success');
    setTimeout(() => {
      setMockUser({ username: form.username, phone: form.phone, balance: 1000 });
      toast.success('Registration successful! Welcome bonus ৳1,000 added!');
      closeAuthModal();
    }, 1500);
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={closeAuthModal}>
      <DialogContent
        className="max-w-md border-charcoal-border p-0 overflow-hidden"
        style={{ background: '#1a1a1a' }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-charcoal-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl font-bold text-white">
              {step === 'otp' ? 'Verify OTP' : step === 'success' ? 'Welcome!' : tab === 'login' ? 'Login' : 'Create Account'}
            </DialogTitle>
          </DialogHeader>
          {step === 'form' && (
            <div className="flex gap-1 mt-4 bg-charcoal-mid rounded-sm p-1">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-2 text-sm font-heading font-semibold rounded-sm transition-all duration-150 ${tab === 'login' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
              >
                Login
              </button>
              <button
                onClick={() => setTab('register')}
                className={`flex-1 py-2 text-sm font-heading font-semibold rounded-sm transition-all duration-150 ${tab === 'register' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
              >
                Register
              </button>
            </div>
          )}
        </div>

        <div className="px-6 py-5">
          {step === 'success' ? (
            <div className="flex flex-col items-center py-6 gap-4">
              <CheckCircle size={56} className="text-green-400" />
              <p className="text-white font-heading text-xl font-bold">Registration Complete!</p>
              <p className="text-gray-400 text-sm text-center">Your account has been created. Welcome bonus is being added...</p>
            </div>
          ) : step === 'otp' ? (
            <div className="space-y-5">
              <p className="text-gray-400 text-sm">
                Enter the 6-digit OTP sent to <span className="text-gold font-semibold">{form.phone}</span>
              </p>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <InputOTPSlot key={i} index={i} className="border-charcoal-border bg-charcoal-mid text-white" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-xs text-gray-500 text-center">Enter any 6-digit code to verify</p>
              <button
                onClick={handleOtpVerify}
                disabled={loading || otp.length !== 6}
                className="w-full btn-gold py-3 text-base rounded-sm font-heading tracking-wider disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                onClick={() => setStep('form')}
                className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                ← Back
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                    className="w-full bg-charcoal-mid border border-charcoal-border rounded pl-9 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors duration-150"
                  />
                </div>
              )}
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-charcoal-mid border border-charcoal-border rounded pl-9 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors duration-150"
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full bg-charcoal-mid border border-charcoal-border rounded pl-9 pr-10 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-gold transition-colors duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {tab === 'login' && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-neon-blue hover:underline">Forgot Password?</button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3 text-base rounded-sm font-heading tracking-wider disabled:opacity-50"
              >
                {loading ? 'Please wait...' : tab === 'login' ? 'Login' : 'Create Account'}
              </button>

              {tab === 'register' && (
                <p className="text-xs text-gray-500 text-center">
                  By registering, you agree to our{' '}
                  <span className="text-neon-blue cursor-pointer hover:underline">Terms &amp; Conditions</span>
                  {' '}and confirm you are 18+.
                </p>
              )}
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
