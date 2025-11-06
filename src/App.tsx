import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './lib/auth';
import { Dashboard } from './components/Dashboard';
import { Shop } from './components/Shop';
import { OrderHistory } from './components/OrderHistory';
import { Login } from './components/Login';
import { Manifesto } from './components/Manifesto';
import { Vote, ShoppingBag, Package, Coins, LogOut, User, ScrollText, Wallet } from 'lucide-react';

function AppContent() {
  const { currentMember, isLoading, logout, refreshMember } = useAuth();
  const [activeView, setActiveView] = useState<'shop' | 'manifesto' | 'dao' | 'orders'>('shop');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [metaMaskAddress, setMetaMaskAddress] = useState<string | null>(null);

  useEffect(() => {
    if (currentMember) {
      refreshMember();
    }
  }, [activeView]);

  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setIsMetaMaskConnected(true);
            setMetaMaskAddress(accounts[0]);
          }
        } catch (error) {
          console.error('Error checking MetaMask connection:', error);
        }
      }
    };

    checkMetaMaskConnection();

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setIsMetaMaskConnected(true);
          setMetaMaskAddress(accounts[0]);
        } else {
          setIsMetaMaskConnected(false);
          setMetaMaskAddress(null);
        }
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!currentMember) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="bg-slate-900 border-b border-pink-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <img src="/4GB-SYM-LOGO.png" alt="Forgetful Bandits" className="w-10 h-10" />
                <span className="text-white font-bold text-xl">Forgetful Bandits</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveView('shop')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'shop'
                      ? 'bg-pink-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ShoppingBag size={18} />
                  Shop
                </button>
                <button
                  onClick={() => setActiveView('manifesto')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'manifesto'
                      ? 'bg-pink-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ScrollText size={18} />
                  Manifesto
                </button>
                <button
                  onClick={() => setActiveView('dao')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'dao'
                      ? 'bg-pink-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Vote size={18} />
                  Governance
                </button>
                <button
                  onClick={() => setActiveView('orders')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'orders'
                      ? 'bg-pink-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Package size={18} />
                  My Orders
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-lg border ${
                isMetaMaskConnected
                  ? 'bg-green-900/30 border-green-700/50'
                  : 'bg-slate-800 border-slate-700'
              }`}>
                <div className="flex items-center gap-2">
                  <Wallet size={18} className={isMetaMaskConnected ? 'text-green-400' : 'text-slate-400'} />
                  {isMetaMaskConnected && metaMaskAddress ? (
                    <span className="text-white text-sm font-mono">
                      {metaMaskAddress.slice(0, 6)}...{metaMaskAddress.slice(-4)}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-sm">Not Connected</span>
                  )}
                </div>
              </div>
              <div className="bg-slate-800 px-4 py-2 rounded-lg border border-pink-900/50">
                <div className="flex items-center gap-2">
                  <Coins size={18} className="text-pink-500" />
                  <span className="text-white font-semibold">
                    {currentMember.token_balance.toLocaleString()}
                  </span>
                  <span className="text-slate-400 text-sm">$FGB</span>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <User size={20} className="text-slate-400" />
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{currentMember.name || 'Member'}</p>
                    <p className="text-slate-400 text-xs font-mono">
                      {currentMember.wallet_address.slice(0, 10)}...
                    </p>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg border border-slate-700 shadow-xl z-50">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-red-400 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto">
        {activeView === 'shop' && <Shop currentMember={currentMember} />}
        {activeView === 'manifesto' && <Manifesto />}
        {activeView === 'dao' && <Dashboard currentMember={currentMember} onUpdateMember={refreshMember} />}
        {activeView === 'orders' && (
          <div className="px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Order History</h1>
            <OrderHistory currentMember={currentMember} />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
