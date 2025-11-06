import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { Wallet, Mail, LogIn } from 'lucide-react';

export function Login() {
  const { loginWithMetaMask, loginWithEmail } = useAuth();
  const [loginMode, setLoginMode] = useState<'metamask' | 'email' | null>(null);
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMetaMaskLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await loginWithMetaMask();
    } catch (err: any) {
      setError(err.message || 'Failed to connect with MetaMask');
    }

    setLoading(false);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginWithEmail(email, walletAddress);
    } catch (err: any) {
      setError(err.message || 'Failed to login with email');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to DAO</h2>
          <p className="text-slate-400">Connect your account to get started</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-900 bg-opacity-50 border border-red-700 text-red-200 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        {!loginMode ? (
          <div className="space-y-4">
            <button
              onClick={() => setLoginMode('metamask')}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3"
            >
              <Wallet size={24} />
              Connect with MetaMask
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-400">or</span>
              </div>
            </div>

            <button
              onClick={() => setLoginMode('email')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3"
            >
              <Mail size={24} />
              Continue with Email
            </button>
          </div>
        ) : loginMode === 'metamask' ? (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 text-center">
              <Wallet size={48} className="mx-auto mb-4 text-orange-500" />
              <p className="text-slate-300 mb-4">
                Click the button below to connect your MetaMask wallet. If you don't have MetaMask installed, please install it first.
              </p>
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm underline"
              >
                Install MetaMask
              </a>
            </div>

            <button
              onClick={handleMetaMaskLogin}
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? 'Connecting...' : 'Connect MetaMask'}
            </button>

            <button
              onClick={() => setLoginMode(null)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Back
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-2">
                Wallet Address (Optional)
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                placeholder="0x... (optional)"
              />
              <p className="text-slate-500 text-xs mt-2">
                If you don't have a wallet address, we'll create one for you
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In / Sign Up'}
            </button>

            <button
              type="button"
              onClick={() => setLoginMode(null)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Back
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-slate-400 text-sm">
          <p>New members automatically receive 100 governance tokens</p>
        </div>
      </div>
    </div>
  );
}
