import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './lib/auth';
import { Dashboard } from './components/Dashboard';
import { Shop } from './components/Shop';
import { OrderHistory } from './components/OrderHistory';
import { Login } from './components/Login';
import { Manifesto } from './components/Manifesto';
import { AdminPanel } from './components/AdminPanel';
import { HowVotingWorks } from './components/HowVotingWorks';
import { Vote, ShoppingBag, Package, Coins, LogOut, User, ScrollText, Wallet, Settings, Info } from 'lucide-react';

function AppContent() {
  const { currentMember, isLoading, logout, refreshMember } = useAuth();
  const [activeView, setActiveView] = useState<'shop' | 'manifesto' | 'dao' | 'orders' | 'admin' | 'how-voting'>('shop');
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
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <img src="/4GB-SYM-LOGO.png" alt="Forgetful Bandits" className="w-8 h-8" />
                <span className="text-slate-900 font-bold text-lg">Forgetful Bandits</span>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => setActiveView('shop')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'shop'
                      ? 'bg-pink-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <ShoppingBag size={16} />
                  Shop
                </button>
                <button
                  onClick={() => setActiveView('manifesto')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'manifesto'
                      ? 'bg-pink-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <ScrollText size={16} />
                  Manifesto
                </button>
                <button
                  onClick={() => setActiveView('how-voting')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'how-voting'
                      ? 'bg-pink-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Info size={16} />
                  How Voting Works
                </button>
                <button
                  onClick={() => setActiveView('dao')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'dao'
                      ? 'bg-pink-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Vote size={16} />
                  Governance
                </button>
                <button
                  onClick={() => setActiveView('orders')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'orders'
                      ? 'bg-pink-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Package size={16} />
                  Orders
                </button>
                <button
                  onClick={() => setActiveView('admin')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'admin'
                      ? 'bg-pink-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Settings size={16} />
                  Admin
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-lg border text-xs ${
                isMetaMaskConnected
                  ? 'bg-green-50 border-green-300'
                  : 'bg-slate-100 border-slate-300'
              }`}>
                <div className="flex items-center gap-2">
                  <Wallet size={14} className={isMetaMaskConnected ? 'text-green-600' : 'text-slate-400'} />
                  {isMetaMaskConnected && metaMaskAddress ? (
                    <span className="text-slate-900 font-mono">
                      {metaMaskAddress.slice(0, 6)}...{metaMaskAddress.slice(-4)}
                    </span>
                  ) : (
                    <span className="text-slate-500">Not Connected</span>
                  )}
                </div>
              </div>
              <div className="bg-pink-50 px-3 py-1 rounded-lg border border-pink-200">
                <div className="flex items-center gap-2">
                  <Coins size={14} className="text-pink-600" />
                  <span className="text-slate-900 font-semibold text-sm">
                    {currentMember.token_balance.toLocaleString()}
                  </span>
                  <span className="text-slate-600 text-xs">$FGBNDT</span>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 hover:border-slate-400 transition-colors"
                >
                  <User size={16} className="text-slate-600" />
                  <div className="text-left">
                    <p className="text-slate-900 font-semibold text-xs">{currentMember.name || 'Member'}</p>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg border border-slate-300 shadow-lg z-50">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                    >
                      <LogOut size={14} />
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
        {activeView === 'how-voting' && <HowVotingWorks />}
        {activeView === 'dao' && <Dashboard currentMember={currentMember} onUpdateMember={refreshMember} />}
        {activeView === 'orders' && (
          <div className="px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Order History</h1>
            <OrderHistory currentMember={currentMember} />
          </div>
        )}
        {activeView === 'admin' && <AdminPanel />}
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
