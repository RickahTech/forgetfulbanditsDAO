import { type DAOMember } from '../lib/supabase';
import { User, Coins, Calendar } from 'lucide-react';

interface MemberProfileProps {
  member: DAOMember;
}

export function MemberProfile({ member }: MemberProfileProps) {
  const joinedDate = new Date(member.joined_at).toLocaleDateString();

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={32} className="text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-1 truncate">
            {member.name || 'Anonymous'}
          </h3>
          <p className="text-slate-400 text-sm font-mono truncate mb-3">
            {member.wallet_address}
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <Coins size={16} className="text-amber-500 flex-shrink-0" />
              <span className="font-semibold">{member.token_balance.toLocaleString()}</span>
              <span className="text-slate-400">tokens</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Calendar size={16} className="flex-shrink-0" />
              <span>Joined {joinedDate}</span>
            </div>

            {member.email && (
              <div className="text-slate-400 text-sm truncate">
                {member.email}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
