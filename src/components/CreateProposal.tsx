import { useState } from 'react';
import { supabase, type DAOMember } from '../lib/supabase';
import { X, Calendar } from 'lucide-react';

interface CreateProposalProps {
  onClose: () => void;
  onCreated: () => void;
  currentMember: DAOMember | null;
}

export function CreateProposal({ onClose, onCreated, currentMember }: CreateProposalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [votingDays, setVotingDays] = useState(7);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentMember) {
      setError('Please register as a member first');
      return;
    }

    if (currentMember.token_balance < 1) {
      setError('You need at least 1 token to create a proposal');
      return;
    }

    setSubmitting(true);

    const votingEndsAt = new Date();
    votingEndsAt.setDate(votingEndsAt.getDate() + votingDays);

    const { error: insertError } = await supabase
      .from('proposals')
      .insert({
        title,
        description,
        proposer_id: currentMember.id,
        voting_ends_at: votingEndsAt.toISOString(),
      });

    if (insertError) {
      setError('Failed to create proposal: ' + insertError.message);
      setSubmitting(false);
      return;
    }

    onCreated();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Create New Proposal</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 bg-red-900 bg-opacity-50 border border-red-700 text-red-200 p-4 rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-slate-300 font-semibold mb-2">
              Proposal Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
              placeholder="Enter proposal title"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-300 font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 h-40 resize-none"
              placeholder="Describe your proposal in detail"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-300 font-semibold mb-2 flex items-center gap-2">
              <Calendar size={20} />
              Voting Period
            </label>
            <select
              value={votingDays}
              onChange={(e) => setVotingDays(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500"
            >
              <option value={3}>3 days</option>
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-800 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {submitting ? 'Creating...' : 'Create Proposal'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
