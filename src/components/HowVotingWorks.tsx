import { Users, FileText, Vote, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function HowVotingWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">How DAO Voting Works</h1>
          <p className="text-xl text-slate-300">
            Democratic decision-making powered by blockchain technology
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg p-8 mb-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            The Voting Process
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div className="flex-1 bg-slate-900 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="text-pink-500" size={28} />
                  <h3 className="text-xl font-bold text-white">Proposal Creation</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Any DAO member can create a proposal for funding allocation, project initiatives, or
                  organizational changes. The proposal includes a title, detailed description, and voting
                  deadline. Once submitted, it becomes available for all members to review.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="text-pink-500" size={32} />
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div className="flex-1 bg-slate-900 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="text-pink-500" size={28} />
                  <h3 className="text-xl font-bold text-white">Review Period</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Members review the proposal details, discuss its merits, and consider its impact on the
                  organization. Each member can see the proposal status, current vote counts, and time
                  remaining until the voting deadline.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="text-pink-500" size={32} />
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div className="flex-1 bg-slate-900 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Vote className="text-pink-500" size={28} />
                  <h3 className="text-xl font-bold text-white">Token-Weighted Voting</h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Members cast their votes using their $FGBNDT tokens. Each vote is weighted by the number
                  of tokens held, ensuring that those with greater investment have proportional influence.
                  Members can vote:
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-slate-800 p-3 rounded-lg border border-green-700">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="text-green-400" size={20} />
                      <span className="text-white font-semibold">For</span>
                    </div>
                    <p className="text-slate-400 text-sm">Support the proposal</p>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg border border-red-700">
                    <div className="flex items-center gap-2 mb-1">
                      <XCircle className="text-red-400" size={20} />
                      <span className="text-white font-semibold">Against</span>
                    </div>
                    <p className="text-slate-400 text-sm">Oppose the proposal</p>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-400 font-semibold">Abstain</span>
                    </div>
                    <p className="text-slate-400 text-sm">Neutral position</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="text-pink-500" size={32} />
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <div className="flex-1 bg-slate-900 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="text-pink-500" size={28} />
                  <h3 className="text-xl font-bold text-white">Result & Execution</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  When the voting deadline passes, the proposal status is determined by the vote counts.
                  If the proposal receives more "For" votes than "Against" votes, it passes and can be
                  executed. Passed proposals move forward with implementation, while rejected proposals
                  are archived for reference.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Token Weight Explained</h3>
            <p className="text-slate-300 mb-4">
              Your voting power is directly proportional to your $FGBNDT token balance. This ensures
              that members who have contributed more to the DAO have appropriate influence.
            </p>
            <div className="bg-slate-900 p-4 rounded-lg">
              <p className="text-pink-400 font-semibold mb-2">Example:</p>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Member with 100 tokens = 100 vote weight</li>
                <li>• Member with 500 tokens = 500 vote weight</li>
                <li>• Member with 1,000 tokens = 1,000 vote weight</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Transparency & Security</h3>
            <p className="text-slate-300 mb-4">
              All votes are recorded on the blockchain, providing an immutable and transparent record
              of every decision made by the DAO.
            </p>
            <div className="space-y-2 text-slate-300 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                <span>Every vote is permanently recorded</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                <span>Results cannot be manipulated or altered</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                <span>Full audit trail for accountability</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                <span>Smart contracts automate the process</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-900/30 to-slate-800 rounded-lg p-8 border border-pink-700/50">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Why Token-Weighted Voting?
          </h2>
          <p className="text-slate-300 text-center leading-relaxed max-w-3xl mx-auto">
            Token-weighted voting aligns decision-making power with investment and commitment to the DAO.
            Members who purchase more products earn more tokens, demonstrating their support for our
            Alzheimer's and Dementia charity mission. This system ensures that those most invested in
            our cause have proportional influence over how funds are allocated and what projects we pursue.
          </p>
        </div>
      </div>
    </div>
  );
}
