import { useState, useEffect } from 'react';
import { supabase, type Proposal, type DAOMember, type Vote } from '../lib/supabase';
import { ThumbsUp, ThumbsDown, Clock, CheckCircle, XCircle } from 'lucide-react';

interface ProposalCardProps {
  proposal: Proposal;
  onVoteCast: () => void;
  currentMember: DAOMember | null;
}

export function ProposalCard({ proposal, onVoteCast, currentMember }: ProposalCardProps) {
  const [voting, setVoting] = useState(false);
  const [userVote, setUserVote] = useState<Vote | null>(null);
  const [proposer, setProposer] = useState<DAOMember | null>(null);

  useEffect(() => {
    fetchProposer();
    if (currentMember) {
      fetchUserVote();
    }
  }, [proposal.id, currentMember]);

  const fetchProposer = async () => {
    const { data } = await supabase
      .from('dao_members')
      .select('*')
      .eq('id', proposal.proposer_id)
      .maybeSingle();

    if (data) {
      setProposer(data);
    }
  };

  const fetchUserVote = async () => {
    if (!currentMember) return;

    const { data } = await supabase
      .from('votes')
      .select('*')
      .eq('proposal_id', proposal.id)
      .eq('member_id', currentMember.id)
      .maybeSingle();

    if (data) {
      setUserVote(data);
    }
  };

  const handleVote = async (voteChoice: 'for' | 'against') => {
    if (!currentMember) {
      alert('Please register as a member first');
      return;
    }

    if (currentMember.token_balance <= 0) {
      alert('You need tokens to vote');
      return;
    }

    if (proposal.status !== 'active') {
      alert('This proposal is not active');
      return;
    }

    setVoting(true);

    const { error: voteError } = await supabase
      .from('votes')
      .insert({
        proposal_id: proposal.id,
        member_id: currentMember.id,
        vote_choice: voteChoice,
        token_weight: currentMember.token_balance,
      });

    if (voteError) {
      alert('Failed to cast vote: ' + voteError.message);
      setVoting(false);
      return;
    }

    const voteField = voteChoice === 'for' ? 'votes_for' : 'votes_against';
    const newVoteCount = Number(proposal[voteField]) + Number(currentMember.token_balance);

    await supabase
      .from('proposals')
      .update({ [voteField]: newVoteCount })
      .eq('id', proposal.id);

    setVoting(false);
    onVoteCast();
  };

  const totalVotes = Number(proposal.votes_for) + Number(proposal.votes_against);
  const forPercentage = totalVotes > 0 ? (Number(proposal.votes_for) / totalVotes) * 100 : 0;
  const againstPercentage = totalVotes > 0 ? (Number(proposal.votes_against) / totalVotes) * 100 : 0;

  const votingEnded = new Date(proposal.voting_ends_at) < new Date();
  const timeLeft = Math.ceil((new Date(proposal.voting_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const getStatusBadge = () => {
    const badges = {
      active: { icon: Clock, color: 'bg-blue-900 text-blue-200 border-blue-700', text: 'Active' },
      passed: { icon: CheckCircle, color: 'bg-green-900 text-green-200 border-green-700', text: 'Passed' },
      rejected: { icon: XCircle, color: 'bg-red-900 text-red-200 border-red-700', text: 'Rejected' },
      executed: { icon: CheckCircle, color: 'bg-purple-900 text-purple-200 border-purple-700', text: 'Executed' },
      draft: { icon: Clock, color: 'bg-slate-900 text-slate-200 border-slate-700', text: 'Draft' },
    };

    const badge = badges[proposal.status];
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${badge.color}`}>
        <Icon size={16} />
        {badge.text}
      </span>
    );
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-pink-900/50 overflow-hidden hover:border-pink-700/50 transition-colors">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{proposal.title}</h3>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>By {proposer?.name || proposer?.wallet_address.slice(0, 8) || 'Unknown'}</span>
              <span>•</span>
              <span>{new Date(proposal.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <p className="text-slate-300 mb-6 leading-relaxed">{proposal.description}</p>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span className="flex items-center gap-2">
              <ThumbsUp size={16} className="text-green-500" />
              For: {proposal.votes_for.toLocaleString()} ({forPercentage.toFixed(1)}%)
            </span>
            <span className="flex items-center gap-2">
              <ThumbsDown size={16} className="text-red-500" />
              Against: {proposal.votes_against.toLocaleString()} ({againstPercentage.toFixed(1)}%)
            </span>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden flex">
            <div
              className="bg-green-600 transition-all"
              style={{ width: `${forPercentage}%` }}
            />
            <div
              className="bg-red-600 transition-all"
              style={{ width: `${againstPercentage}%` }}
            />
          </div>
        </div>

        {proposal.status === 'active' && !votingEnded && (
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm flex items-center gap-2">
              <Clock size={16} />
              {timeLeft > 0 ? `${timeLeft} days left` : 'Ending soon'}
            </span>

            {userVote ? (
              <span className="text-slate-300 text-sm bg-slate-700 px-4 py-2 rounded-lg">
                You voted: <span className="font-semibold capitalize">{userVote.vote_choice}</span>
              </span>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => handleVote('for')}
                  disabled={voting}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <ThumbsUp size={18} />
                  Vote For
                </button>
                <button
                  onClick={() => handleVote('against')}
                  disabled={voting}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <ThumbsDown size={18} />
                  Vote Against
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
