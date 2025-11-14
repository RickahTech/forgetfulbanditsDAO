import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './lib/auth';
import { Dashboard } from './components/Dashboard';
import { Shop } from './components/Shop';
import { OrderHistory } from './components/OrderHistory';
import { Login } from './components/Login';
import { Manifesto } from './components/Manifesto';
import { AdminPanel } from './components/AdminPanel';
import { HowVotingWorks } from './components/HowVotingWorks';
import { Homepage } from './components/Homepage';
import { Vote, ShoppingBag, Package, Coins, LogOut, User, ScrollText, Wallet, Settings, Info, ChevronDown, UserCircle, Home } from 'lucide-react';

function AppContent() {
  const { currentMember, isLoading, logout, refreshMember } = useAuth();
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'manifesto' | 'dao' | 'orders' | 'admin' | 'how-voting'>('home');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMembershipMenu, setShowMembershipMenu] = useState(false);
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const showNav = activeView !== 'home';

  return (
    <div className="min-h-screen bg-black">
      {showNav && (
      <nav className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <img src="/4GB-SYM-LOGO.png" alt="Forgetful Bandits" className="w-8 h-8" />
                <span className="text-white font-bold text-lg">Forgetful Bandits</span>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => setActiveView('home')}
                  className={`px-3 py-1.5 text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'home'
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Home size={16} />
                  Home
                </button>
                <button
                  onClick={() => setActiveView('shop')}
                  className={`px-3 py-1.5 text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'shop'
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <ShoppingBag size={16} />
                  Shop
                </button>
                <button
                  onClick={() => setActiveView('manifesto')}
                  className={`px-3 py-1.5 text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activeView === 'manifesto'
                      ? 'bg-white text-black'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <ScrollText size={16} />
                  Manifesto
                </button>

                {currentMember && (
                  <div className="relative">
                    <button
                      onClick={() => setShowMembershipMenu(!showMembershipMenu)}
                      className={`px-3 py-1.5 text-sm font-semibold transition-colors flex items-center gap-2 ${
                        ['how-voting', 'dao', 'orders', 'admin'].includes(activeView)
                          ? 'bg-white text-black'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <UserCircle size={16} />
                      Membership
                      <ChevronDown size={14} />
                    </button>

                    {showMembershipMenu && (
                      <div className="absolute left-0 mt-2 w-48 bg-black border border-white/20 shadow-lg z-50">
                        <button
                          onClick={() => {
                            setActiveView('how-voting');
                            setShowMembershipMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2 text-sm"
                        >
                          <Info size={16} />
                          How Voting Works
                        </button>
                        <button
                          onClick={() => {
                            setActiveView('dao');
                            setShowMembershipMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2 text-sm"
                        >
                          <Vote size={16} />
                          Governance
                        </button>
                        <button
                          onClick={() => {
                            setActiveView('orders');
                            setShowMembershipMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2 text-sm"
                        >
                          <Package size={16} />
                          My Orders
                        </button>
                        <button
                          onClick={() => {
                            setActiveView('admin');
                            setShowMembershipMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2 text-sm"
                        >
                          <Settings size={16} />
                          Admin Panel
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {currentMember ? (
                <>
                  <div className={`px-3 py-1 border text-xs ${
                    isMetaMaskConnected
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Wallet size={14} className={isMetaMaskConnected ? 'text-white' : 'text-white/40'} />
                      {isMetaMaskConnected && metaMaskAddress ? (
                        <span className="text-white font-mono">
                          {metaMaskAddress.slice(0, 6)}...{metaMaskAddress.slice(-4)}
                        </span>
                      ) : (
                        <span className="text-white/50">Not Connected</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-white/10 px-3 py-1 border border-white/20">
                    <div className="flex items-center gap-2">
                      <Coins size={14} className="text-white" />
                      <span className="text-white font-semibold text-sm">
                        {currentMember.token_balance.toLocaleString()}
                      </span>
                      <span className="text-white/60 text-xs">$FGBNDT</span>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 bg-white/10 px-3 py-1 border border-white/20 hover:border-white/40 transition-colors"
                    >
                      <User size={16} className="text-white" />
                      <div className="text-left">
                        <p className="text-white font-semibold text-xs">{currentMember.name || 'Member'}</p>
                      </div>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-40 bg-black border border-white/20 shadow-lg z-50">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full px-3 py-2 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-sm"
                        >
                          <LogOut size={14} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setActiveView('shop')}
                  className="px-4 py-1.5 bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      )}

      <div className={activeView === 'home' ? '' : 'max-w-7xl mx-auto'}>
        {activeView === 'home' && (
          <Homepage
            onNavigate={(view) => setActiveView(view)}
            onSignIn={() => setActiveView('shop')}
          />
        )}
        {activeView === 'shop' && <Shop currentMember={currentMember} />}
        {activeView === 'manifesto' && <Manifesto />}
        {activeView === 'how-voting' && (
          currentMember ? <HowVotingWorks /> : <Login />
        )}
        {activeView === 'dao' && (
          currentMember ? <Dashboard currentMember={currentMember} onUpdateMember={refreshMember} /> : <Login />
        )}
        {activeView === 'orders' && (
          currentMember ? (
            <div className="px-4 py-8">
              <h1 className="text-3xl font-bold text-white mb-8">Order History</h1>
              <OrderHistory currentMember={currentMember} />
            </div>
          ) : <Login />
        )}
        {activeView === 'admin' && (
          currentMember ? <AdminPanel /> : <Login />
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
