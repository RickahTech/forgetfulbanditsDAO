import { useState, useEffect } from 'react';
import { supabase, type Proposal, type DAOMember } from '../lib/supabase';
import { ProposalCard } from './ProposalCard';
import { CreateProposal } from './CreateProposal';
import { MemberProfile } from './MemberProfile';
import { Users, Vote, TrendingUp } from 'lucide-react';

interface DashboardProps {
  currentMember: DAOMember | null;
  onUpdateMember: () => void;
}

export function Dashboard({ currentMember, onUpdateMember }: DashboardProps) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [members, setMembers] = useState<DAOMember[]>([]);
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'proposals' | 'members'>('proposals');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchProposals(), fetchMembers()]);
    setLoading(false);
  };

  const fetchProposals = async () => {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProposals(data);
    }
  };

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from('dao_members')
      .select('*')
      .order('token_balance', { ascending: false });

    if (!error && data) {
      setMembers(data);
    }
  };

  const handleProposalCreated = () => {
    setShowCreateProposal(false);
    fetchProposals();
  };

  const handleVoteCast = () => {
    fetchProposals();
    onUpdateMember();
  };

  const totalTokens = members.reduce((sum, m) => sum + Number(m.token_balance), 0);
  const activeProposals = proposals.filter(p => p.status === 'active').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading DAO...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Forgetful Bandits DAO</h1>
              <p className="text-slate-400">Collective governance through beautiful chaos</p>
            </div>
            <button
              onClick={() => setShowCreateProposal(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              New Proposal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 rounded-lg p-6 border border-pink-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Total Bandits</p>
                  <p className="text-3xl font-bold text-white">{members.length}</p>
                </div>
                <Users className="text-pink-500" size={32} />
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-pink-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Active Proposals</p>
                  <p className="text-3xl font-bold text-white">{activeProposals}</p>
                </div>
                <Vote className="text-pink-400" size={32} />
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-pink-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Total $FGB</p>
                  <p className="text-3xl font-bold text-white">{totalTokens.toLocaleString()}</p>
                </div>
                <TrendingUp className="text-pink-500" size={32} />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('proposals')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'proposals'
                  ? 'bg-pink-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Proposals
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'members'
                  ? 'bg-pink-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Bandits
            </button>
          </div>
        </div>

        {activeTab === 'proposals' ? (
          <div className="space-y-6">
            {proposals.length === 0 ? (
              <div className="bg-slate-800 rounded-lg p-12 text-center border border-slate-700">
                <Vote className="mx-auto mb-4 text-slate-600" size={48} />
                <p className="text-slate-400 text-lg">No proposals yet</p>
                <p className="text-slate-500 text-sm mt-2">Create the first proposal to get started</p>
              </div>
            ) : (
              proposals.map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  onVoteCast={handleVoteCast}
                  currentMember={currentMember}
                />
              ))
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <MemberProfile key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>

      {showCreateProposal && (
        <CreateProposal
          onClose={() => setShowCreateProposal(false)}
          onCreated={handleProposalCreated}
          currentMember={currentMember}
        />
      )}
    </div>
  );
}
