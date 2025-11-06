import { useState } from 'react';
import { supabase, type DAOMember } from '../lib/supabase';
import { Wallet, UserPlus } from 'lucide-react';

interface RegisterMemberProps {
  onRegistered: (member: DAOMember) => void;
}

export function RegisterMember({ onRegistered }: RegisterMemberProps) {
  const [walletAddress, setWalletAddress] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tokenBalance, setTokenBalance] = useState(100);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!walletAddress.trim()) {
      setError('Wallet address is required');
      return;
    }

    setSubmitting(true);

    const { data: existingMember } = await supabase
      .from('dao_members')
      .select('*')
      .eq('wallet_address', walletAddress)
      .maybeSingle();

    if (existingMember) {
      onRegistered(existingMember);
      setSubmitting(false);
      return;
    }

    const { data, error: insertError } = await supabase
      .from('dao_members')
      .insert({
        wallet_address: walletAddress,
        name: name || '',
        email: email || '',
        token_balance: tokenBalance,
      })
      .select()
      .single();

    if (insertError) {
      setError('Failed to register: ' + insertError.message);
      setSubmitting(false);
      return;
    }

    if (data) {
      onRegistered(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Join the DAO</h2>
          <p className="text-slate-400">Register to participate in governance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-900 bg-opacity-50 border border-red-700 text-red-200 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-2">
              Wallet Address *
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
              placeholder="0x..."
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">
              Initial Token Balance
            </label>
            <input
              type="number"
              value={tokenBalance}
              onChange={(e) => setTokenBalance(Number(e.target.value))}
              min="0"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus size={20} />
            {submitting ? 'Registering...' : 'Join DAO'}
          </button>
        </form>
      </div>
    </div>
  );
}
